---
name: plan-the-lion
description: Plans issue-tracker work at the right depth (one issue to create or update, a few slices under an existing epic or milestone, or a full backlog from a TDD or spec), and refines old, thin issues in place. Resolves hierarchy, titles, descriptions, labels, estimates and milestone, shows the plan, and waits for confirmation before writing anything. Works with GitHub Issues, Linear, Jira or similar. Use when the user asks to plan issues or tickets, break a TDD or spec into issues, write one small issue, update an existing issue, or refine stale issues.
---

# Plan the Lion

Read [`human-friendly`](../human-friendly/SKILL.md) before writing any text a person will read. Keep commands, paths, issue keys, numbers and dates exact.

Plan issues before you create or edit them: one issue, a few slices, a full backlog, or a refine pass on existing issues. **Never create or edit issues until the user confirms the plan.**

Use the tracker the repo uses. With GitHub: `gh issue list`, `gh issue view`, `gh issue create`, `gh issue edit`. With another tracker, use its CLI or MCP tool.

Optional: when the planned work has many states, retries, or async steps, suggest [`statechart-the-hart`](../statechart-the-hart/SKILL.md) in one line. Never block planning on it.

## Choose mode

Pick once at the start. If it is unclear, ask once. Do not default to the biggest mode.

| Mode        | Use when                                                                 |
| ----------- | ------------------------------------------------------------------------ |
| Simple  | One issue: create it, or update a known one. One logical change          |
| Slice   | 2 to 5 related issues under an existing epic, milestone or parent issue  |
| Backlog | A TDD, spec or approved design to break into issues, a new initiative, or phased delivery |
| Refine  | Existing issues that are old, vague, or missing context, and the user is about to work on them |

## Do not

- Create or edit issues before the user confirms the plan
- Create a new epic or parent for a one-file fix, unless the user asks
- Write one-line descriptions
- Mix two topic prefixes in one plan
- Duplicate issues that already exist. Search first
- Guess critical facts that an old issue leaves out (scope, business rule, data, contract, owner decision). Write them as open questions
- Post comments or mentions to teammates before the user approves the exact text
- Create new issues in Refine mode unless the user asks and confirms why the existing issue cannot hold the work

## Title format

Every issue in one plan starts with the same topic, so the group reads and sorts together:

`<Topic>: <action-led title>`

- Topic: 2 to 4 words, the epic or feature name. Choose it once. Reuse the topic sibling issues already use
- Title: starts with a verb. Do not repeat the topic
- No issue key in the title. Keep the whole title under about 90 characters

Example: `Demo data seed: add clock, faker and idempotent upsert`

## Issue fields

Every planned issue states these in the plan, as advice, before anything is written:

| Field              | How to decide |
| ------------------ | ------------- |
| Type               | Task, bug, feature or story, as the tracker names them. Most issues under an epic that already has its design are tasks |
| Estimate           | Story points or size, using the team's scale when it has one. Show old and new values before changing an existing estimate |
| Labels             | Area and type labels the repo already uses. Do not invent new labels without saying so |
| Milestone or sprint | The next one by default, or none when the team does not plan that way. Never move work into the current one without asking |
| Parent             | The epic, milestone or parent issue |

## Flows

### Simple

1. Search for an existing issue that already covers it
2. Create: draft the title and description from the template. Update: read the current issue, and change only the parts that are wrong or missing
3. Present the plan and wait for confirmation

### Slice

1. Read the parent and its existing children
2. Cut the work into 2 to 5 slices. Each slice can be built, reviewed and shipped on its own
3. Order them by dependency. Present the plan with a dependency diagram

### Backlog

1. Read the source (TDD, spec, PR) in full. Note section numbers and titles
2. Search for an existing epic or parent. Reuse it, do not create a second one
3. If the source has no design issue yet and the work needs one, propose a single design or spike issue first
4. Slice the build work. Keep each data migration, its index, and the code that uses it in the same slice
5. When the spec requires something the design only marks as a placeholder or out of scope, say so in the plan and propose a design follow-up
6. Present the plan with a dependency diagram

### Refine

1. Read each issue in full, with all comments, linked PRs, and the related code
2. List what is missing: current behaviour, expected behaviour, location in code, acceptance criteria
3. Fill gaps only from evidence. Turn every critical unknown into an open question, addressed to the right role (for example "Product: should archived items show in search?")
4. Show the proposed changes per issue as before and after. Wait for confirmation

## Present the plan

For each issue: title, type, parent, estimate, labels, milestone, and the full description. End with:

> Expected: 4 new tasks under `<parent>`. Estimates 2, 3, 3, 5. Labels `<label>`. Milestone `<next>`. Confirm, or tell me what to change.

For Slice and Backlog, add one `flowchart TD` dependency diagram, with one node per issue.

## Description template

```markdown
## Description

<One or two sentences: what and why.>

## Current behaviour

<What happens today. Leave out for a new feature.>

## Expected behaviour

<What should happen.>

## Location

- `path/to/file.ts`: <what lives there>

## Scope

- In: <items>
- Out: <items>

## Acceptance criteria

- [ ] <Testable criterion>
- [ ] <Testable criterion>

## Notes

<Links to the design doc section (number and title), related issues, open questions.>
```

For an issue that adds or changes a database query, add under Notes: each query, the index it uses (or a reason it needs none), and that the PR will show `EXPLAIN` output for it. Write "No new or changed queries" when that is true.

## Writing conventions

- Cite design doc sections by number and title ("section 6.5 Data model"), never a bare `§6.5`
- Lead with the plain term, then the jargon in brackets: "batch number [lot code]"
- Acceptance criteria are real checkboxes in the tracker, not escaped text

## After create

Report each created or updated issue with its key, title and URL, and the links between them (relates to, blocks). Do not start implementation. That is [`implement-the-ant`](../implement-the-ant/SKILL.md).
