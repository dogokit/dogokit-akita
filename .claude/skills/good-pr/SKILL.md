---
name: good-pr
description: Create or update a GitHub pull request for the current branch, with a plain-English title and a short, scannable body. Commits leftover changes with good-commit, pushes, checks the base branch and any existing PR, and reports the PR link. Use when the user asks to create a PR, open a PR for review, or update a PR's title or body.
---

# Good PR

Open or update one PR from the current branch. Read [`human-friendly`](../human-friendly/SKILL.md) before writing the title or body.

## Rules

1. Create or edit a PR only when the user asks
2. Title is plain English. No `type(scope):` prefix, no period, 60 characters or less
3. Body is short. Use the template below and cut what a reviewer does not need
4. Never force-push. Never use `--no-verify`
5. Never invent an issue key or number. If the repo needs one and it is missing, stop and ask
6. Assign each new PR to the user who creates it. Request reviewers only when the user names them
7. Never add AI or tool credit text to the PR title or body, in any section. That includes "Generated with" footers, "Claude Code" links and "Co-Authored-By" lines. Commits keep only their Co-Authored-By line
8. Stay short in chat
9. In an agent session (Claude Code, Codex, Cursor, Orca, T3 Code, or similar), work in a new worktree, not in the main checkout. Move the session into that worktree and run every later command there. The main checkout stays on the base branch, so `git checkout` never leaves it stuck on a PR branch

## Workflow

1. Check the branch and base
   - Current branch: `git branch --show-current`. Stop on a detached HEAD
   - Base: `gh repo view --json defaultBranchRef --jq .defaultBranchRef.name`, unless `CONTRIBUTING.md`, `AGENTS.md` or `CLAUDE.md` name another
   - On the base branch: do not switch branches here. Create a new worktree and branch, then do every later step inside it
     - Branch name: `<type>/<issue-key>-short-slug` or `<type>/short-slug`
     - Use the tool's own worktree feature when it has one (for example Claude Code `EnterWorktree` or an Orca worktree)
     - Otherwise: `git fetch origin && git worktree add -b <branch> .claude/worktrees/<slug> origin/<base>`
     - Uncommitted changes in the main checkout: copy them over with `git diff HEAD --binary | git -C <worktree> apply` and copy untracked files by hand. Ask before you clean them out of the main checkout
     - Skip the worktree only when the repo rules allow direct pushes to the base
   - Already in a worktree on a feature branch: keep going there
   - An existing PR branch: check it out in a new worktree with `git fetch origin <branch> && git worktree add .claude/worktrees/<slug> <branch>`, not with `git checkout` or `gh pr checkout` in the main checkout
   - Base is another open PR's branch (a stacked PR): say so in the report. [`good-merge`](../good-merge/SKILL.md) moves this PR to the default branch after that PR merges
2. Commit what is left
   - `git status --short`. Commit the changes that belong to this PR with [`good-commit`](../good-commit/SKILL.md)
   - Leave out unrelated files. Ask when unsure
   - Run the project checks (`package.json`, `CLAUDE.md`, CI) before the commit. If one fails, stop and report. Do not open the PR
   - No commits ahead of the base: `git log origin/<base>..HEAD --oneline` is empty. Stop and say so
3. Read the issue (when there is one)
   - `gh issue view <n> --json title,body,url`. With another tracker, use its CLI or MCP tool
   - Use it to write Situation and Proposal. Do not copy its acceptance criteria into the body
4. Push: `git push -u origin HEAD`
5. Find an existing PR: `gh pr list --head <branch> --state all --json number,title,url,state,baseRefName`
   - Open PR: edit it in step 7
   - Closed PR: stop and report. Do not reopen it
   - No PR: create one in step 7
6. Write the title and body, following the rules below
7. Create or edit
   - Write the body to a file outside the repo (the scratchpad folder), so the Mermaid block and line breaks stay exact
   - Create, GitHub: `gh pr create --base <base> --head <branch> --title "<title>" --body-file <file> --assignee @me`. Add `--draft` only when the repo asks for drafts
   - Create, GitLab: get the user with `glab api user --jq .username`, then `glab mr create --source-branch <branch> --target-branch <base> --title "<title>" --description "$(cat <file>)" --assignee <username>`
   - Create, Bitbucket Cloud: it has no assignee field. Open the PR as usual and say so in the report. Do not add the creator as a reviewer
   - Edit: `gh pr edit <n> --title "<title>" --body-file <file>`. Leave assignees as they are
8. Check: `gh pr view <n> --json url,title,baseRefName,isDraft,mergeable,body,assignees`
   - Title and base are as expected
   - A new PR has the creator as its only assignee. Fix it with `gh pr edit <n> --add-assignee @me` if not
   - Body starts with the issue URL (when there is one) and has no footer
   - `mergeable` is `CONFLICTING`: report it and point to [`address-the-elephant`](../address-the-elephant/SKILL.md). Do not fix it here

## Title

Write the title for a reader who has not seen the code. Say what changes for the user or the team, in plain words.

- Start with a verb: Add, Fix, Move, Stop, Rename, Remove
- Name the thing, not the file: "Add search input to home page", not "add search input in home.html"
- With an issue: `<issue key> <plain title>`, for example `ABC-42 Fix search crash on empty input`. Rewrite a technical issue title in plain words
- Keep the issue key exact. Never make one up

Good: `Add search input to home page`, `Fix crash when search box is empty`, `ABC-42 Add search input to home page`

Bad: `feat(home): add search input`, `fix: null check`, `refactor skills`, `Update files.`

## Body

```text
<issue URL, when there is one>

## Description

<one sentence: what this PR does>

## Situation

<one or two sentences: what is true now>

## Proposal

<one or two sentences: what changes>

<Mermaid diagram, only when the rules below say so>
```

Rules:

- Keep the three section names and their order exactly as shown
- Description: one sentence. Say the change, not the reason
- Situation: what the reader sees or can do today. Name the problem, not the file
- Proposal: what happens after this PR. Put a behaviour change callers will notice here
- No Changes list, no Acceptance Criteria, no Verification section. Those live in the issue and in CI. Report check results in chat, and never claim a check passed unless it ran
- Aim for about 60 words, not counting the diagram
- No footer

Diagram: add one under `## Proposal`, with a `### Approach` heading, when the change adds or moves a validation, guard, request path, job, retry, state change or integration call. Leave it out for renames, copy, config, docs, test-only changes and dependency bumps.

- Use code symbol names (for example `AuthService.create`) and mark new or changed nodes `(new)` or `(changed)`
- About 10 nodes. Show decisions and outcomes, not every call
- `flowchart TD` for flows, `sequenceDiagram` for calls between systems, `stateDiagram-v2` for status moves, `erDiagram` for schema changes, `classDiagram` for type shape
- Trackers that do not render Mermaid (for example Jira): the same diagram as plain ASCII in a code block
- Stack a `Before` above an `After` when readers must compare old and new

## Report

Give the PR URL, the title, the base, and the assignee. Add one line for anything that failed or was skipped.
