---
name: create-private-skill
description: Create a private skill whose folder name starts with a double underscore (for example __my-skill). It only stays out of branches and PRs if git ignores `__*`, so the skill checks that rule first and suggests adding it when missing. Always writes it into the main checkout, never a linked worktree and never ~/.claude/skills. Use when the user asks for a private skill, a double-underscore skill, or a skill that must stay out of git.
---

# Create private skill

Write a private skill into the main checkout. Read [`human-friendly`](../human-friendly/SKILL.md) before writing the report

## Why the main checkout

- `__*` must be ignored by git, or the skill can be committed. Git reads that rule from the project `.gitignore`, the `info/exclude` file, or the user's global gitignore file. The skill needs no branch, worktree or PR when the rule is there
- Ignored files do not copy between worktrees. A skill made in a linked worktree is lost to every other worktree
- The user does not want private skills in global `~/.claude/skills`. They want them inside the repo
- So the one place is the main checkout, `.claude/skills/<__name>/SKILL.md`

## Rules

1. Name starts with `__`, then lowercase words joined by `-`, for example `__orchestrate-merge-prs`. The folder name and the `name:` in the frontmatter must match
2. Write only into the main checkout. Never into a linked worktree, never into `~/.claude/skills`, even when the session runs in a worktree
3. Do not create a branch, worktree, commit or PR for it
4. Do not write the skill until git ignores its path. If no `__*` rule applies, stop and suggest the fix (see below). Never write a skill that git would commit
5. Do not edit `.gitignore`, the global gitignore file, `.claude/skills/README.md` or any tracked file without the user's yes. A private skill is not listed anywhere tracked
6. Do not overwrite an existing skill. Look first, and ask if the name is taken
7. If the user asks to move a private skill, move the file (`mv`) and remove the old empty folder. Never leave a copy behind

## Steps

1. Find the main checkout. It is the first line of the worktree list:

   ```text
   git worktree list | head -1
   ```

   Its path is `<main>`. Do not guess the path
2. Check the name is free: `ls <main>/.claude/skills/<__name>`. Stop and ask if it exists
3. Check git ignores the path before writing anything. The path does not need to exist yet:

   ```text
   git -C <main> check-ignore -v .claude/skills/<__name>/SKILL.md
   ```

   - Output with a `__*` pattern: git ignores it. Note the source. It is the project `.gitignore` (tracked, shared with the team) or the global gitignore file (personal, every repo). Go on to step 4
   - No output: git does not ignore it. Go to [No ignore rule](#no-ignore-rule) and stop until the user answers
4. Write `<main>/.claude/skills/<__name>/SKILL.md` with the Write tool. Use this frontmatter:

   ```text
   ---
   name: <__name>
   description: <what it does, and when to use it. One or two sentences>
   ---
   ```

   Then a short body: rules, then numbered steps. Link to the repo skills it builds on, such as `good-merge` or `human-friendly`. Match the style of the other skills in `.claude/skills/`
5. Check again that it is ignored and nothing is dirty:

   ```text
   git -C <main> check-ignore -v .claude/skills/<__name>/SKILL.md
   git -C <main> status --short
   ```

   `check-ignore` must print the `__*` rule. `status` must stay clean. If either fails, stop and tell the user. Do not commit it
6. Report in a few lines: the full path, which file holds the ignore rule, and that only sessions in the main checkout can load it

## No ignore rule

Tell the user that `__*` is not ignored in this repo, and offer two places for the line `__*`:

- Global gitignore (recommended for a private skill): covers every repo on this Mac and needs no PR. Find the file with `git config --get core.excludesFile`. If none is set, offer to set one, for example `~/.gitignore_global`
- Project `.gitignore`: covers everyone who clones the repo, and the change goes through a branch and PR like any other change

Ask which one. Add the line only after the user picks one, then run step 3 again. Then write the skill
