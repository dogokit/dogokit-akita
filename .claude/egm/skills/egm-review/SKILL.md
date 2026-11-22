---
name: egm-review
license: Apache-2.0
disable-model-invocation: true
description: >-
  Orchestrates the EGM Goldfish Review Protocol. Used as part of the EGM
  process to perform design document reviews. Executes five review phases:
  Initial Zoom Out Review, Comprehension Review, Design Critique, Intermediate
  Zoom Out Review, and Implementation Readiness.
---

# Review, Validation & Automated Remediation

Review a design document with specialized reviewer personas, then fix the findings

Read the harness guide first:

- Codex or ChatGPT Work: [Codex integration](../../docs/codex.md)
- Claude Code or Cowork: [Claude Code integration](../../docs/claude.md)

In this repo the EGM root is `.claude/egm/` (`../../` from here). The `agents/`, `resources/` and `docs/` folders named in this skill are the folders there. Skills run as `/egm-review` and so on, without the `/egm:` prefix

## Delegation

A Goldfish runs in a fresh context with no conversation history

- Spawn each Goldfish with your harness's subagent tool: Antigravity `invoke_subagent`, Claude Code `Agent`, Codex `spawn_agent`
- Each persona lives in `agents/<file>.md`. Its frontmatter `name` (for example `egm-zoom-out`) is the subagent type to request, if your harness registers named subagents
- Otherwise spawn a general-purpose subagent and tell it to read the persona file first
- Pass the prompt verbatim and wait for the report
- If your harness cannot nest subagents, dispatch the reviewers directly instead of using the synthesizer. See [`docs/harnesses.md`](../../docs/harnesses.md)
- If your harness has no subagent tool, stop and tell the user: a review in the same context is not a Goldfish review

## Rules (CRITICAL)

1. Write, don't chat: never put large proposals, drafts, summaries or plans in chat. Write them to the working directory (or your harness's artifact directory) with your file-writing tool. Then tell the user the file path and ask for review. This covers the Discussion Summary, design drafts and all review reports
2. Plain English: write concepts briefs, summaries and messages in simple, direct English. Explain technical mechanisms. Do not hide substance or lean on buzzwords. Do not use promotional adjectives (*seamless*, *robust*, *blazingly fast*) or decorative adverbs (*seamlessly*, *effortlessly*, *literally*, *drastically*, *obviously*)
3. Stress-test: never agree by default. Look for the weakest points, edge cases and blind spots before you affirm anything
4. No flattery: do not call ideas "great", "brilliant" or "smart". Praise without substance is noise
5. Critique first: even for a strong idea, lead with what is wrong, missing or risky, then the merits
6. No echo: do not repeat the user's framing back. Do not validate a stated conclusion by reflex
7. Counter-arguments: for every strategy, say what the user is not seeing, what the strongest counter-argument is, and whether the opposing view holds
8. Earn agreement: agree only after the idea survives objective scrutiny
9. Banned words: do not describe the user's inputs, corrections or decisions as "brilliant", "great", "smart", "correct", "perfect", "excellent" or "spot-on"
10. No apologies: do not write "I apologize", "I am sorry" or "Forgive me" when challenged or corrected. State the corrected logic or trade-offs instead
11. One question per gate: every interactive gate (a structured question tool such as `ask_question`, or plain chat) must have exactly one question (`len(questions) == 1`), be the only tool call in the turn, and give clear action options without a `(Recommended)` prefix

## Inputs

- `TargetFile`: path to the design document, absolute or relative
- `GoldfishContext` (optional): reading list that gives reviewers the system baseline. If omitted, it holds only the linked files that Step 1.3 adds
- `Step` (optional): preset or stage to run: `interactive`, `uninterrupted`, `feature_spec`, `implementation`, or one stage (`5`, `6`, `7`, `8`, `9`). If omitted, ask the user

## Workflow

### Step 1: Intake and setup

1. Check that `TargetFile` is set. If not:
   - Tell the user you need the path to find the document structure and the semantic split
   - Ask for the path in plain chat, then end your turn. Do not use a structured question tool: a file path is open text, not a choice
2. Check that `GoldfishContext` is set. An empty list counts, and so does the user saying to proceed with no extra context. If not:
   - Tell the user the reading list is optional, but it gives reviewers baseline knowledge
   - Say that linked files inside the working directory are added automatically, and other links and URLs need approval
   - Ask in plain chat whether they want to add context files. Do not use a structured question tool
3. Linked files (run later, not during intake): run this once, after you choose the Step 2 preset and just before the first stage that takes `GoldfishContext` (any stage but Stage 6). Do this in every flow, including `uninterrupted`
   - Read `TargetFile`
   - Skip anchor-only links (`#...`) and drop the `#fragment` from other links
   - Resolve each relative link against the design document's folder
   - Add a link to `GoldfishContext` if its real path (after following symbolic links) stays inside the working directory. Skip files that do not exist
   - If a link points outside the working directory, or is a URL, list those links in plain chat, ask which to include, and end your turn. If nobody can answer (a headless run), leave them out and keep going
   - Add only approved links, and tell the user which you left out
   - Some reviewers cannot open URLs. Save the raw page of each approved URL as a new file in the working directory (or your harness's artifact directory) and pass its absolute path
   - If you cannot save a page, ask the user for a local copy and end your turn. If nobody can answer, leave it out, tell the user, and keep going
   - Pass `GoldfishContext` to every stage except Stage 6, which reads the document alone. Tell any synthesizer to give these files to each reviewer

### Step 2: Pick a preset

1. If `Step` was given, map it to the matching preset or subflow and skip the question
2. Otherwise ask the preset question (structured question tool if your harness has one, or plain chat) with these rules:
   - Exactly one question object (`len(questions) == 1`). No multi-question payloads
   - The question tool is the only tool call in the turn. Yield right after you call it
   - `is_multi_select` is `false`. No checklists: they would break the stage order (5 → 6 → 7 → 8 → 9)
   - Option 0 is the main default action, with no `(Recommended)` prefix
   - Payload:

   ```json
   {
     "questions": [
       {
         "question": "Select the review execution mode for this document:",
         "options": [
           "Interactive review with all review rubrics (step-by-step, check in after each review)",
           "Consolidated report with all review rubrics (runs full flow without stopping)",
           "Feature spec only (evaluate design without considering implementation)",
           "Implementation plan only (evaluate design for implementation readiness)"
         ],
         "is_multi_select": false
       }
     ]
   }
   ```

3. Act on the preset:
   - Preset 0, `Interactive review with all review rubrics`: do Step 3, then run Stages 5, 6, 7, 8 and 9 in order, with a checkpoint gate between stages
   - Preset 1, `Consolidated report with all review rubrics`: do Step 3, then run all five stages with no pauses. Collect findings into `consolidated_review_report.md`
   - Preset 2, `Feature spec only`: skip Step 3. Set `FeatureRange = 1..End` and `DetailedRange = N/A`. Run Stages 5, 6, 7 and 8 with checkpoints, then halt before Stage 9
   - Preset 3, `Implementation plan only`: do Step 3, confirm `DetailedRange`, then jump to Stage 9 (Implementation Readiness Test)

### Step 3: Find the split

1. Preset 2 (`Feature spec only`): skip this step. Set `FeatureRange` to the whole document (line 1 to End) and go to Step 4
2. Read `TargetFile` and check its structure and line count
3. Look for the main dividing header `## Detailed Implementation Plan`, or a standard synonym: `## Implementation Plan`, `## Work Breakdown`, `## Implementation Steps`
   - One clear header at line L:
     - Set `FeatureRange = 1..(L-1)` and `DetailedRange = L..End`
     - Tell the user in chat: `"Discovered semantic boundary at line L. FeatureRange: 1..(L-1), DetailedRange: L..End."`
     - Go to Step 4 with no confirmation question
   - Several conflicting headers, or a non-standard layout: ask one single-select question (structured tool with `len(questions) == 1`, or plain chat). Option 0 is the most likely split line. Option 1 lets the user write in a custom line range
   - No implementation plan (only a high-level feature spec):
     - Tell the user in chat that you found no implementation plan
     - Set `FeatureRange = 1..End` and `DetailedRange = N/A`
     - Offer to run Stages 5-8 (the Feature Spec gates), then go on

### Step 4: Run the stages

1. Check that `FeatureRange` and `DetailedRange` are set
2. Run the pipeline for the preset:
   - Interactive review with all review rubrics: Stage 5 → 6 → 7 → 8 → 9
   - Consolidated report with all review rubrics: run Subflow: Uninterrupted Full Flow
   - Feature spec only: Stage 5 → 6 → 7 → 8, then halt
   - Implementation plan only: jump to Stage 9 (Implementation Readiness Test)

---

## Subflows

### Checkpoint gates and pause/resume

Every interactive stage ends with one single-select gate (structured tool with `len(questions) == 1`, `is_multi_select: false`, only tool call in the turn, or plain chat)

1. Gate options by stage:
   - Stages 5, 6, 8 (altitude and comprehension checkpoints):
     - Option 0: `Proceed to next stage: Stage [N+1] ([Next Stage Name])`. For the end of Stage 8, use `Conclude review and begin detailed implementation planning`
     - Option 1: `I will update doc first (pause session; notify me in chat when edits are complete to re-run)`
     - Option 2: `Pause Review (save progress and exit)`
   - Stages 7, 9 (remediation and readiness checkpoints):
     - Option 0: `Proceed to next stage: Stage [N+1] ([Next Stage Name])`. For the end of Stage 9, use `Conclude review and finalize document`
     - Option 1: `Resolve findings with agent (evaluate findings, propose fixes, and apply approved edits)`
     - Option 2: `I will update doc manually (pause session; notify me in chat when edits are complete to re-run)`
     - Option 3: `Pause Review (save progress and exit)`
2. Option 1 for Stages 7 and 9 (resolve with the agent):
   - Hand off: run `egm-resolve` in the main Elephant context on the target range (`FeatureRange` or `DetailedRange`). Pass the parsed findings from `critic_report.md` or `implementation_readiness_report.md`
   - Workflow: the Elephant sorts each finding as `PROPOSE FIX` or `CONTEST`, writes `goldfish_review_report.md`, and applies approved edits to `TargetFile` with file editing tools
   - Converge: after the fixes, re-read `TargetFile` to recompute line bounds. Then go to the next stage, or re-run the stage audit (at most 1 re-audit)
3. Pause and resume (manual doc edits):
   - Say in chat that the review is paused for manual edits, then yield
   - When the author says the edits are done:
     - Re-read `TargetFile` to recompute line shifts
     - If Step 1.3 has run, apply its rules to links added since then
     - Re-run the current stage subflow
   - Limit of 1 re-audit per stage: if the author asks for manual edits again after a re-audit, say the limit is reached, record the remaining findings as accepted trade-offs, pick Option 0 automatically, and go to the next stage
4. `Pause Review`: halt right away, call no tools, and keep all report files

### Subflow: Uninterrupted Full Flow

1. Run all five stages in order, with no checkpoint pauses. Write each stage's report to the working directory (or your harness's artifact directory). Pass `GoldfishContext` to every step except Step 6
   - Step 5 (Initial Zoom Out): spawn `egm-synthesizer` (or a direct subagent) with `Reviewers: [egm-zoom-out, egm-inventive-catalyst]` on `full file`. Write `zoom_out_report.md`
   - Step 6 (Comprehension Test): spawn `egm-comprehension` directly (not the synthesizer) on `FeatureRange` and `DetailedRange`. Write its full result to `comprehension_report.md`
   - Step 7 (Critic Review): spawn `egm-synthesizer` (or direct subagents) with `Reviewers: [egm-design, egm-structural, egm-style]` on `FeatureRange`. Write `critic_report.md`
   - Step 8 (Intermediate Zoom Out): spawn `egm-synthesizer` (or a direct subagent) with `Reviewers: [egm-zoom-out]` on `full file`. Write `intermediate_zoom_out_report.md`
   - Step 9 (Implementation Readiness Test): spawn `egm-synthesizer` (or direct subagents) with `Reviewers: [egm-implementation-readiness, egm-codebase-details, egm-style]` on `DetailedRange`. Write `implementation_readiness_report.md`
2. Merge and deduplicate:
   - Collect all findings from the 5 stage reports
   - Group them into tasks by priority: 🔴 Blocker, 🟡 Major, 🟢 Nit
   - Build a traceability matrix that maps each raw finding to its task
3. Write the result to `consolidated_review_report.md` with your file-writing tool
4. Tell the user in chat, with a short note that gives the path of `consolidated_review_report.md`

### Subflow: Zoom Out Review

1. Delegate: spawn `egm-synthesizer` (or the `egm-zoom-out` subagent at `agents/zoom_out.md`) on `full file`, with `resources/document_standards/zoom-out-standard.md`
   - Stage 8 (Intermediate Zoom Out): add the `zoom_out_report.md` path to the context. Focus on what the Comprehension and Critic stages added or fixed
   - Stage 5: also spawn `egm-inventive-catalyst` in parallel, and write both results into `zoom_out_report.md`
   - Pass `GoldfishContext` in both Stage 5 and Stage 8
2. Write the findings to `zoom_out_report.md` (Stage 5) or `intermediate_zoom_out_report.md` (Stage 8) with your file-writing tool
3. Tell the user the findings are in the report file, with its path. Do not paste them in chat
4. Checkpoint gate: use the three-option gate from the checkpoint rules
   - Stage 5: question `"Stage 5 (Initial Zoom Out Review) completed. Findings written to zoom_out_report.md. How would you like to proceed?"`, Option 0 `"Proceed to next stage: Stage 6 (Comprehension Test)"`
   - Stage 8 (Feature Spec gates only): question `"Stage 8 (Intermediate Zoom Out) completed. High-level architecture verified. How would you like to proceed?"`, Option 0 `"Conclude review and begin detailed implementation planning"`
   - Stage 8 (interactive full flow): question `"Stage 8 (Intermediate Zoom Out) completed. Findings written to intermediate_zoom_out_report.md. How would you like to proceed?"`, Option 0 `"Proceed to next stage: Stage 9 (Implementation Readiness Test)"`
   - Every case also has Option 1 `"I will update doc first (pause session; notify me in chat when edits are complete to re-run)"` and Option 2 `"Pause Review (save progress and exit)"`

### Subflow: Comprehension Test

1. Spawn `egm-comprehension` (at `agents/comprehension.md`) directly on `FeatureRange` and `DetailedRange`, with no document standard
   - Do not use the synthesizer: its report keeps only findings, and the author must see the paraphrase
   - The test checks that the document stands alone, not that it has detail
   - Do not apply `re-implementation-standard.md`: it asks for code-level detail, and the Zoom Out standard forbids that in `FeatureRange`
2. Write the full reviewer result to `comprehension_report.md` with your file-writing tool. Start with the two paraphrase headings word for word, then the findings. Keep the paraphrase even when there are no findings
3. Tell the user the findings are in `comprehension_report.md`, with its path. Do not paste them in chat
4. Checkpoint gate (Stage 6):
   - Question: `"Stage 6 (Comprehension Test) completed. Findings written to comprehension_report.md. How would you like to proceed?"`
   - Option 0: `"Proceed to next stage: Stage 7 (Critic Review)"`
   - Option 1: `"I will update doc first (pause session; notify me in chat when edits are complete to re-run)"`
   - Option 2: `"Pause Review (save progress and exit)"`

### Subflow: Critic Review

1. Run `egm-review-loop` in-thread on `FeatureRange` with:
   - Reviewers `[egm-design, egm-structural, egm-style]`
   - Standards `{"egm-design": "feature-spec-standard", "egm-structural": "feature-spec-standard"}`
   - `GoldfishContext`
2. Tell the user the findings are in `critic_report.md`, with its path. Do not paste them in chat
3. Checkpoint gate (Stage 7):
   - Question: `"Stage 7 (Critic Review) completed. Findings written to critic_report.md. How would you like to proceed?"`
   - Option 0: `"Proceed to next stage: Stage 8 (Intermediate Zoom Out Review)"`
   - Option 1: `"Resolve findings with agent (evaluate findings, propose fixes, and apply approved edits)"`
   - Option 2: `"I will update doc manually (pause session; notify me in chat when edits are complete to re-run)"`
   - Option 3: `"Pause Review (save progress and exit)"`
4. Option 1 (resolve):
   - Run `egm-resolve` in the main Elephant context on `FeatureRange`. Pass the findings from `critic_report.md` (or `goldfish_review_report.md`)
   - Apply approved fixes to `TargetFile` with file editing tools
   - Re-read `TargetFile` to recompute line bounds, then go to Stage 8 (or re-run Stage 7, at most 1 re-audit)

### Subflow: Implementation Readiness Test

1. Run `egm-review-loop` in-thread on `DetailedRange` with:
   - Reviewers `[egm-implementation-readiness, egm-codebase-details, egm-style]`
   - Standards `{"egm-implementation-readiness": "implementation-readiness-standard", "egm-codebase-details": "implementation-readiness-standard"}`
   - `GoldfishContext`
2. Tell the user the findings are in `implementation_readiness_report.md`, with its path. Do not paste them in chat
3. Final checkpoint gate (Stage 9):
   - Question: `"Stage 9 (Implementation Readiness Test) completed. Report written to implementation_readiness_report.md. How would you like to proceed?"`
   - Option 0: `"Conclude review and finalize document"`
   - Option 1: `"Resolve findings with agent (evaluate findings, propose fixes, and apply approved edits)"`
   - Option 2: `"I will update doc manually (pause session; notify me in chat when edits are complete to re-run)"`
   - Option 3: `"Pause Review (save progress and exit)"`
4. Option 1 (resolve):
   - Run `egm-resolve` in the main Elephant context on `DetailedRange`. Pass the findings from `implementation_readiness_report.md` (or `goldfish_review_report.md`)
   - Apply approved fixes to `TargetFile` with file editing tools
   - Re-read `TargetFile` to recompute line bounds, then end the review (or re-run Stage 9, at most 1 re-audit)
