---
name: good-merge
description: Merge a GitHub pull request with a merge commit, then clean up. Checks that CI passes and the PR is mergeable, merges, moves any PRs stacked on it to main, deletes the merged branch locally and on origin, then pulls main and the affected branches. Use when the user asks to merge a PR, land it, or clean up after a merge.
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
7. Move stacked PRs to `main` before deleting the merged branch. GitHub closes a PR when its base branch is deleted
8. Pull only with fast-forward. Never merge, rebase or reset a branch to update it
9. Stay short

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
7. Find stacked PRs: `gh pr list --base <branch> --state open --json number,title,headRefName`. Keep the list for steps 10 and 12
8. Merge: `gh pr merge <n> --merge`
9. Confirm: `gh pr view <n> --json state,mergeCommit`
10. Move each stacked PR to `main`: `gh pr edit <m> --base main`. Check it with `gh pr view <m> --json baseRefName`
11. Switch and pull: `git checkout main`, then `git pull --ff-only`. This also fetches origin
    - In a worktree for the merged branch: do not check out `main` there. Move the session back to the main checkout, pull there, then `git worktree remove <path>` before step 13
    - Stacked branches in their own worktrees: pull inside each worktree in step 12
12. Pull each stacked branch that exists locally, if it is clean:
    - Checked out: `git checkout <head>`, then `git pull --ff-only`
    - Not checked out: `git fetch origin <head>:<head>`
    - Skip a branch with uncommitted changes, or one that cannot fast-forward. Report it
    - Then `git checkout main` again before step 13
13. Delete the merged branch: `git branch -d <branch>`, then `git push origin --delete <branch>`
14. Check: `git status -sb` shows a clean `main` that matches `origin/main`. `gh pr list --base <branch> --state open` is empty

## Report

Say in a few short lines:

- The PR number and the merge commit, and whether this run created the PR
- The branch deleted, local and remote
- Each stacked PR moved to `main`, with its number
- Each stacked branch pulled, or skipped and why
- That `main` is up to date

## Edge cases

- Review required or unresolved threads: tell the user, do not merge
- Uncommitted changes block the checkout: tell the user, do not stash or discard
- Remote branch already deleted by GitHub: skip the remote delete
- Branch not fully merged: keep it and tell the user
- Stacked PR already closed: report it, do not reopen it
- Stacked PR has conflicts with `main` after the move: report it, and point to [`address-the-elephant`](../address-the-elephant/SKILL.md). Do not fix it here
- Squash or rebase asked: use `--squash` or `--rebase` and say so. Stacked branches then need a fast-forward pull, which may fail. Report that
