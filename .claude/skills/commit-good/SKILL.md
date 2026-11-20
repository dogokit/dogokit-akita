---
name: commit-good
description: Make good git commits. Each commit is atomic (one logical change that passes checks) and has a Conventional Commits message. Use when the user asks to commit, save work to git, split changes into commits, or clean up a mixed working tree. Never pushes.
---

# Commit good

Make commits that are atomic and conventional.

- **Atomic** means one commit holds one logical change. The repo works after each commit.
- **Conventional** means the message follows [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0).

Atomic sets the commit boundary. Conventional sets the message. Do both.

## Rules

1. One commit has one purpose. If the message needs "and", make two commits.
2. One commit has one type. Mixed types mean mixed purposes. Split them.
3. Each commit passes the project checks. Do not commit WIP, checkpoints, or broken states.
4. Keep tests, docs, and types with the change they cover. Do not put them in a later commit.
5. Keep refactors, formatting, and renames in their own commits. Do not mix them with behavior changes.
6. Never use `git add .` or `git add -A` when the tree has more than one purpose. Stage by path or by hunk.
7. Never stage secrets (`.env`, keys, tokens). Warn the user if they ask.
8. Never push. Never amend, rebase, or force a commit unless the user asks.
9. Never skip hooks (`--no-verify`). If a hook fails, fix the cause.

## Workflow

### 1. Inspect

Run these commands:

```sh
git status --short
git diff
git diff --cached
git log -5 --oneline
```

Read the full diff. Note files that are staged already. Match the style of recent commits.

### 2. Plan

Group the changes by purpose. Decide the commits before you stage anything.

Split when a diff has any of these:

- more than one type (`feat` and `fix`, or `refactor` and `feat`)
- more than one scope that do not depend on each other
- a format or rename change next to a logic change
- a hunk that does not help the stated purpose

Keep together when the parts cannot work alone. For example, an API change and its callers belong in one commit.

Order the commits so each one builds on the last. Put refactors and fixes first. Put the feature last.

If a very large batch cannot split cleanly, make one honest commit. Do not invent artificial splits.

Show the plan as a short list:

```text
1. refactor(auth): extract token parser     (src/auth/token.ts)
2. fix(auth): reject expired tokens         (src/auth/verify.ts, src/auth/verify.test.ts)
3. docs: add auth error table               (docs/auth.md)
```

### 3. Check

Run the project checks (test, lint, typecheck, build, markdown lint). Find them in `package.json`, `CLAUDE.md`, or the CI config.

- Run the checks that match the files you change.
- If a check fails, stop. Report the failure. Do not commit.
- If you split a tree, run the checks again on any commit that is not obviously safe.

### 4. Stage and commit, one commit at a time

For each planned commit:

1. Unstage everything: `git restore --staged .`
2. Stage only that commit. Use paths (`git add <path>`) or hunks (`git add -p`).
3. Read `git diff --cached`. Check that it matches the plan and nothing else.
4. Commit with the message (see below).
5. Run `git status --short` to see what remains.

Repeat until the tree is clean or only intended changes remain. Report any file you leave out and why.

### 5. Report

Show `git log --oneline` for the new commits. State the check results. State what you did not commit.

## Message format

```text
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

### Types

| Type       | Use for                                     |
| ---------- | ------------------------------------------- |
| `feat`     | New feature for the user (SemVer minor)     |
| `fix`      | Bug fix (SemVer patch)                      |
| `docs`     | Documentation only                          |
| `style`    | Format only. No logic change                |
| `refactor` | Code change that is not a fix or a feature  |
| `perf`     | Faster code                                 |
| `test`     | Add or fix tests                            |
| `build`    | Build system or dependencies                |
| `ci`       | CI config                                   |
| `chore`    | Other maintenance. No source or test change |
| `revert`   | Undo an earlier commit                      |

Pick the type that describes the **purpose**, not the file. A fix that also edits a test is still `fix`.

### Subject line

- Use the imperative mood: "add", "fix", "remove". Not "added" or "adds".
- Start in lowercase. Do not end with a period.
- Keep it to 72 characters or less. Aim for 50.
- Say what the change does. Do not say "update stuff" or "fix bug".
- Use a scope when it helps: a noun for a part of the code, such as `auth`, `api`, or `docs`. Copy the scopes that the repo history already uses.

### Body

Add a body when the reason is not obvious. Put one blank line after the subject.

- Explain **why**, not what. The diff shows what.
- Wrap lines at 72 characters.
- Keep each paragraph on one topic.

### Footers

- Put one blank line before the footers.
- Use `Refs: #123`, `Closes: #123`, or a Jira key such as `Refs: BUN-123`.
- Use `-` for spaces in footer tokens, for example `Reviewed-by`.
- End with the attribution line that the session context gives, if there is one. Follow `CLAUDE.md` and the user's own rules first.

### Breaking changes

Flag them in one of two ways, or both:

```text
feat(api)!: remove the v1 endpoints

BREAKING CHANGE: clients must call /v2. The /v1 routes return 404.
```

`BREAKING CHANGE` must be uppercase. A breaking change gets its own commit when possible.

## Examples

Good:

```text
fix(parser): handle empty input

The parser threw on "" because it read index 0 first.
Return an empty list instead.

Closes: #42
```

```text
docs: clarify docs-only repo scope
```

Bad:

| Message                                        | Problem                             |
| ---------------------------------------------- | ----------------------------------- |
| `update files`                                 | No type. No purpose.                |
| `feat: add login and fix header and bump deps` | Three purposes. Make three commits. |
| `Fixed bug.`                                   | No type. Past tense. Period. Vague. |
| `wip`                                          | Not atomic. Not conventional.       |
| `feat: Add Login Page`                         | Subject must start in lowercase.    |

## Edge cases

- **Mixed tree, one file with two purposes.** Use `git add -p` to split hunks. If a hunk is too large, use the `e` (edit) option.
- **Already-staged files.** Check them first. Unstage any that do not match the first planned commit.
- **Untracked files.** List them with `git ls-files --others --exclude-standard`. Decide for each: add to a commit, add to `.gitignore`, or leave out. Ask the user when unsure.
- **Generated files** (lockfiles, snapshots). Commit them with the change that caused them.
- **Fix to your own last commit.** If the user asks and the commit is not pushed, use `git commit --amend` or a fixup. Otherwise make a new commit.
- **No changes.** Say so. Do not make an empty commit.
- **Unclear intent.** Ask one short question. Do not guess a type or scope that you cannot support from the diff.

## Checklist

Before each commit, answer yes to all:

- [ ] The commit has one purpose and one type.
- [ ] The staged diff holds only that purpose.
- [ ] The checks pass for this state.
- [ ] No secret or generated junk is staged.
- [ ] The subject is imperative, lowercase, and 72 characters or less.
- [ ] A breaking change has `!` or a `BREAKING CHANGE:` footer.
