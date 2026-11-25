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

Match the effort to the stakes. Find the row that fits the size, goal, and risk. If they point to different rows, pick the riskier one

| Workflow                             | Size                      | Goal                     | Risk                | Our skills                                                 | Pack skills                                                                                                                                                         | Check                                      |
| ------------------------------------ | ------------------------- | ------------------------ | ------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Small tweak                          | One file, a few lines     | Clear                    | Low, easy to undo   | `good-commit`, `human-friendly`                            | None                                                                                                                                                                | `bun run check`                            |
| Small feature                        | A few files, one PR       | Mostly clear             | Low to medium       | `implement-the-ant`, `good-pr`                             | Osmani `interview-me`, Pocock `tdd`                                                                                                                                 | Tests fail first, then pass                |
| Bug                                  | Unknown until found       | Symptom known, cause not | Depends on the area | `investigate-the-cat`                                      | Pocock `diagnosing-bugs`, Osmani `debugging-and-error-recovery`                                                                                                     | A test shows the bug, then passes          |
| Big or fuzzy feature                 | Many files or several PRs | Fuzzy                    | Medium              | `plan-the-lion`, `tdd-the-barramundi`, `implement-the-ant` | Pocock `grill-with-docs`, `to-spec`, `to-tickets`, Osmani `planning-and-task-breakdown`, `incremental-implementation`, EGM `egm-brainstorm`, pstack `figure-it-out` | A check after each phase                   |
| Production, security, or cannot undo | Any                       | Clear                    | High, hard to undo  | `review-the-kangaroo`, `db-the-bee`                        | Osmani `security-and-hardening`, `shipping-and-launch`, `doubt-driven-development`, pstack `blast-radius`, `principle-prove-it-works`                               | A full review and a fresh-eyes doubt check |

Each pack's skill paths are in its stack note in `stacks/` and in the [skills README](.claude/skills/README.md)

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
