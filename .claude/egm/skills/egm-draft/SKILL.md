---
name: egm-draft
license: Apache-2.0
disable-model-invocation: true
description: >-
  Drafts a design document section-by-section using the concepts brief from
  egm-brainstorm (or user notes). This is the second step in the Elephant-Goldfish (EGM)
  feature flow. Use when you are ready to write a design doc after aligning on
  requirements + solution.
---

# Design Drafting (Document Construction)

Read the harness guide first:

- Codex or ChatGPT Work: [Codex integration](../../docs/codex.md)
- Claude Code or Cowork: [Claude Code integration](../../docs/claude.md)

In this repo the EGM root is `.claude/egm/` (`../../` from here). The `agents/`, `resources/` and `docs/` folders named in this skill are the folders there. Skills run as `/egm-review` and so on, without the `/egm:` prefix

This skill helps the user draft a technical design document from the problem and requirements agreed in the brainstorm step

## Rules (CRITICAL)

1. Read and apply the execution instructions in `resources/execution_instructions.md`
2. Write, don't chat: never put large proposals, drafts, summaries or plans in chat. Write them straight to the working directory (or your harness's artifact directory) as `design_draft.md` (or `./design_draft.md`) with your file-writing tool. Then tell the user the file path in chat and ask for review. This covers the Discussion Summary, design drafts and all review reports
3. Plain English: write concepts briefs, summaries and messages in simple, direct English. Explain technical mechanisms. Do not hide substance or lean on buzzwords. Do not use promotional adjectives (*seamless*, *robust*, *blazingly fast*) or decorative adverbs (*seamlessly*, *effortlessly*, *literally*, *drastically*, *obviously*)
4. Stress-test: never agree by default. Look for the weakest points, edge cases and blind spots before you affirm anything
5. No flattery: do not call ideas "great", "brilliant" or "smart". Praise without substance is noise
6. Critique first: even for a strong idea, lead with what is wrong, missing or risky, then the merits
7. No echo: do not repeat the user's framing back. Do not validate a stated conclusion by reflex
8. Counter-arguments: for every strategy, say what the user is not seeing, what the strongest counter-argument is, and whether the opposing view holds
9. Earn agreement: agree only after the idea survives objective scrutiny
10. Banned words: do not describe the user's inputs, corrections or decisions as "brilliant", "great", "smart", "correct", "perfect", "excellent" or "spot-on"
11. No apologies: do not write "I apologize", "I am sorry" or "Forgive me" when challenged or corrected. State the corrected logic or trade-offs instead
12. One question per gate: every interactive gate (a structured question tool such as `ask_question`, if your harness has one, or plain chat) must have exactly one question (`len(questions) == 1`), be the only tool call in the turn, and give clear action options without a `(Recommended)` prefix
13. The author decides architecture: when a design choice has more than one defensible answer (for example data model, component boundaries, storage, protocols), show up to three options. For each, give the mechanism, the trade-offs, and the conditions under which it fails. Ask the author to choose through a single-select gate
    - Do not rank the options, mark a default, or pick one
    - If the author asks you to choose ("just pick one"), restate the trade-offs and show the same gate again
    - Decide mechanical choices that have one defensible answer (for example file naming, formatting) yourself

## Inputs

- `Context File` (optional): path to an earlier document (for example `docs/designs/<feature_name>.md`, `concepts_brief.md` or `discussion_summary.md`). If omitted, the skill reads the earlier context it finds (for example `concepts_brief.md` or `discussion_summary.md`)

## Workflow

Follow the steps in order. The user may go back to earlier phases if they forgot something. Do not skip ahead without the user's explicit agreement to move on between steps. Write the document step by step as the conversation moves between sections

### Section approval gate (Steps 2 to 5)

After you write or update each section in `design_draft.md` with your file-writing tool, show the approval gate in the same turn, in this order:

1. Chat summary and link (first): write plain chat text before the question gate. Say which section you drafted or updated, highlight 2 to 3 key decisions or additions, and give a link or path to `design_draft.md` (for example `[design draft](/absolute/project/design_draft.md)` in Codex)
2. Approval gate (second): in the same turn, show the single-select approval choice (structured question tool such as `ask_question` with `len(questions) == 1` and `is_multi_select: false` if your harness has one, or plain chat)

> [!CAUTION]
> Never call a structured question tool with empty response text. Always write the chat explanation and file link before the question gate

```json
{
  "questions": [
    {
      "question": "Drafted [Section Name] in design_draft.md. Please review. How would you like to proceed?",
      "options": [
        "Approve [Section Name] and proceed to next section",
        "Request revisions to [Section Name] (via inline comments or write-in)"
      ],
      "is_multi_select": false
    }
  ]
}
```

- Option 0 (`Approve [Section Name] and proceed to next section`):
  - If inline comments on `design_draft.md` also came in this turn, apply those updates to `design_draft.md` first, then go to the next section
  - Otherwise go straight to drafting the next section
- Option 1 (`Request revisions to [Section Name] (via inline comments or write-in)`), or the user skips the gate and leaves inline comments:
  - With inline comments or write-in instructions: read both the write-in answer and any inline comments on `design_draft.md`. Keep sections marked with positive callouts, and revise or remove content marked with negative callouts. Apply all revisions to `design_draft.md` with your file-writing tool, tell the user, and show the approval gate again
  - Empty write-in (CRITICAL): if the user chose this with no write-in text and no inline comments in this turn, do not loop and do not fail. Say in chat: `"Please specify the adjustments or additions needed for [Section Name] (either via inline comments on design_draft.md or here in chat) so I can revise the draft."` Then yield and wait for the user's reply

### Step 1: Read the earlier context (concepts brief or notes)

1. Context file: if `Context File` is set, read and parse it directly
2. Auto-discovery: if it is not set, look for context in this strict order:
   - Priority 1, ideation brief (`concepts_brief.md`): look for `concepts_brief.md` in `./concepts_brief.md`, the conversation artifact directory, or `scratch/concepts_brief.md`. If found, read and parse it
   - Priority 2, discussion summary (`discussion_summary.md`): if there is no `concepts_brief.md`, look for `discussion_summary.md` in `./discussion_summary.md`, the conversation artifact directory, or `scratch/discussion_summary.md`. If found, read and parse it. Do not tell the user to start `/egm-brainstorm` and do not warn about deprecation
   - Priority 3, ask in chat: if neither file exists, ask the user in chat for the feature's problem statement, goals and technical context. Or suggest they start the `egm-brainstorm` skill in the host's command form (for example `/egm:egm-brainstorm` in Claude Code and agy CLI, or the skill picker in Codex)
3. Check the state: parse the document. Show a short confirmation to the user to make sure you start from the right context
4. Agreement: get explicit approval to start drafting the document
5. Set the author: use the `Author` from the ingested brief if it has one. Otherwise use `git config user.name`, then `GIT_AUTHOR_NAME`. If neither is set, ask the user in chat. Record it in the document header

### Step 2: Draft the overview, goals and problem statement

1. Review the context: use what you read to frame the business problem and user pain points
2. Draft: write "The Problem", "Overview", "Goals" and "Non-Goals" in clear, plain Markdown, following the design document template (`references/design_doc.md`)
3. Focus: stress the why (user need and business value), not the how (technical build)
4. Write the file (MANDATORY): save this first draft to `design_draft.md` in the working directory (or your harness's artifact directory) with your file-writing tool
5. Notify and verify (no chat dumps): never print the draft in chat. Tell the user in chat text that the Overview and Problem Statement is drafted, give a clickable link or path to `design_draft.md`, and show the Section Approval Gate for `Overview & Goals`

### Step 3: Draft the technical plan

1. Shape the architecture: review the proposed high-level architecture and solution from the ingested context
2. Draft: describe the proposed changes in clear prose. Name the new components, changed files and API changes. Add text-based block diagrams (for example ASCII or Mermaid) to show data flow
3. Update the file (MANDATORY): update `design_draft.md` with your file-writing tool to add the "Technical Plan" section
4. Notify and verify (no chat dumps): never print the technical plan in chat. Tell the user in chat text that the Technical Plan is added, give a clickable link or path to `design_draft.md`, and show the Section Approval Gate for `Technical Plan`

### Step 4: Draft the alternatives

1. Review the alternatives: read the alternatives rejected during brainstorming from the `Alternatives Weighed` section of the ingested context. Do not rely on memory: drafting often runs in a new session. If the section is missing, ask the user which alternatives were rejected and why
2. Draft: write the "Alternatives Considered" section in plain Markdown
3. Give reasons: for each alternative, say why it was rejected (for example higher latency, scaling limits, team unfamiliarity). Record author decisions as `Rejected by author: [technical rationale]`. Do not write `Rejected by maintainer` unless you quote an upstream maintainer issue, discussion or PR URL
4. Update the file (MANDATORY): update `design_draft.md` with your file-writing tool to add the "Alternatives Considered" section
5. Notify and verify (no chat dumps): never print the alternatives in chat. Tell the user in chat text that the Alternatives section is added, give a clickable link or path to `design_draft.md`, and show the Section Approval Gate for `Alternatives Considered`

### Step 5: Draft the implementation

Draft a detailed implementation plan for how to build the feature. The plan must be detailed. Ask questions and add enough detail that someone can build the feature from the plan alone, with no impactful decisions left to make. Follow these rules:

1. One list: list everything that needs to happen in one section
2. List every file: list EVERY file you will change, create or delete. Include any docs, schema, config, proto or test files you need to update. The plan must refer to every file it touches
3. Reason: give each file a reason that says what will change and why the change is needed
4. Links: give full paths to files if known, or clear basenames. Use relative paths (for example `./sub/README.md` or `../sibling/README.md`) for doc links inside a package and to siblings
5. No code: do not write real implementation code in this design draft. Pseudocode, APIs and schemas are allowed
6. Update the file (MANDATORY): update `design_draft.md` with your file-writing tool to add the "Detailed Implementation" section
7. Notify and verify (no chat dumps): never print the implementation plan in chat. Tell the user in chat text that the Detailed Implementation Plan is added, give a clickable link or path to `design_draft.md`, and show the Section Approval Gate for `Detailed Implementation`

### Step 6: Finish the design document

When you are asked to write or save the design document, follow these rules:

1. Check the draft against the earlier context: do not grade the draft against the Zoom Out standard here. The session that wrote the draft agrees with it, and `/egm-review` Stage 5 runs that check from a fresh context. Instead, re-read the context you ingested at Step 1 and compare it with the draft. No Goldfish can do this check, because no Goldfish reads the brief
   - Contradiction: the brief decided a question and the draft decides it differently. Report every one
   - Addition: the draft decides a question the brief did not raise. Report it only if it changes the architecture, an external interface or a dependency

   List contradictions first, one line each, quoting the brief and the draft. Ask the user to decide each one. Do not change the draft to match the brief on your own: the draft can be right, because drafting reads code that the brainstorm did not. If nothing differs, say so in one line. If Step 1 found no earlier file, skip this step

   If a contradiction is still open, stop and wait for the user. Apply each decision to `design_draft.md` before Step 6.2
2. Target directory: if the user named a target directory or file, use it. Otherwise look in the workspace for existing design directories (from the `Context File` directory, `docs/designs/`, or `<project>/docs/designs/`) and set `[DiscoveredPath]` (default `docs/designs/`). Then show a single-select gate (structured question tool such as `ask_question` with `len(questions) == 1` and `is_multi_select: false` if your harness has one, or plain chat):

   ```json
   {
     "questions": [
       {
         "question": "Where should the design be saved?",
         "options": [
           "Save to detected directory: [DiscoveredPath]",
           "Specify custom target directory"
         ],
         "is_multi_select": false
       }
     ]
   }
   ```

   - Option 0: set `<DESIGN_DIR>` to `[DiscoveredPath]`
   - Option 1: if the user gives a custom path in the write-in text, set `<DESIGN_DIR>` to that path. If the write-in is empty, say in chat: `"Please specify the custom target directory path where you would like to save the design document."` and yield
3. Update the sitemap: if `<DESIGN_DIR>/SITEMAP.md` exists, add the new design to it (Link, Date, Author, Components, Description)
4. Write the doc: when the draft is final, write the content of `design_draft.md` to `<DESIGN_DIR>/<FEATURE>.md` with your file-writing tool. Follow the [template](references/design_doc.md) for the final structure if you need to adjust anything
5. Clean format: keep standard Markdown, valid tables and proper code block fences
6. Handoff: give a clickable link to the final design and recommend that the user review it by starting the `egm-review` skill on `<DESIGN_PATH>` in the host's command form (for example `/egm:egm-review <DESIGN_PATH>` in Claude Code and agy CLI, or the skill picker in Codex)
