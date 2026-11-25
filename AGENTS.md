# Agent Guide

This repo is docs only. Read the [README](README.md) first.

## Where things live

- `README.md`: overview and stack choices
- `stacks/`: one note per tool
- `docs/guides/`: how-to guides
- `docs/references/`: credits and inspirations
- `graphify-out/`: local knowledge graph, git-ignored. Build it once per worktree, see [Graphify](stacks/graphify.md)
- `.claude/skills/`: agent skills, listed in its [README](.claude/skills/README.md)
- `.claude/<pack>/`: skill packs from other people (`mattpocock`, `addyosmani`, `egm`, `pstack`). All four are Git submodules, so run `git clone --recurse-submodules`. Notes for each pack live in `stacks/`

## Pick a workflow

No single workflow rules this repo. Our own skills in `.claude/skills/` come first. The vendored packs are a toolbox: take one skill from a pack when it fits, and mix packs freely

Match the effort to the stakes:

- Small tweak: just do it, then check it
- Small feature: a short interview to agree on the goal, then test-first
- Big or fuzzy feature: a spec, a plan in phases, and a check after each phase
- Production, security, or anything you cannot undo: a full review and a fresh-eyes doubt check

Rules:

- Do not run a whole pack on every task. More skills is not a smarter agent
- Do not copy a pack's rules into this file. Link to the pack instead
- When an agent repeats a mistake, fix our own skill or this file, not the vendored copy

## Before you finish

- Run `bun run check` (format, lint, Markdown lint)
- Keep changes small and in the right folder
- Do not add app code. The only code is `index.ts`

## Working rules

- Write short, plain sentences. Use the `human-friendly` skill for user-facing text
- Commits follow Conventional Commits (`good-commit` skill)
- For branches and PRs, follow [CONTRIBUTING](.github/CONTRIBUTING.md) and the `good-pr` skill
