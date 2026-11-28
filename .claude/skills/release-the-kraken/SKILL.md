---
name: release-the-kraken
description: The complex way to send a change for review. Use it instead of good-pr when the handoff needs choices, such as a tracker issue to sync, a stacked or split PR, an open PR to update, a parent issue whose PR is still open, a draft, or repo rules that are unclear. Checks the repo rules, picks the route, commits with good-commit, opens or updates the PR with good-pr, syncs the tracker when there is one, and reports every choice it made. Use when the user asks to release work, run the commit-to-review workflow, or open a PR that needs one of these choices. For one simple PR with no tracker, use good-pr.
---

# Release the Kraken

The complex route from a finished change to a reviewable PR. For a simple PR (one branch, one PR, no tracker, no special routing), use [`good-pr`](../good-pr/SKILL.md) alone.

This skill adds the choices around good-pr. The title, body, worktree, assignee and check rules all come from good-pr. Do not copy them here.

## Rules

- Never force-push
- Never merge, and never enable auto-merge. Merging is [`good-merge`](../good-merge/SKILL.md)'s job
- Push to the default branch only when the repo rules allow it and the user asks in this request
- Do not request reviewers unless the user names them in this request
- Never invent an issue key or number. If the repo requires one and it is missing, stop and ask
- Never reopen a closed PR
- Agent sessions never switch branches in the main checkout. Use the worktree steps in good-pr step 1
- Do not run formatters or `lint --fix` over existing files before committing. Formatting new files is fine
- Keep the chat short. The PR body is good-pr's job

## 1. Preflight

Run these and keep the output for the report:

- `git branch --show-current`. Stop on a detached HEAD
- `git status -sb` and `git status --short`
- Base: `gh repo view --json defaultBranchRef --jq .defaultBranchRef.name`, unless `CONTRIBUTING.md`, `AGENTS.md` or `CLAUDE.md` name another
- Repo rules: read `CONTRIBUTING.md`, `AGENTS.md` and `CLAUDE.md` for branch, PR, draft, review, tracker and check rules. Then `gh api repos/{owner}/{repo}/rules/branches/<base>`. A 404 or an empty list means no rule, not permission to push directly
- Existing PR: `gh pr list --head <branch> --state all --json number,title,url,state,baseRefName`
- Tracker: find its key in the branch name, the commit, or the user's message. No key and no tracker means skip steps 3 and 6

Stop and report when:

- The HEAD is detached
- The branch has a closed PR
- Uncommitted changes are there and you cannot tell whether they belong to this change

If the current branch is the base, do not switch branches in the main checkout. Create a worktree and branch as good-pr step 1 says, then run every later step there.

## 2. Pick the route

Pick one row. If two rows fit, take the riskier one, as [`AGENTS.md`](../../../AGENTS.md) says. The route sets the base, the draft flag and whether a new PR is made.

| Situation | Route | Default |
| --- | --- | --- |
| Repo rules allow direct pushes to the base, and the user asks for it | Commit and push to the base. No branch and no PR. Skip steps 5 and 7 | Only when asked |
| Normal change | New branch and one PR into the base | Yes |
| The branch already has an open PR | Update that PR with good-pr step 5 | Yes |
| The change builds on another open PR | Stacked PR. The base is that PR's branch. Say so in the report | Ask if the parent is unclear |
| A sub-task of a parent issue whose PR is still open | Extra commit on the parent PR, not a second PR | Unless the user says otherwise |
| The change is too big to review as one | Split into several PRs or keep one | Ask |
| The work is not ready for review | Draft PR | Only when the repo asks or the user says so |
| The repo rules say a PR is required, but the base is unclear | Stop and ask | Ask |

Other choices, with their defaults:

- Base: the default branch, or the parent branch for a stacked PR, or the branch the repo docs name
- Draft: no, unless the repo asks or the user says so
- Reviewers: none, unless the user names them
- Assignee: the user who runs the skill. good-pr sets it
- Commits: as good-commit splits them. No squash here, because [`good-merge`](../good-merge/SKILL.md) squashes at merge
- Ready: keep the current draft state. Run `gh pr ready` only when the user asks for review now

Ask only when the answer changes what happens next, such as unclear repo rules, one PR or several, or an unclear stacked base. For every other choice, take the default and list it in the report.

When the change moves a status or queue flow that a reviewer must follow, suggest [`statechart-the-hart`](../statechart-the-hart/SKILL.md) in one line. Never block the handoff on it.

## 3. Read the issue (when there is one)

- `gh issue view <n> --json title,body,labels,url`. With another tracker, use its CLI or MCP tool
- Use the issue for Situation and Proposal in the PR body. Do not copy its acceptance criteria into the body
- A sub-task of a parent issue follows the route table in step 2

## 4. Commit

Follow [`good-commit`](../good-commit/SKILL.md): atomic commits, Conventional Commits messages, the project checks, then `git diff --check`.

- Leave out unrelated files. Ask when unsure
- If a check fails, stop and report. Do not open the PR
- No commits ahead of the base (`git log origin/<base>..HEAD --oneline` is empty): stop and say so

## 5. Push and open or update the PR

- Push: `git push -u origin HEAD`
- Title, body, create or edit: follow [`good-pr`](../good-pr/SKILL.md) steps 5 to 8 as written. Do not use another template
- Create as a draft only when the route says so
- For a stacked PR, `--base` is the parent branch

## 6. Sync the tracker (when there is one)

- Update the issue text only where it no longer matches the PR scope. Add the PR link
- Move the issue to its review status (for example "In review") when the tracker has one. If the move fails, report it and continue

## 7. Check the PR

- `gh pr view <n> --json url,title,baseRefName,isDraft,mergeable,assignees`
- Title, base, draft state and assignee match the route and good-pr
- `gh pr checks <n>` shows CI. Report its state. If checks are still running, say so and do not poll
- `mergeable` is `CONFLICTING`: report it and point to [`address-the-elephant`](../address-the-elephant/SKILL.md). Do not fix it here

## 8. Hand off

Final message, in this order:

- PR URL and title
- Route, and each default the skill took (base, draft, reviewers)
- CI state from `gh pr checks`
- One line for anything that failed or was skipped
- Next step: review, then [`good-merge`](../good-merge/SKILL.md) after approval
