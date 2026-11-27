---
name: orchestrate-merge-prs
description: Plan, then merge, a batch of finished open PRs and clean up their worktrees and branches. Lists the open PRs, leaves out the ones the user holds back, decides if Orca workers are worth it (usually not for tiny docs PRs), merges in PR number order, then removes each merged worktree and branch. Use when the user asks to merge many finished PRs, clear the PR backlog, or clean up many PRs and worktrees.
---

# Orchestrate merge PRs

Merge a batch of finished PRs, one by one, then tidy up. Follow [`good-merge`](../good-merge/SKILL.md) in the repo for each merge, and [`human-friendly`](../human-friendly/SKILL.md) for the report

## Rules

1. Plan first. Show the plan and wait for the user to say "go". Change nothing before that
2. Ask which PRs to hold back. Never assume. Leave a held-back PR, its worktree and its branch untouched
3. Merge in PR number order, lowest first. Never in random order
4. One PR at a time. Never merge in parallel, because merges race on `main`
5. Never bypass checks. No `--admin`, no `--auto`, no force
6. Squash by default. Commit title is `<PR title> (#n)`
7. Delete only merged branches. Use `git branch -d`, never `-D`
8. Never delete `main`, and never touch the worktree the session runs in
9. If a PR fails a check, conflicts or is a draft, skip it, report it, and keep going with the rest

## Step 1: Survey (read-only)

```text
gh pr list --state open --limit 100 --json number,title,headRefName,isDraft,mergeable,mergeStateStatus,reviewDecision,baseRefName,statusCheckRollup
git worktree list
gh pr view <n> --json files --jq '[.files[].path]|join(", ")'
```

- Note which PRs share files. Shared files are the only likely conflicts
- Match each PR branch to its worktree. Worktrees often sit in `.claude/worktrees/`
- Flag a surprising file in a PR (for example `package.json` in a docs PR) and ask once. If the user already said it is fine, do not ask again

## Step 2: Decide on orchestration

Use the `orchestration` skill (Orca workers) only when the work is big enough to pay for it:

| Situation | Use workers? |
| --- | --- |
| Few PRs, tiny or docs-only, checks are fast | No. Run it yourself |
| Merges are serial by nature | No. Workers would race on `main` |
| Many PRs that each need a slow build, test or fix | Yes, for the check or fix step only. Merge stays serial and yours |
| A PR needs real conflict work or review feedback | Yes, one worker for that PR (or use `address-the-elephant`) |

Default is no workers. Say in the plan which way you chose and why

## Step 3: Plan

Show a short table, then the order, then the steps. Include:

- PRs to merge, in number order
- PRs held back
- Things to know (shared files, odd files, PRs that may fall out of date)
- Orchestration decision
- What gets removed afterwards (worktrees and branches)

Wait for "go"

## Step 4: Merge loop

For each PR, lowest number first:

1. Run the repo check in the PR's worktree (`bun run check` in this repo)
2. Recheck the PR right before merging: `gh pr view <n> --json state,mergeable,mergeStateStatus,isDraft`, and `gh pr checks <n>`. An earlier merge can make a later PR out of date
3. Merge with `good-merge` steps 7 to 10: write the commit text file in the scratchpad folder, then `gh pr merge <n> --squash --subject "<title> (#<n>)" --body-file <file>`
4. Confirm: `gh pr view <n> --json state,mergeCommit`
5. Clean up this PR now:
   - `git worktree remove <path>` (from the main checkout, not from inside the worktree)
   - `git branch -d <branch>`. With a squash merge git may say the branch is not fully merged. If `gh` shows the PR as MERGED and the remote has the copy, report it and use `-D` only after the user agrees
   - `git push origin --delete <branch>`, unless GitHub already deleted it
6. On a failure, skip the PR, note why, and go on

## Step 5: Finish

1. In the main checkout: `git checkout main` if needed, then `git pull --ff-only`
2. `git worktree prune`
3. Report per PR: merged or skipped, commit subject, what was removed. Name the held-back PRs and say they are untouched
