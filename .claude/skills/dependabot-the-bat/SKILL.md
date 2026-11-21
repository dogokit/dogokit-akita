---
name: dependabot-the-bat
description: Clear the open Dependabot PRs of a repo in one pass. Lists them, groups the ones that conflict, sets each dependency to its latest published version, merges the Dependabot branches with merge commits so GitHub marks each PR merged, then checks CI and cleans up. Use when the user asks to merge, clear, or handle Dependabot PRs, or says they conflict or are outdated.
---

# Dependabot the Bat

Read [`human-friendly`](../human-friendly/SKILL.md) before writing any text a person will read. Keep package names, versions, PR numbers and SHAs exact.

Goal: one PR on `main` with the latest versions, and every Dependabot PR shows as `MERGED` on GitHub. Dependabot's own versions are often stale and conflict with each other, so do not merge them one by one at their old versions.

## Rules

1. Merge only when the user asks for it
2. Use a merge commit (`--merge`). Never squash or rebase. A merge commit keeps each Dependabot head as an ancestor of `main`, which is how GitHub marks the PR merged
3. Never bypass checks. No `--admin`, no `--auto`, no force push
4. "Latest" means the newest published version, not the version in the PR. Check it, do not assume it
5. Respect pins between packages. If one package pins another (for example `markdownlint-cli` pins `markdownlint`), take both from the same release line
6. Check `engines` before a bump. If the new version needs a newer Node or Bun than CI uses, say so
7. Stop and report on a breaking change, a failing check, or a PR that is not from Dependabot. Do not guess a fix
8. Never stash. Use a branch and commits

## Workflow

1. List the open Dependabot PRs: `gh pr list --author "app/dependabot" --state open --json number,title,headRefName,headRefOid,mergeable,mergeStateStatus`
2. Read each diff: `gh pr diff <n>`. Mark PRs that touch the same file or adjacent lines as one group
3. Find the latest version of each dependency:
   - npm: `npm view <pkg> version`, plus `npm view <pkg>@<ver> dependencies` and `engines`
   - GitHub Action: `gh api repos/<owner>/<repo>/releases/latest -q .tag_name`
4. Start from `main`: `git fetch origin`, then `git checkout -b chore/dependabot-latest origin/main`
5. Record each Dependabot head as a merge parent, keeping our tree. Use the `headRefOid` from step 1, because GitHub deletes the Dependabot branches on merge:
   `git merge -s ours --no-ff -m "Merge branch '<headRef>' (superseded by latest bumps)" <headRefOid>`
6. Set each dependency to its latest version in `package.json` and the workflow files. Then run `bun install` (or the repo's package manager) and the repo's check script from `package.json`
7. Commit with a Conventional Commits message that lists each bump, and end it with the Co-Authored-By line for the model. Push with `git push -u origin chore/dependabot-latest`
8. Open the PR with `gh pr create --base main`. Put the superseded PR numbers in the body
9. Wait for CI: `gh pr checks <n> --watch`. Stop if a check fails
10. Merge: `gh pr merge <n> --merge`
11. Verify each Dependabot PR: `gh pr view <n> --json state,mergedAt`. Each must be `MERGED`. If one is still `OPEN`, check it with `git merge-base --is-ancestor <headRefOid> origin/main` after `git fetch origin`, and report the result
12. Clean up: `git push origin --delete chore/dependabot-latest`, then `git branch -d chore/dependabot-latest` from a checkout that is not that branch. Update `main` with `git pull --ff-only`

## Edge cases

- A PR was closed without merge: report it, do not reopen it
- `main` is checked out in another worktree: `git branch -d` and `git checkout main` can fail there. The remote merge still counts, so verify on GitHub and tell the user
- A dependency has no release line that fits the pins: stop and ask
- The Dependabot PR is for a GitHub Action: use the latest release tag, not a branch

## Report

Say in a short list:

- The PR that merged, with its merge commit
- Each Dependabot PR and its state (`MERGED` or not)
- The versions now on `main`
- The checks result
- Anything left open, and why
