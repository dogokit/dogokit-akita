---
name: create-private-skill
description: Create a private skill whose folder name starts with a double underscore (for example __my-skill). The user's global gitignore ignores `__*`, so the skill never lands in a branch or PR. Always writes it into the main checkout, never a linked worktree and never ~/.claude/skills. Use when the user asks for a private skill, a double-underscore skill, or a skill that must stay out of git.
---

# Create private skill

Write a private skill into the main checkout. Read [`human-friendly`](../human-friendly/SKILL.md) before writing the report

## Why the main checkout

- `__*` is ignored by the user's global gitignore, so the skill is never committed and needs no branch, worktree or PR
- Ignored files do not copy between worktrees. A skill made in a linked worktree is lost to every other worktree
- The user does not want private skills in global `~/.claude/skills`. They want them inside the repo
- So the one place is the main checkout, `.claude/skills/<__name>/SKILL.md`

## Rules

1. Name starts with `__`, then lowercase words joined by `-`, for example `__orchestrate-merge-prs`. The folder name and the `name:` in the frontmatter must match
2. Write only into the main checkout. Never into a linked worktree, never into `~/.claude/skills`, even when the session runs in a worktree
3. Do not create a branch, worktree, commit or PR for it
4. Do not edit `.gitignore`, `.claude/skills/README.md` or any tracked file. A private skill is not listed anywhere tracked
5. Do not overwrite an existing skill. Look first, and ask if the name is taken
6. If the user asks to move a private skill, move the file (`mv`) and remove the old empty folder. Never leave a copy behind

## Steps

1. Find the main checkout. It is the first line of the worktree list:

   ```text
   git worktree list | head -1
   ```

   Its path is `<main>`. Do not guess the path
2. Check the name is free: `ls <main>/.claude/skills/<__name>`. Stop and ask if it exists
3. Write `<main>/.claude/skills/<__name>/SKILL.md` with the Write tool. Use this frontmatter:

   ```text
   ---
   name: <__name>
   description: <what it does, and when to use it. One or two sentences>
   ---
   ```

   Then a short body: rules, then numbered steps. Link to the repo skills it builds on, such as `good-merge` or `human-friendly`. Match the style of the other skills in `.claude/skills/`
4. Check it is ignored and nothing is dirty:

   ```text
   git -C <main> check-ignore -v .claude/skills/<__name>/SKILL.md
   git -C <main> status --short
   ```

   `check-ignore` must print the `__*` rule. `status` must stay clean. If the file is not ignored, stop and tell the user. Do not commit it
5. Report in a few lines: the full path, that it is ignored, and that only sessions in the main checkout can load it
