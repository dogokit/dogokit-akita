# EGM shared files

Shared files for the vendored [Elephant-Goldfish Model](https://github.com/google/elephant-goldfish-model) skills (`skills/egm-*` in this folder). Skill text refers to this folder as the EGM root

- `skills/`: the 8 `egm-*` skills (the `egm` index stays in `.claude/skills/egm/`)
- `agents/`: Goldfish reviewer personas
- `resources/`: execution instructions and document standards
- `docs/`: Claude Code, Codex and harness notes
- `LICENSE`: Apache License 2.0 from upstream

## Source

- Upstream: <https://github.com/google/elephant-goldfish-model>
- Copied from commit `8e2a5ed781b5704735ccbbf5abf524b6db847190` (plugin version 0.1.1)
- Copyright Google LLC, licensed under Apache 2.0. Not an officially supported Google product

## Changes from upstream

- Dropped plugin packaging, skill icons, `TEST.md`, `test_scenarios.yaml` and `agents/openai.yaml`
- In each `SKILL.md`, the Claude and Codex guide paths and the `docs/harnesses.md` link now point here, and one line names this folder as the EGM root
- The 8 working `egm-*` `SKILL.md` files are rewritten in plain, short English, using the `human-friendly` skill. Steps, gates, option labels, file names, JSON payloads and templates are kept. `egm` is our own index
- Everything else (`agents/`, `docs/`, `resources/`, `references/`) is unchanged

## Update

Do not copy upstream `SKILL.md` files over ours: they would undo the rewrite. Copy the unchanged files (`agents/`, `docs/`, `resources/`, `references/`) over the old ones. Diff each upstream `SKILL.md` against the commit below, port the changes by hand in the same plain style, then update the commit in this file
