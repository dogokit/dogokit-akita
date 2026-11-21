---
name: commit-good
description: Make good git commits. Each commit is atomic (one logical change that passes checks) and has a Conventional Commits message. Use when the user asks to commit, save work to git, split changes into commits, or clean up a mixed working tree. Pushes when asked, and keeps pushing on later commits in the same session.
---

# Commit good

Commits are atomic (one logical change, repo works after it) and follow [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0).

## Rules

1. One commit, one purpose, one type. If the message needs "and", split it.
2. Each commit passes the project checks. No WIP.
3. Keep tests, docs, and types with the change they cover.
4. Keep refactors, formatting, and renames in their own commits.
5. Stage by path or hunk. No `git add .` or `-A` on a mixed tree.
6. Never stage secrets (`.env`, keys, tokens).
7. Amend, rebase, or force only when the user asks.
8. Push only when the user asks, or when auto-push is on (see below). Never force-push.
9. Never use `--no-verify`. Fix the hook instead.
10. Stay short. No long bodies, no long reports.

## Auto-push

Auto-push is on after any of these in the session:

- The user asks to commit and push
- `release-the-kraken` has run

While it is on, every later commit request ends with a push to the current branch. Do not ask again. Work from `implement-the-ant` is the exception: it stays uncommitted for review until the user asks to commit or runs `release-the-kraken`

## Workflow

1. Inspect: `git status --short`, `git diff`, `git diff --cached`, `git log -5 --oneline`. Match the repo's style and scopes.
2. Plan: group changes by purpose, then show a one-line-per-commit list. Order refactors and fixes before features. If a big batch cannot split cleanly, make one commit.
3. Check: run the project checks (`package.json`, `CLAUDE.md`, CI). If one fails, stop and report. Do not commit.
4. Commit, one at a time: `git restore --staged .`, stage the paths or hunks, read `git diff --cached`, commit, then `git status --short`.
5. Report: `git log --oneline` for the new commits, check results, and anything left uncommitted. One or two lines.

## Message

```text
<type>[scope][!]: <description>

[optional body]

[optional footers]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Pick by purpose, not by file.

- Subject: imperative, lowercase, no period, 72 characters or less
- Body: only when the reason is not obvious, one to three lines on why, wrapped at 72
- Footers: `Refs: #123` or `Closes: #123`, then the attribution line from the session context, if any
- Breaking change: `!` after the type, or a `BREAKING CHANGE:` footer

Good:

```text
fix(parser): handle empty input

The parser read index 0 before checking length.
```

Bad: `update files`, `Fixed bug.`, `wip`, `feat: Add Login Page`, `feat: add login and fix header`

## Edge cases

- One file, two purposes: `git add -p`, or `e` to edit a hunk
- Already staged: check first, unstage what does not fit
- Untracked files: add, ignore, or leave out. Ask when unsure
- Generated files (lockfiles, snapshots): commit with the change that caused them
- No changes: say so, no empty commit
- Unclear intent: ask one short question
