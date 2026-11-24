# Agent Guide

This repo is docs only. Read the [README](README.md) first.

## Where things live

- `README.md`: overview and stack choices
- `stacks/`: one note per tool
- `docs/guides/`: how-to guides
- `docs/references/`: credits and inspirations
- `.claude/skills/`: agent skills, listed in its [README](.claude/skills/README.md)

## Before you finish

- Run `bun run check` (format, lint, Markdown lint)
- Keep changes small and in the right folder
- Do not add app code. The only code is `index.ts`

## Working rules

- Write short, plain sentences. Use the `human-friendly` skill for user-facing text
- Commits follow Conventional Commits (`good-commit` skill)
- For branches and PRs, follow [CONTRIBUTING](.github/CONTRIBUTING.md) and the `good-pr` skill
