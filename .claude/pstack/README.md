# pstack shared files

Shared files for the vendored [pstack](https://github.com/cursor/plugins/tree/main/pstack) skills by Lauren Tan (poteto). The skills live in `.claude/skills/` next to ours. Skill text refers to `../../pstack/` for the files below

- `agents/`: the `poteto-agent` and `comment-sicko` subagent files
- `docs/guide/`: the pstack guide, 10 short pages
- `docs/harness/claude-code.md`: maps Cursor names in the skills to Claude Code. Every pstack skill points to it
- `UPSTREAM_README.md`: the upstream README, unchanged
- `plugin.json`: upstream plugin manifest, kept for the version
- `LICENSE`: MIT License from upstream

## Source

- Upstream: <https://github.com/cursor/plugins/tree/main/pstack>
- Copied from the generated Claude Code tree `harness/pstack/claude-code`, at commit `792440e8a560a4a3f63748cdee70491ecd412982` (plugin version 0.15.46)
- Copyright (c) 2026 Lauren Tan, licensed under MIT

## Changes from upstream

- Dropped plugin packaging (`.claude-plugin`), `assets/`, `automations/` (Benny) and `skills/statechart/scripts/test/` (3.9 MB of test files)
- Links to the Claude Code adapter, the guide and the README now use the paths in this repo. `UPSTREAM_README.md` keeps its upstream links, so its relative links are broken here. Nothing else in the skills is edited
- Skills run as bare names, so type `/poteto-mode`, not `/pstack:poteto-mode`. Text that says `pstack:<name>` still means the same skill
- `agents/` are not registered as subagents here. To use `pstack:poteto-agent`, install the upstream plugin or copy the files to `.claude/agents/`
- `index` skill `pstack` is our own. Everything else is unchanged

## Update

Copy `skills/*` over `.claude/skills/*` from the upstream `harness/pstack/claude-code` folder, copy `agents/` and `docs/` here, then rerun the link fix:

```sh
grep -rl '\.\./\.\./docs/' .claude/skills | xargs sed -i '' 's#\.\./\.\./docs/#../../pstack/docs/#g'
```

Then update the commit in this file
