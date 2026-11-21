---
name: merge-good
description: Merge a GitHub pull request with a merge commit, then clean up. Checks that CI passes and the PR is mergeable, merges, deletes the merged branch locally and on origin, switches to main and pulls. Use when the user asks to merge a PR, land it, or clean up after a merge.
---

# Merge good

Merge a PR so all its commits land in `main`, then tidy up. Read [`human-friendly`](../human-friendly/SKILL.md) before writing the report

## Rules

1. Merge only when the user asks
2. Use a merge commit (`--merge`) unless the user names another method
3. Never bypass checks. No `--admin`, no `--auto`, no force
4. Delete only a branch that is merged. Use `git branch -d`, never `-D`
5. Never delete `main` or the default branch
6. Stay short

## Workflow

1. Check the PR: `gh pr view <n> --json state,mergeable,mergeStateStatus,isDraft,reviewDecision` and `gh pr checks <n>`
2. Stop and report if the PR is closed, draft, conflicting, or has a failing or pending check. Do not merge
3. Check the repo allows the method: `gh repo view --json mergeCommitAllowed`
4. Merge: `gh pr merge <n> --merge`
5. Confirm: `gh pr view <n> --json state,mergeCommit`
6. Switch and update: `git checkout main`, then `git pull --ff-only`
7. Delete the branch: `git branch -d <branch>`, then `git push origin --delete <branch>`
8. Check: `git status -sb` shows a clean `main` that matches `origin/main`

If the PR number is missing, use the PR for the current branch: `gh pr view --json number`

## Report

Say in one or two lines:

- The PR number and the merge commit
- The branch deleted, local and remote
- That `main` is up to date

## Edge cases

- Review required or unresolved threads: tell the user, do not merge
- Uncommitted changes block the checkout: tell the user, do not stash or discard
- Remote branch already deleted by GitHub: skip the remote delete
- Branch not fully merged: keep it and tell the user
- Squash or rebase asked: use `--squash` or `--rebase` and say so
