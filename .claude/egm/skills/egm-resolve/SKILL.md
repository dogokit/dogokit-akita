---
name: egm-resolve
license: Apache-2.0
disable-model-invocation: true
description: >-
  The Elephant resolution skill. Ingests flat deficiency reports from
  concurrent Goldfish reviewers, applies automated fixes for PROPOSE FIX
  items via UI multiple-choice gates, and presents interactive
  negotiation/re-sync checkpoints.
---

# Goldfish Review: Resolve

Read the harness guide first:

- Codex or ChatGPT Work: [Codex integration](../../docs/codex.md)
- Claude Code or Cowork: [Claude Code integration](../../docs/claude.md)

In this repo the EGM root is `.claude/egm/` (`../../` from here). The `agents/`, `resources/` and `docs/` folders named in this skill are the folders there. Skills run as `/egm-review` and so on, without the `/egm:` prefix

## Overview

Use this skill in the main Elephant context window. You read the flat deficiency reports from the Goldfish reviewers that ran at the same time. You defend design choices that are right, apply automatic text fixes, and run negotiation checkpoints with the user

## Prerequisites and context

- Run this skill in the long-lived conversation session that wrote the target document (the Elephant). It remembers the earlier reasoning, so it makes better fixes

## Inputs

The caller or orchestration driver gives exactly these parameters:

- `TargetFile`: path to the target document, absolute or relative
- `LineRange`: exact line numbers (or `full file`)
- `FindingsList`: the merged flat list of findings from the Goldfish reviewers

## Workflow

### Step 1: Check the input and gather context

1. Pick the mode by checking whether arguments are present:
   - Automated mode: if all parameters are given, run silently as a subprocess
   - Standalone human mode: if parameters are missing, start a friendly intro. Ask for one input at a time and wait for the user's reply after each turn. When all inputs are set, show the final setup and check that the user is ready to continue
2. Read `TargetFile` at `LineRange` and parse the `FindingsList`

### Step 2: Evaluate and sort

Give each finding exactly one category:

- `CONTEST`: the critique is wrong or rests on a misreading of the codebase. Cite evidence the reviewer could read: a file and symbol, or a decision recorded in the document
- `ESCALATE`: the critique is wrong, but the evidence is outside every file the reviewer could read (for example a team convention or a spoken decision). Say so. Do not fix the finding. Give it to the user
- `PROPOSE FIX`: the critique is valid. Write exact text replacements or structure changes to close the gap
- `DECLINE`: the finding is a Nit. Record it. Do not fix it. You may use `PROPOSE FIX` for a Nit if the fix is worth it

Rules:

- A contest must be checkable. "This was intentional" is not evidence. If you cannot cite evidence the reviewer could read, use `ESCALATE` or `PROPOSE FIX`
- Do not add context only to satisfy a reviewer. Add context when a human reader of the document needs it. If only a zero-context subagent needs it, use `ESCALATE`
- Do not contest a comprehension gap. If a fresh reader could not follow the document, the document is missing context
- Do not change a severity. If you think a Blocker is a Nit, `CONTEST` it and give the reason
- You wrote the document under review. Wanting to contest is not evidence that the reviewer is wrong

### Step 3: Write the fix report

Build the final report and save it as `goldfish_review_report.md` in the working directory (or your harness's artifact directory) with your file-writing tool. Use this layout:

```markdown
# Goldfish Annotated Review Report

**Target:** `[TargetFile]` (`[LineRange]`)

## Prioritized Findings & AI Suggestions

{{range findings, ordered by Severity}}
### [Issue 1] [`[ReviewerPersona]`] - Severity: [Blocker | Major | Nit]
*   **Affected Scope:** [Lines Start-End]([RelativePath]#L[Start]-L[End]) ([Sub-header])
*   **Discrepancy Description:** [copied from FindingsList]
*   **Rationale:** [copied from FindingsList]
*   ***AI Suggestion:*** [CONTEST | ESCALATE | PROPOSE FIX | DECLINE]
*   ***Justification:*** [Detailed reason]
*   ***Proposed Edit:***
    *   Location: [Line/Header]
    *   Change: [Precise replacement string or deletion note]
{{end}}
```

### Step 4: Resolution gate

If any finding is `ESCALATE`, list those findings first in the chat message. They need the user's knowledge, not only approval

Before you go on, write this visible chat message to the user: *"I have compiled the audit findings into `goldfish_review_report.md`. Please review the findings there and choose how you would like to proceed:*

- *Comment directly on the file: review `goldfish_review_report.md` in chat or the file, and leave comments or edits to approve, reject, or contest specific items*
- *Auto accept: reply "auto accept" to apply all proposed fixes at once (contested items are skipped)*
- *Continue to next phase: reply "continue" or "no changes" to go on without applying fixes*
- *Interactive breakdown: reply "interactive breakdown" for a guided, item-by-item walkthrough in chat, with a detailed explanation of each proposed edit or contested finding before you decide*
- *Custom instruction or wildcard request: reply with any custom instruction, question, or out-of-band request."*

Then yield right away: call zero tools in this turn. Stop and go idle until the human developer comments on or edits the file, or replies in chat

Read the user's action or reply like this:

- "Auto accept", "Accept all suggestions", or the user clicks "Proceed" without contesting: apply all fixes where the AI suggestion was `PROPOSE FIX` straight to `TargetFile` at `LineRange` in one batch with your file-editing tool. Skip every item marked `CONTEST`, `ESCALATE` or `DECLINE`. Then go to Step 5
- "Continue to next phase" or "No changes": do not apply any automatic fixes. Then go to Step 5
- "Interactive breakdown": run a one-by-one loop over ALL finding items (every category except `DECLINE`):
  1. For each item `i`, write a visible chat message with the full finding details and explanation in rich markdown:

     ```markdown
     ### Breakdown Item [i]: [Issue Title] [`[ReviewerPersona]`]
     * **Scope:** [Lines Start-End]([RelativePath]#L[Start]-L[End]) ([Sub-header])
     * **Description:** [Description]
     * **AI Suggestion:** [CONTEST | ESCALATE | PROPOSE FIX]
     * **Explanation & Justification:** [Detailed reason and background explaining why the fix is proposed or why the finding is contested]
     * **Proposed Edit:** [Precise replacement text or deletion note]
     ```

     Then ask the user in chat for a decision on this item (call zero tools and go idle):

     - `PROPOSE FIX`: ask the user to reply "Accept proposed fix", "Skip / ignore", or "Discuss"
     - `CONTEST`: ask the user to reply "Skip / agree with contest", "Overrule contest (propose fix)", or "Discuss"
     - `ESCALATE`: ask the user to reply "Confirm (no change)", "Add the fact to the document", or "Discuss"
  2. Record the user's decisions in an internal checklist (for example *Item 1: Accepted*, *Item 2: Ignored*, *Item 3: Overruled*). Do not call any file-editing tool during this loop
  3. When every item has a decision, sum up the accepted edits, apply them with your file-editing tool, and go to Step 5
- Custom instruction or out-of-band edit: if the user gives specific instructions, apply them and go to Step 5

### Step 5: Sync after resolution and exit

1. Re-check lines: if you changed `TargetFile`, check that the file is still coherent and valid markdown
2. Mark the report as resolved: add a `Status: resolved` line at the top
3. Hand off: exit cleanly to the caller (such as `egm-review-loop`) with these counts: accepted fixes, contested items, escalated items, declined items, and issues still open
