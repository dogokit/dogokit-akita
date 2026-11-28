---
name: good-merge
description: Merge a GitHub pull request, squash by default, then clean up. Checks that the local branch has no uncommitted or unpushed work, that CI passes and the PR is mergeable, merges, moves any PRs stacked on it to main, deletes the merged branch locally and on origin, then pulls main and the affected branches. Use when the user asks to merge a PR, land it, or clean up after a merge.
---

# Merge good

Merge a PR into `main` with a squash by default, then tidy up. Read [`human-friendly`](../human-friendly/SKILL.md) before writing the report

## Rules

1. Merge only when the user asks
2. Create a PR when the branch has none. Never merge a branch that has no PR
3. Squash by default (`--squash`), so the PR lands as one commit even when it has many commits. Use `--merge` or `--rebase` when the user asks for it, or when the repo or the PR calls for it. Say which method was used
4. The commit keeps the PR title and number, then the branch and every commit of the PR. For a merge commit, never leave GitHub's default `Merge pull request #n from ...` text
5. Never bypass checks. No `--admin`, no `--auto`, no force
6. Delete only a branch that is merged. Use `git branch -d`, never `-D`
7. Never delete `main` or the default branch
8. Move stacked PRs to `main` before deleting the merged branch. GitHub closes a PR when its base branch is deleted
9. Pull only with fast-forward. Never merge, rebase or reset a branch to update it
10. Never stash, reset, clean or discard uncommitted work, and never force-remove a worktree. A merge never carries local changes, so stop when there are any
11. Stay short

## Workflow

1. Check local state in the current checkout: `git status --short` and `git status -sb`
   - Uncommitted changes (modified, staged or untracked files): stop and list the files. Do not create a PR, merge, or switch branches. Say the PR will not hold them. The user can commit them with [`good-commit`](../good-commit/SKILL.md), push, then ask again
   - Local commits not on origin (`ahead` in `git status -sb`): stop and report. The squash merge would miss them
   - A branch that is not pushed yet is fine. Step 3 pushes it
   - Clean: continue
2. Find the PR for the current branch: `gh pr view --json number,state,headRefName`
3. No PR (the command fails, or the branch is not pushed): create one
   - Push the branch first if it is not on origin: `git push -u origin <branch>`
   - Create it: `gh pr create --base main --head <branch> --title "<title>" --body-file <file>`
   - Title and body: follow [`good-pr`](../good-pr/SKILL.md). Write the body to a file in the scratchpad folder
   - Do not run `release-the-kraken`. Keep this to the one `gh pr create` call
4. If the PR is closed, stop and report. Do not reopen it
5. Check the PR: `gh pr view <n> --json state,mergeable,mergeStateStatus,isDraft,reviewDecision` and `gh pr checks <n> --watch` (wait for pending checks to finish)
6. Stop and report if the PR is draft, conflicting, or has a failing check. Do not merge
7. Check the repo allows the method: `gh repo view --json mergeCommitAllowed`
8. Find stacked PRs: `gh pr list --base <branch> --state open --json number,title,headRefName`. Keep the list for steps 12 and 14
9. Write the commit text:
   - Read the PR: `gh pr view <n> --json title,body,headRefName,commits`
   - Subject: `<title> (#<n>)`, using the PR title as it is on GitHub
   - Body, written to a file in the scratchpad folder:

     ```text
     <the one-sentence Description from the PR body, or the title if there is none>

     Branch: <headRefName>

     Commits:
     - <subject of each commit, oldest first>
     ```

   - The commit list has every commit in the PR, not only the newest one. Use the commit subjects as they are
10. Merge: `gh pr merge <n> --squash --subject "<subject>" --body-file <file>`. Swap `--squash` for `--merge` or `--rebase` only when rule 3 says so
11. Confirm: `gh pr view <n> --json state,mergeCommit`. The commit subject must read `<title> (#<n>)`
12. Move each stacked PR to `main`: `gh pr edit <m> --base main`. Check it with `gh pr view <m> --json baseRefName`
13. Switch and pull: `git checkout main`, then `git pull --ff-only`. This also fetches origin
    - Before switching, run `git status --short` in the main checkout. If it has uncommitted changes that the switch or pull would touch, stop and report. Do not stash
    - In a worktree for the merged branch: do not check out `main` there. Move the session back to the main checkout, pull there, then `git worktree remove <path>` before step 15. Git refuses to remove a worktree with uncommitted changes. If it refuses, report it and stop. Never add `--force`
    - Stacked branches in their own worktrees: pull inside each worktree in step 14
14. Pull each stacked branch that exists locally, if it is clean:
    - Checked out: `git status --short` first. If clean, `git checkout <head>`, then `git pull --ff-only`
    - Not checked out: `git fetch origin <head>:<head>`
    - Skip a branch with uncommitted changes, or one that cannot fast-forward. Leave its changes alone and report it
    - Then `git checkout main` again before step 15
15. Delete the merged branch: `git branch -d <branch>`, then `git push origin --delete <branch>`
16. Check: `git status -sb` shows a clean `main` that matches `origin/main`. `gh pr list --base <branch> --state open` is empty

## Report

Say in a few short lines:

- The PR number, the commit subject, the method used, and whether this run created the PR
- The local check in step 1: clean, or the files and commits that stopped it
- The branch deleted, local and remote
- Each stacked PR moved to `main`, with its number
- Each stacked branch pulled, or skipped and why, including any uncommitted files left alone
- That `main` is up to date, and whether it has uncommitted changes

## Edge cases

- Uncommitted changes in the merged branch (step 1): stop before any PR or merge work. Tell the user which files, and offer [`good-commit`](../good-commit/SKILL.md) then a push
- Local commits not on origin (step 1): stop, and tell the user to push first
- Review required or unresolved threads: tell the user, do not merge
- Uncommitted changes in the main checkout block the switch to `main`: tell the user, do not stash or discard
- Remote branch already deleted by GitHub: skip the remote delete
- Branch not fully merged: keep it and tell the user
- Stacked PR already closed: report it, do not reopen it
- Stacked PR has conflicts with `main` after the move: report it, and point to [`address-the-elephant`](../address-the-elephant/SKILL.md). Do not fix it here
- PR body has no Description section: use the PR title as the one-line description
- Merge commit or rebase asked: use `--merge` or `--rebase` and say so. A merge commit keeps every PR commit in history. A rebase may fail the fast-forward pull of stacked branches, so report that Stacked branches then need a fast-forward pull, which may fail. Report that
