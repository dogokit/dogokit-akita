# TODOS

Small follow-up tasks. We do not use an issue tracker yet, so this file is the list.

## Vite+ and package manager

- [ ] Instal vp CLI. tell in the start.md or any relevant starting references. this supersede bun, because it works with any runtime and package manager. switching between Bub, Node.js, Deno is easy.

- [ ] Change `bun run` to `vp run` in the check and fix commands
  - `AGENTS.md`
  - `README.md`
  - `.github/CONTRIBUTING.md`
  - `.github/copilot-instructions.md`
  - `.claude/settings.json` (the two hooks)
  - `.claude/skills/add/SKILL.md`
  - `.claude/skills/clean-code/SKILL.md`
  - `docs/guides/scripts.md`
- [ ] Change `bun run` to `vp run` in the infra commands
  - `docs/guides/database.md`
  - `docs/guides/environments.md`
  - `docs/guides/steps.md`
  - `docker-compose.ephemeral.yml` (comments)
- [ ] Fix the broken line in `.claude/skills/add/SKILL.md` near the `good-commit` link, where `report-` runs into `Commit with`
- [ ] Change `bun install` and `bunx` to their Vite+ equivalents in our own docs and config (check the `vp` command names first)
  - `docs/guides/start.md`
  - `docs/guides/steps.md`
  - `orca.yaml`
  - `.claude/skills/dependency-the-bat/SKILL.md`
  - `.claude/skills/add/SKILL.md` (the `bun install` line)
  - Skip the vendored packs under `.claude/` (`mattpocock`, `addyosmani`, `egm`, `pstack`) and `.claude/skills/migrate-to-oxc/SKILL.md`, since they are examples from other repos

## Decided

- Keep Bun as the default package manager. `packageManager: bun@1.4.5` in `package.json` and `bun.lock` stay as they are
- Anyone can use npm, pnpm or Yarn instead. Do not write docs or hooks that only work with Bun
