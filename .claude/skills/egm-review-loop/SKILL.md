---
name: egm-review-loop
license: Apache-2.0
disable-model-invocation: true
description: >-
  Executes the Antagonistic-Review process from the Elephant-Goldfish
  Model (EGM) via an automated multi-agent review loop to audit documents
  against qualitative standards and structural templates, and automatically
  apply approved fixes. Use when reviewing design docs, READMEs, feature
  specifications, implementation plans, or verifying document completeness
  and tone.
---

# Goldfish Review: Loop (Orchestration Driver)

Read the harness guide first:

- Codex or ChatGPT Work: [Codex integration](../../egm/docs/codex.md)
- Claude Code or Cowork: [Claude Code integration](../../egm/docs/claude.md)

In this repo the EGM root is `.claude/egm/` (`../../egm/` from here). The `agents/`, `resources/` and `docs/` folders named in this skill are the folders there. Skills run as `/egm-review` and so on, without the `/egm:` prefix

## Overview

This skill drives the multi-agent review loop. It coordinates two kinds of agent memory:

- The Goldfish (adversarial auditors): subagents spawned in fresh, isolated context windows. They catch unstated assumptions with no history bias
- The Elephant (persistent resolver): the main agent context. It holds the project knowledge, judges findings, and applies approved repairs

The driver takes the arguments, resolves paths for reviewers and standards, and re-reads the target line range before every round. It spawns the specialized Goldfish auditors in parallel, as configured, and works with the Elephant context to resolve findings

## Delegation

A Goldfish runs in a fresh context with no conversation history

- Spawn each subagent with your harness's subagent tool: Antigravity `invoke_subagent`, Claude Code `Agent`, Codex `spawn_agent`
- Each persona lives in `agents/<file>.md`. Its frontmatter `name` (for example `egm-zoom-out`) is the subagent type to request, if your harness registers named subagents
- Otherwise spawn a general-purpose subagent and tell it to read the persona file first
- Pass the prompt verbatim and wait for the report
- If your harness cannot nest subagents, dispatch directly instead of using the synthesizer. See [`docs/harnesses.md`](../../egm/docs/harnesses.md)
- If your harness has no subagent tool, stop and tell the user: a review in the same context is not a Goldfish review

## Inputs

The caller or user gives exactly these parameters:

- `TargetFile`: path to the target document, absolute or relative
- `SemanticTarget`: a descriptive string that points at the target (for example *"Target the H4 block with SS-ID 'S1.12'"*), or `full file`
- `Reviewers`: list of reviewer names (shortnames or paths)
- `Standards`: map of reviewer names to standard names (shortnames or paths)
- `GoldfishContext`: a reading list (source files, directories or doc URLs) that gives reviewers their baseline
  - An empty list from the caller counts as provided. Do not ask for it again
  - Some reviewers cannot open URLs. Before the first round, save the raw page of each URL as a new file in the working directory (or your harness's artifact directory) and pass its absolute path
  - If you cannot save a page, ask the user for a local copy and end your turn. If nobody can answer (a headless run), leave it out, tell the user, and keep going

## Path and standard lookup

Resolve the names in `Reviewers` and `Standards` like this:

- Reviewer shortnames: map a shortname (for example `design_critic`, `structural`, `style`, `implementation_readiness`, `codebase_details`, `comprehension`, `zoom_out`) to `agents/{name}.md`. The persona file defines the reviewer's core rules, audit vectors and output format
- Standard shortnames: map a shortname (for example `feature-spec-standard`, `implementation-readiness-standard`, `zoom-out-standard`, `heilmeier-standard`, `re-implementation-standard`) to `resources/document_standards/{name}.md`
- Custom paths: if the name has a slash (`/`), treat it as an absolute or workspace-relative path and read it directly

## Workflow

### Step 1: Intake and setup

Check the inputs you were given (`TargetFile`, `SemanticTarget`, `Reviewers`, `Standards`, `GoldfishContext`)

1. Find missing inputs: work out which required parameters are missing
2. Ask for them:
   - If all inputs are present, go to Step 2
   - If some or all are missing, ask the user in chat only for the missing ones, one at a time
3. Recommend reviewers:
   - Feature specs: recommend `design_critic` (with `resources/document_standards/feature-spec-standard.md`) and `structural` (with `resources/document_standards/feature-spec-standard.md`)
   - Implementation plans: recommend `implementation_readiness` (with `resources/document_standards/implementation-readiness-standard.md`) and `codebase_details`
4. Confirm: show the full plan (target, reviewers and mapped standards) and ask the user to confirm before you go on

### Step 2: The sharpening loop

Run these steps in a loop:

#### 2.1 Re-find the target

Before every round, always re-read `TargetFile` and use the stable `SemanticTarget` string (for example, find the target header) to get the new absolute start and end line numbers. This keeps the numbers exact even if earlier rounds edited the file. For `full file` mode, confirm the full-file line bounds

#### 2.2 Run the review swarm

1. Launch the subagent swarm. Spawn subagents to run the review:
   - Hierarchical dispatch (synthesizer): spawn the middle synthesizer subagent (`agents/synthesizer.md`, `egm-synthesizer`)
     - It spawns the Goldfish review swarm in parallel, merges the findings, writes the report file, and returns one summary message. This keeps the root conversation clean
     - Give it the Failed Reviewers rule below and `GoldfishContext`, and tell it to pass those files to each reviewer
     - Its summary must give a status, `completed` or `not run`, for each requested reviewer
   - Direct dispatch (flat swarm): or spawn each requested reviewer in `Reviewers` yourself. Tell each subagent to first read its persona file in `agents/{name}.md`, then audit `TargetFile` at the resolved line range against its standard in `resources/document_standards/`, with `GoldfishContext`
   - Each reviewer gives findings with a severity (🔴 Blocker, 🟡 Major, 🟢 Nit), line numbers, a description of the gap, and the reasoning
2. Merge findings: collect all findings from all reviewers into one flat `FindingsList`. Give each finding a stable id (`<reviewer>-<round>-<n>`) and record its reviewer, severity and affected scope
3. Failed reviewers: a reviewer that times out, fails or returns no report did not review. Retry it once. If it fails again, record it as "not run" in the report. Never count it as a reviewer with zero findings. If the synthesizer summary has no status for a requested reviewer, record that reviewer as not run

#### 2.3 Hand off for resolution

1. Pass `TargetFile`, the active line range and the merged `FindingsList` to the `egm-resolve` workflow
2. Run the resolution workflow in the main Elephant context:
   - Sort findings into `CONTEST` or `PROPOSE FIX`
   - Save `goldfish_review_report.md` with your file-writing tool
   - Show the interactive decision gate (Auto accept, Continue, Interactive breakdown)
   - Apply approved text repairs to `TargetFile` with your file-editing tool

#### 2.4 Check progress and hand the turn back

Fresh reviewers sample differently each round, so a round with zero findings is rare even when the document gets better. Use these rules instead:

- Settled findings: a finding is settled when it is contested, or recorded without a fix (accepted risk). Keep the settled list across rounds. If a new reviewer raises a settled finding again (same scope, same issue), do not reopen it
- Fixed findings: an applied fix does not settle a finding. If a later reviewer raises the same issue at the same scope, the fix failed or a later edit brought the issue back. Reopen the finding
- Clean round: a round is clean when no reviewer raises a Blocker or Major finding that is not settled. Nits do not block. A reviewer recorded as not run makes the round not clean. Decide this from the review results, before you apply that round's fixes
- Converged: two clean rounds in a row. One clean round is not enough, because the next fresh reviewer can find a different gap in the same text
- Cap: 5 rounds
- Churn: a new finding sits at the scope of an applied fix, and undoing that fix would resolve it

When converged, go to Step 3. At the cap or on churn, write a short list of the open findings by severity, then ask the user one question: accept and proceed, continue past the cap, or send the document back to drafting

Turn-taking rule (CRITICAL): after the resolution phase ends for a round, the loop driver must follow the turn-taking checkpoint in `egm-resolve`. The driver stays idle across human turns. It goes back to Step 2.1 only when the user explicitly confirms they want another review round

### Step 3: Output and final checkpoint

When the loop ends (converged, cap or churn accepted by the user, or manual stop):

- Called by a program: if you run as a subflow of `egm-review`, exit cleanly and hand control back to the parent workflow
- Run by hand: write a completion summary in chat: *"The review loop has completed after [N] rounds ([converged | accepted at cap | halted]). Open findings are in the report. Would you like to proceed to the next stage, or do you have any final questions?"*
