# TODOS

Small follow-up tasks. We do not use an issue tracker yet, so this file is the list.

## Decided

- Keep Bun as the default package manager. `packageManager: bun@1.4.5` in `package.json` and `bun.lock` stay as they are
- Anyone can use npm, pnpm or Yarn instead. Do not write docs or hooks that only work with Bun
- Use `vp` commands (`vp run`, `vp install`, `vp add`, `vp dlx`) in our docs, hooks and config. Leave the vendored packs under `.claude/` and `.claude/skills/migrate-to-oxc/SKILL.md` as they are
