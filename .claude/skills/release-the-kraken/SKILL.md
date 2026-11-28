---
name: release-the-kraken
description: Commit, push, open, and hand off the current change for review. Checks the branch and PR base, commits with good-commit, opens or updates the PR with good-pr, moves the linked issue to its review status when a tracker is used. Use when the user asks to release work, create a PR, open a PR for review, or run the commit-to-review workflow.
---

# Release the Kraken

Run the commit-to-review handoff. The PR title and body come from [`good-pr`](../good-pr/SKILL.md). This skill does not have its own PR format.

## Rules

- Never force-push
- Never push to the default branch unless the repo rules allow it and the user asks for it in this request. Check the repo rules first (step 1). If they are unclear, ask the user
- Do not request reviewers unless the user names them in this request
- Never invent an issue key or number. If the repo requires one and it is missing, stop and ask
- Do not run formatters or `lint --fix` over existing files before committing. Formatting new files is fine

Optional: when the change moves a status or queue flow that a reviewer must follow, suggest [`statechart-the-hart`](../statechart-the-hart/SKILL.md) in one line. Never block the handoff on it.

## 1. Check the branch and base

- Find the base: the repo's default branch (`gh repo view --json defaultBranchRef --jq .defaultBranchRef.name`), unless the user or the repo docs name another
- Find the repo rules for the default branch: read `CONTRIBUTING.md`, `AGENTS.md` and `CLAUDE.md`, then check branch protection with `gh api repos/{owner}/{repo}/rules/branches/<default>`. A 404 or an empty list means no rule, but it does not mean the team allows direct pushes
- If the rules say a PR is required, never open a PR from the default branch. If you are on it, create a branch first, as in step 1 of [`good-pr`](../good-pr/SKILL.md). In an agent session, use a new worktree
- If the rules allow direct pushes, or the user says to push to the default branch, commit and push there with no branch or PR, and skip steps 4 and 5
- If the rules are unclear, ask the user: push to the default branch, or branch and PR
- If the repo documents its own branch names or release flow (in `CONTRIBUTING.md`, `AGENTS.md` or `CLAUDE.md`), follow that instead

## 2. Read the issue (when there is one)

- Read the title and acceptance criteria. With GitHub: `gh issue view <n> --json title,body,labels,url`. With another tracker, use its CLI or MCP tool
- Note sub-tasks or bugs that belong to a parent issue whose PR is still open. Those land on the parent's PR as an extra commit, not as a second PR, unless the user says otherwise

## 3. Commit

Follow [`good-commit`](../good-commit/SKILL.md): keep each commit atomic, use Conventional Commits, run the project checks, then `git diff --check`. Do not open the PR when a check fails.

## 4. Push and open or update the PR

- Push: `git push -u origin HEAD`
- Write the title and body with [`good-pr`](../good-pr/SKILL.md), including its diagram and body rules. Do not use any other template
- Create or edit the PR as `good-pr` says. Create it as a draft only when the repo workflow asks for that

## 5. Sync the issue (when there is one)

- Update the issue only when its text no longer matches the scope of the PR. Change only the parts that differ, and add the PR link
- Move the issue to its review status (for example "In review") when the tracker has one. If the move fails, report it and continue

## 6. Ready and hand off

```bash
gh pr ready <n>          # only when it was a draft and the user wants review now
gh pr edit <n> --add-assignee @me
```

## 7. Final check

Run the `good-pr` final check with real command output. The PR base, title, body and assignee must match `good-pr`. The final message is the PR URL, plus one line for anything that failed.
