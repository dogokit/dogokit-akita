# EGM shared files

Shared files for the vendored [Elephant-Goldfish Model](https://github.com/google/elephant-goldfish-model) skills (`.claude/skills/egm-*`). Skill text refers to this folder as the EGM root

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
- All other text is unchanged

## Update

Copy the new upstream files over the old ones, redo the path changes above, then update the commit in this file
