---
name: release-the-kraken
description: Commit, push, open, and hand off the current change for review. Checks the branch and PR base, sets the PR title from the linked issue, keeps the PR body short and scannable (Description, Approach diagram, Changes, Acceptance Criteria), and moves the linked issue to its review status when a tracker is used. Use when the user asks to release work, create a PR, open a PR for review, or run the commit-to-review workflow.
---

# Release the Kraken

Run the commit-to-review handoff. Read [`human-friendly`](../human-friendly/SKILL.md) before writing the PR description.

## Rules

- When the work has an issue (GitHub Issues, Linear, Jira, or similar), the PR body starts with the issue URL above `## Description`. Check this on every create and every edit
- Never invent an issue key or number. If the repo requires one and it is missing, stop and ask
- Never force-push
- Do not assume a branch and PR are needed, or that a direct push to the default branch is fine. Check the repo rules first (step 1). If they are unclear, ask the user
- Do not request reviewers unless the user names them in this request
- Keep the PR body template sections and their order exactly as given. Apply `human-friendly` only to the prose inside them
- Do not run formatters or `lint --fix` over existing files before committing. Formatting new files is fine
- Do not add a "Generated with …" footer unless the repo or the session's instructions ask for one

Optional: when the change moves a status or queue flow that a reviewer must follow, suggest [`statechart-the-hart`](../statechart-the-hart/SKILL.md) in one line. Never block the handoff on it.

## 1. Check the branch and base

- Find the base: the repo's default branch (`gh repo view --json defaultBranchRef --jq .defaultBranchRef.name`), unless the user or the repo docs name another
- Find the repo rules for the default branch: read `CONTRIBUTING.md`, `AGENTS.md` and `CLAUDE.md`, then check branch protection with `gh api repos/{owner}/{repo}/rules/branches/<default>`. A 404 or an empty list means no rule, but it does not mean the team allows direct pushes
- If the rules say a PR is required, never open a PR from the default branch. If you are on it, create a branch first: `<type>/<issue-key>-short-slug` (for example `feat/123-export-csv` or `fix/PROJ-42-null-email`), or `<type>/short-slug` when there is no issue
- If the rules allow direct pushes, or the user says to push to the default branch, commit and push there with no branch or PR, and skip steps 5 and 6
- If the rules are unclear, ask the user: push to the default branch, or branch and PR
- If the repo documents its own branch names or release flow (in `CONTRIBUTING.md`, `AGENTS.md` or `CLAUDE.md`), follow that instead

## 2. Read the issue (when there is one)

- Read the title, type, and acceptance criteria. With GitHub: `gh issue view <n> --json title,body,labels`. With another tracker, use its CLI or MCP tool
- Note sub-tasks or bugs that belong to a parent issue whose PR is still open. Those land on the parent's PR as an extra commit, not as a second PR, unless the user says otherwise

## 3. Commit

Follow [`good-commit`](../good-commit/SKILL.md): keep each commit atomic, use Conventional Commits, run focused checks, then `git diff --check`.

## 4. Push

```bash
git push -u origin HEAD
```

## 5. Create or update the PR

- Check for an existing PR first: `gh pr list --head <branch> --json number,title,url,state,baseRefName`
- Create it as a draft when the repo workflow asks for that, with the base from step 1
- Title: `<issue key> <issue title>` when there is an issue, otherwise a Conventional Commits style title (`feat: add CSV export`)

PR body, in this order:

```text
<issue URL, when there is one>

## Description

**Problem:** <one sentence: what was broken or missing, and who saw it>

**Fix:** <one or two sentences: what happens now>

### Approach

<Mermaid diagram: see "Diagram" below>

## Changes

- <path or symbol>: <action>

## Acceptance Criteria

- [x] <criterion from the issue>
```

### Keep the body short

Reviewers scan the PR. Aim for about 200 words in the whole body, not counting the diagram.

- Description: the `**Problem:**` and `**Fix:**` lines only. One idea per sentence. Design reasons and edge cases go in code comments or the issue
- Optional extra lines, each one bold label and one sentence, only when needed:
  - `**Heads-up:**` for a behaviour change callers will notice
  - `**QA:**` when manual checks are still to do, with the steps in one line
- Changes: one line per file, written as an action (`add X`, `split Y`). Do not repeat the Description
- No Verification section. Do not list tests, lint, type checks or test counts in the body. CI shows them
- Do not repeat facts across sections

Before you create or edit the PR, reread the body and cut every sentence a reviewer does not need to approve it.

### Diagram

| Change                                                                                                   | Diagram                                                   |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| A new or changed validation, guard order, request path, job or retry path, state transition, integration call, or module boundary | Required. One diagram under `### Approach` |
| Large rework of an existing flow, where readers must compare old and new                                 | Required. A small `Before` and `After` pair, stacked  |
| No flow change: rename, constant, copy text, config value, docs, test-only, dependency bump               | Optional. Leave out `### Approach` when it adds nothing   |

Diagram rules:

- Use the symbol names from the code (for example `OrderService.create`), so reviewers can map nodes to the diff
- Mark new or changed nodes with `(new)` or `(changed)`
- Keep it to about 10 nodes. Show decision points and outcomes, not every call
- Pick the type that fits (same catalogue as [`tdd-the-barramundi`](../tdd-the-barramundi/SKILL.md)): `flowchart TD` for guard order and activity flows, `sequenceDiagram` for calls between systems, `stateDiagram-v2` for status moves, `erDiagram` for schema changes, `classDiagram` for type shape
- Draw top to bottom: `flowchart TD`, never `LR`. Stack `Before` above `After`
- Trackers that do not render Mermaid (for example Jira) get the same diagram as plain ASCII in a code block

Run the focused checks before you commit. Do not open the PR when they fail. Report their results in chat, not in the PR body, and never claim a check passed unless it ran.

## 6. Sync the issue (when there is one)

- Update the issue only when its text no longer matches the scope of the PR. Change only the parts that differ, and add the PR link
- Move the issue to its review status (for example "In review") when the tracker has one. If the move fails, report it and continue

## 7. Ready and hand off

```bash
gh pr ready <n>          # only when it was a draft and the user wants review now
gh pr edit <n> --add-assignee @me
```

## 8. Final check

Confirm, with real command output:

- PR base is the intended branch (`gh pr view <n> --json baseRefName`)
- PR title is the expected title
- The body starts with the issue URL (when there is one), is about 200 words without the diagram, has no Verification section, and has a diagram whenever the change alters a flow
- The assignee is set
- The issue status moved (when there is a tracker)

The final message is the PR URL, plus one line for anything that failed.
