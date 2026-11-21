# pstack shared files

The vendored [pstack](https://github.com/cursor/plugins/tree/main/pstack) by Lauren Tan (poteto), kept in its own folder so it stays apart from our skills in `.claude/skills/`. The folder layout matches upstream, so skill links to `../../docs/` work unchanged

- `skills/`: the 58 pstack skills, not auto-loaded. Start from the index skill [`pstack`](../skills/pstack/SKILL.md), or tell the agent to read `.claude/pstack/skills/<name>/SKILL.md`

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
- Skills live in `.claude/pstack/skills/`, so they are not slash commands. The one link to the upstream README now points at `UPSTREAM_README.md`. Nothing else in the skills is edited
- Text that says `/poteto-mode` or `pstack:<name>` means the skill at `skills/<name>/SKILL.md`. Read that file, since there is no slash command
- `agents/` are not registered as subagents here. To use `pstack:poteto-agent`, install the upstream plugin or copy the files to `.claude/agents/`
- `index` skill `pstack` is our own. Everything else is unchanged

## Update

Copy `skills/`, `agents/` and `docs/` from the upstream `harness/pstack/claude-code` folder over the old ones, drop `skills/statechart/scripts/test/`, point the link to the upstream README in `skills/poteto-help/SKILL.md` at `UPSTREAM_README.md`, then update the commit in this file
