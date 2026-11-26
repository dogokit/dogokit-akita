---
name: good-merge
description: Squash-merge a GitHub pull request into one commit, then clean up. Checks that CI passes and the PR is mergeable, merges, moves any PRs stacked on it to main, deletes the merged branch locally and on origin, then pulls main and the affected branches. Use when the user asks to merge a PR, land it, or clean up after a merge.
---

# Merge good

Squash-merge a PR so all its commits land in `main` as one commit, then tidy up. Read [`human-friendly`](../human-friendly/SKILL.md) before writing the report

## Rules

1. Merge only when the user asks
2. Create a PR when the branch has none. Never merge a branch that has no PR
3. Use a squash merge (`--squash`) so the PR lands as one commit, even when it has many commits. Use another method only when the user names it
4. The squash commit keeps the PR title and number, then the branch and every commit of the PR. Never leave GitHub's default `Merge pull request #n from ...` text
5. Never bypass checks. No `--admin`, no `--auto`, no force
6. Delete only a branch that is merged. Use `git branch -d`, never `-D`
7. Never delete `main` or the default branch
8. Move stacked PRs to `main` before deleting the merged branch. GitHub closes a PR when its base branch is deleted
9. Pull only with fast-forward. Never merge, rebase or reset a branch to update it
10. Stay short

## Workflow

1. Find the PR for the current branch: `gh pr view --json number,state,headRefName`
2. No PR (the command fails, or the branch is not pushed): create one
   - Push the branch first if it is not on origin: `git push -u origin <branch>`
   - Create it: `gh pr create --base main --head <branch> --title "<title>" --body-file <file>`
   - Title and body: follow [`good-pr`](../good-pr/SKILL.md). Write the body to a file in the scratchpad folder
   - Do not run `release-the-kraken`. Keep this to the one `gh pr create` call
3. If the PR is closed, stop and report. Do not reopen it
4. Check the PR: `gh pr view <n> --json state,mergeable,mergeStateStatus,isDraft,reviewDecision` and `gh pr checks <n> --watch` (wait for pending checks to finish)
5. Stop and report if the PR is draft, conflicting, or has a failing check. Do not merge
6. Check the repo allows the method: `gh repo view --json mergeCommitAllowed`
7. Find stacked PRs: `gh pr list --base <branch> --state open --json number,title,headRefName`. Keep the list for steps 11 and 13
8. Write the squash commit text:
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
9. Merge: `gh pr merge <n> --squash --subject "<subject>" --body-file <file>`
10. Confirm: `gh pr view <n> --json state,mergeCommit`. The commit subject must read `<title> (#<n>)`
11. Move each stacked PR to `main`: `gh pr edit <m> --base main`. Check it with `gh pr view <m> --json baseRefName`
12. Switch and pull: `git checkout main`, then `git pull --ff-only`. This also fetches origin
    - In a worktree for the merged branch: do not check out `main` there. Move the session back to the main checkout, pull there, then `git worktree remove <path>` before step 14
    - Stacked branches in their own worktrees: pull inside each worktree in step 13
13. Pull each stacked branch that exists locally, if it is clean:
    - Checked out: `git checkout <head>`, then `git pull --ff-only`
    - Not checked out: `git fetch origin <head>:<head>`
    - Skip a branch with uncommitted changes, or one that cannot fast-forward. Report it
    - Then `git checkout main` again before step 14
14. Delete the merged branch: `git branch -d <branch>`, then `git push origin --delete <branch>`
15. Check: `git status -sb` shows a clean `main` that matches `origin/main`. `gh pr list --base <branch> --state open` is empty

## Report

Say in a few short lines:

- The PR number, the squash commit subject, and whether this run created the PR
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
- PR body has no Description section: use the PR title as the one-line description
- Merge commit or rebase asked: use `--merge` or `--rebase` and say so. A merge commit keeps every PR commit in history, and a rebase may fail the fast-forward pull of stacked branches. Report that Stacked branches then need a fast-forward pull, which may fail. Report that
