---
name: egm-brainstorm
license: Apache-2.0
disable-model-invocation: true
description: >-
  Interactive ideation and brainstorming skill for the Elephant &
  Goldfish Model (EGM). Helps turn half-baked concepts into structured
  hypotheses via clarifying questions, review, and iterative refinement.
  Produces an RFC summary for human review or more detailed design with
  egm-draft.
---

# EGM Brainstorm: Interactive Multi-Lens Ideation & Refinement

Read the harness guide first:

- Codex or ChatGPT Work: [Codex integration](../../docs/codex.md)
- Claude Code or Cowork: [Claude Code integration](../../docs/claude.md)

In this repo the EGM root is `.claude/egm/` (`../../` from here). The `agents/`, `resources/` and `docs/` folders named in this skill are the folders there. Skills run as `/egm-review` and so on, without the `/egm:` prefix

## Overview

This skill is the chat-based brainstorming step at the start of the Elephant-Goldfish Model (EGM). It turns a half-baked idea into a testable hypothesis. It asks open clarifying questions, then runs an automated Goldfish review. The result is an RFC summary (`concepts_brief.md`) that you refine over several rounds. It feeds straight into `/egm-draft`, or into review with peers

## Delegation

A Goldfish runs in a fresh context with no conversation history

- Spawn each subagent with your harness's subagent tool: Antigravity `invoke_subagent`, Claude Code `Agent`, Codex `spawn_agent`
- Each persona lives in `agents/<file>.md`. Its frontmatter `name` (for example `egm-zoom-out`) is the subagent type to request, if your harness registers named subagents
- Otherwise spawn a general-purpose subagent and tell it to read the persona file first
- Pass the prompt verbatim and wait for the report
- If your harness cannot nest subagents, dispatch directly instead of using the synthesizer. See [`docs/harnesses.md`](../../docs/harnesses.md)
- If your harness has no subagent tool, stop and tell the user: a review in the same context is not a Goldfish review

## Rules (CRITICAL)

1. Write, don't chat: never put large proposals, drafts, brainstorm summaries or briefs in chat. Write or update them in a file (for example `./concepts_brief.md` in the working directory or your harness's artifact directory) with your file-writing tool. Then tell the user in chat, with a clean link to the file
2. Ask first, then review: ask open-ended plain-text questions over several chat turns until the problem statement and its limits are clear. Do not spawn subagents until the user explicitly confirms they are ready, after they read the anchored working hypothesis. Never use structured question tools (`ask_question`) or offer multiple-choice answers during open questioning
3. Parallel Goldfish reviews: judge the feature concept through all the Goldfish lenses at the same time. This avoids order bias and gives the widest critique
4. Plain English: write concepts briefs, RFC summaries and messages in simple, direct English. Explain technical mechanisms. Do not hide substance or lean on buzzwords. Do not use promotional adjectives (*seamless*, *robust*, *blazingly fast*) or decorative adverbs (*seamlessly*, *effortlessly*, *literally*, *drastically*, *obviously*)
5. Stress-test: never agree by default. Look for the weakest points, edge cases and blind spots before you affirm anything
6. No flattery: do not call ideas "great", "brilliant" or "smart". Praise without substance is noise
7. Critique first: even for a strong idea, lead with what is wrong, missing or risky, then the merits
8. No echo: do not repeat the user's framing back. Do not validate a stated conclusion by reflex
9. Counter-arguments: for every strategy, say what the user is not seeing, what the strongest counter-argument is, and whether the opposing view holds
10. Earn agreement: agree only after the idea survives objective scrutiny
11. Banned words: do not describe the user's inputs, corrections or decisions as "brilliant", "great", "smart", "correct", "perfect", "excellent" or "spot-on"
12. No apologies: do not write "I apologize", "I am sorry" or "Forgive me" when challenged or corrected. State the corrected logic or trade-offs instead
13. One question per gate: every interactive gate (a structured question tool such as `ask_question`, if your harness has one, or plain chat) must have exactly one question (`len(questions) == 1`), be the only tool call in the turn, and give clear action options without a `(Recommended)` prefix

## The Goldfish brainstorming lenses

| Lens | Goal | Questions it asks |
| :--- | :--- | :--- |
| Contrarian / YAGNI | Less code and less complexity | *Why does this feature need to exist? Can an existing library, open-source dependency, API or service solve 90% of this problem without new code?* |
| Cost, quota and token economics | Infrastructure and budget at scale | *What is the peak QPS, memory use, database query load or LLM token budget? Will this hit quota limits at scale?* |
| UX and developer ergonomics | Ease of use and mental load | *Is the API or CLI intuitive? Does it match ecosystem habits? Are error messages actionable, or do they add friction for developers?* |
| Migration and backward compatibility | Safe rollout and version skew | *How do existing clients and data move over? Does this break serialized schemas, protos or stored data? How do you roll back in the middle of a migration?* |
| Observability and SRE debuggability | Telemetry and visibility in operations | *Can you trace key operations with distributed tracing? Are the metrics actionable? How will an on-call engineer handle a production incident at 3 AM?* |
| Long-term tech debt and maintenance | Maintainability later | *Does this add tightly coupled dependencies or brittle state machines that will hurt to maintain in 2 years?* |
| Inventive Catalyst | Remove contradictions with inventive transforms | *What basic trade-off does this design accept as unavoidable? How can proven software transforms resolve that conflict and reach the Ideal Final Result with no compromise?* |

## Workflow

### Step 1: Clarify the problem in depth

1. Check the starting idea and the author:
   - Check that the user gave an initial feature idea or concept. If not, ask them to describe what they want to brainstorm
   - Set the brief's `Author` from `git config user.name`, then `GIT_AUTHOR_NAME`. If neither is set, ask in chat
2. Drill into the problem over several chat turns. Do not rush to launch subagents after one reply. Keep asking targeted, open-ended questions, as many turns as needed, until the problem statement, constraints and target behavior are well defined. Do not use structured question tools (`ask_question`) and do not offer multiple-choice options while you explore the problem. Ask open questions directly in chat, for example:
   - *What specific problem, bottleneck or pain point does this solve?*
   - *Who or what system will use this feature, and under what SLAs or invariants?*
   - *What are the hard, non-negotiable constraints (for example zero false positives, offline use, a specific platform or dialect)?*
   - *What are the edge cases or out-of-scope limits?*
   - *How is this handled today? Why does that not work?*
   - *How will you measure success?*
3. Readiness gate (single-select): once the foundation is clear, sum up the anchored working hypothesis in 2 to 3 sentences. Then show one single-select confirmation gate (structured question tool such as `ask_question` if your harness has one, or plain chat):

   ```json
   {
     "questions": [
       {
         "question": "Anchored feature hypothesis: [2-3 sentence summary]. How would you like to proceed?",
         "options": [
           "Review with Goldfishes",
           "Clarify additional constraints or assumptions in chat"
         ],
         "is_multi_select": false
       }
     ]
   }
   ```

   - Option 0, `Review with Goldfishes`: the user is ready. Go to Step 2 (Goldfish review and synthesis) right away and call `egm-synthesizer`
   - Option 1, `Clarify additional constraints or assumptions in chat`: the user wants to refine the problem or has notes to add. Stay in Step 1, yield the turn for details, fold the feedback into the hypothesis, and show the readiness gate again when ready
4. Go to Step 2 only after Option 0. Do not spawn subagents before this gate confirms readiness

### Step 2: Goldfish review and synthesis

1. Delegate: spawn the middle `egm-synthesizer` agent. If your harness cannot nest subagents, spawn parallel Goldfish subagents across the 7 lenses instead:
   - Subagent: `egm-synthesizer` (`agents/synthesizer.md`)
   - Prompt: >- Conduct multi-lens brainstorm for feature concept: `[AnchoredFeatureHypothesis]`. Mode: `BRAINSTORM`. Reviewers: `[egm-design, egm-codebase-details, egm-zoom-out, egm-comprehension, egm-implementation-readiness, egm-structural, egm-inventive-catalyst]`
2. Synthesizer run: the `egm-synthesizer` subagent launches the parallel Goldfish reviewers across the lenses (`egm-design`, `egm-codebase-details`, `egm-zoom-out`, `egm-comprehension`, `egm-implementation-readiness`, `egm-structural`, `egm-inventive-catalyst`) with `Mode: BRAINSTORM`
3. Deduplicate: collect the raw findings from the Goldfish reviewers, merge overlapping points, and shape them into one clear analysis
4. Write the file: format the synthesized brief and write it to `concepts_brief.md` in the working directory (or your harness's artifact directory) with your file-writing tool

The `concepts_brief.md` file follows this structure:

```markdown
# [Feature Name]

* **Author:** [Author Name or GitHub Handle]
* **Date:** [YYYY-MM-DD]

## Overview

[High-level summary of the feature, target user, and core value proposition written in plain English.]

## Analysis

[Cohesive analysis found by review lenses written in plain English, covering inventive contradictions, suggested catalog patterns, secondary trade-offs, and the Ideal Final Result.]

## Goals vs. Non-Goals

* **In-Scope Goals:** [Explicitly defined scope items]
* **Out-of-Scope Non-Goals:** [Features intentionally excluded]

## Alternatives Weighed

[Each option rejected during ideation, with the technical reason (e.g. "Rejected by author: <reason>"). Do not attribute a rejection to a maintainer without linking their issue, discussion, or PR. `/egm-draft` copies
these into Alternatives Considered and has no other source for them.]

## Key Decisions & Staging for Next Steps

[Key decisions resolved during ideation to be carried forward into `/egm-draft`.]
```

### Step 3: Refine in a loop

1. Notify and highlight (no chat dumps): tell the user in chat that `concepts_brief.md` is updated (give its path). Highlight 2 to 3 key objections or open risks from the Goldfish reviewers
2. Iterate: ask the user how they want to handle the Goldfish objections (for example change the approach, narrow the scope, or add constraints)
3. Loop: repeat Steps 1 and 2 to re-run or update the Goldfish analysis, until the concept survives scrutiny and the user is satisfied

### Step 4: Finish and hand off

1. Align: ask the user to review the final `concepts_brief.md` and confirm they agree
2. Handoff gate (single-select): once approved, show the standard handoff choices (structured question tool such as `ask_question` if your harness has one, or plain chat):

   ```json
   {
     "questions": [
       {
         "question": "Brainstorming complete. concepts_brief.md is finalized. Select next step:",
         "options": [
           "Publish concepts_brief.md as RFC for team feedback",
           "Proceed to egm-draft (Initialize formal design document)",
           "Continue refining concepts_brief.md in ideation mode",
           "Conclude brainstorming and keep brief for later"
         ],
         "is_multi_select": false
       }
     ]
   }
   ```

   - Option 0, `Publish concepts_brief.md as RFC for team feedback`:
     - Write `concepts_brief.md` to `docs/designs/<feature_name>.md` with your file-writing tool
     - Add the RFC to `docs/designs/SITEMAP.md` if it exists
     - Tell the user in chat that the RFC is published and ready to share with the team for feedback before formal drafting. Remind them that once feedback is in, they can start a detailed design by running the `egm-draft` skill on `docs/designs/<feature_name>.md` in the host's command form (for example `/egm:egm-draft docs/designs/<feature_name>.md` in Claude Code and agy CLI, or the skill picker in Codex)
   - Option 1, `Proceed to egm-draft (Initialize formal design document)`:
     - Confirm that `concepts_brief.md` is saved in the working directory or artifact directory
     - Tell the user to start the `egm-draft` skill in the host's command form (for example `/egm:egm-draft` in Claude Code and agy CLI, or the skill picker in Codex). Note that it reads `concepts_brief.md` automatically as its Priority 1 intake source
   - Option 2, `Continue refining concepts_brief.md in ideation mode`:
     - Go back to the Step 3 loop to dig into more edge cases or update the brief from the user's chat input
   - Option 3, `Conclude brainstorming and keep brief for later`:
     - End the session politely. Remind the user that `concepts_brief.md` stays saved for later
