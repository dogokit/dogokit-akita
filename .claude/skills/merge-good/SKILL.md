---
name: merge-good
description: Merge a GitHub pull request with a merge commit, then clean up. Checks that CI passes and the PR is mergeable, merges, deletes the merged branch locally and on origin, switches to main and pulls. Use when the user asks to merge a PR, land it, or clean up after a merge.
---

# Merge good

Merge a PR so all its commits land in `main`, then tidy up. Read [`human-friendly`](../human-friendly/SKILL.md) before writing the report

## Rules

1. Merge only when the user asks
2. Create a PR when the branch has none. Never merge a branch that has no PR
3. Use a merge commit (`--merge`) unless the user names another method
4. Never bypass checks. No `--admin`, no `--auto`, no force
5. Delete only a branch that is merged. Use `git branch -d`, never `-D`
6. Never delete `main` or the default branch
7. Stay short

## Workflow

1. Find the PR for the current branch: `gh pr view --json number,state,headRefName`
2. No PR (the command fails, or the branch is not pushed): create one
   - Push the branch first if it is not on origin: `git push -u origin <branch>`
   - Create it: `gh pr create --base main --head <branch> --title "<title>" --body "<body>"`
   - Title: the subject of the newest commit on the branch, or the single commit's subject
   - Body: a short Description and Changes, ending with the attribution line from the session context, if any
   - Do not run `release-the-kraken`. Keep this to the one `gh pr create` call
3. If the PR is closed, stop and report. Do not reopen it
4. Check the PR: `gh pr view <n> --json state,mergeable,mergeStateStatus,isDraft,reviewDecision` and `gh pr checks <n> --watch` (wait for pending checks to finish)
5. Stop and report if the PR is draft, conflicting, or has a failing check. Do not merge
6. Check the repo allows the method: `gh repo view --json mergeCommitAllowed`
7. Merge: `gh pr merge <n> --merge`
8. Confirm: `gh pr view <n> --json state,mergeCommit`
9. Switch and update: `git checkout main`, then `git pull --ff-only`
10. Delete the branch: `git branch -d <branch>`, then `git push origin --delete <branch>`
11. Check: `git status -sb` shows a clean `main` that matches `origin/main`

## Report

Say in one or two lines:

- The PR number and the merge commit, and whether this run created the PR
- The branch deleted, local and remote
- That `main` is up to date

## Edge cases

- Review required or unresolved threads: tell the user, do not merge
- Uncommitted changes block the checkout: tell the user, do not stash or discard
- Remote branch already deleted by GitHub: skip the remote delete
- Branch not fully merged: keep it and tell the user
- Squash or rebase asked: use `--squash` or `--rebase` and say so
