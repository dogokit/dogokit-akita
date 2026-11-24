# EGM shared files

Shared files for the vendored [Elephant-Goldfish Model](https://github.com/google/elephant-goldfish-model) skills (`skills/egm-*` in this folder). Skill text refers to this folder as the EGM root

- `skills/`: the 8 `egm-*` skills, indexed below
- `agents/`: Goldfish reviewer personas
- `resources/`: execution instructions and document standards
- `docs/`: Claude Code, Codex and harness notes
- `LICENSE`: Apache License 2.0 from upstream

## Skills index

The Elephant (the main agent with full project context) drafts the design. Goldfish reviewers (fresh subagents with no conversation history) review it. The human approves

Read the chosen skill's `SKILL.md` and follow it

- [`egm-brainstorm`](skills/egm-brainstorm/SKILL.md): test an idea before designing. Writes `concepts_brief.md`
- [`egm-draft`](skills/egm-draft/SKILL.md): turn a brief or notes into a design doc. Writes `design_draft.md`
- [`egm-review`](skills/egm-review/SKILL.md): review a design doc with fresh reviewers. Gives a review report
- [`egm-resolve`](skills/egm-resolve/SKILL.md): work through review findings. Gives agreed changes
- [`egm-lite`](skills/egm-lite/SKILL.md): small fix, refactor or spec tweak. Gives a short checklist and review
- [`egm-review-loop`](skills/egm-review-loop/SKILL.md): a chosen group of reviewers for one task. Gives a review report
- [`egm-bootstrap`](skills/egm-bootstrap/SKILL.md): docs for an existing codebase. Writes docs under `docs/designs/`
- [`egm-drift-report`](skills/egm-drift-report/SKILL.md): docs have drifted from the code. Gives a drift report

Core loop: `egm-brainstorm` → `egm-draft` → `egm-review` → `egm-resolve` → human review on a PR → build

Stack note: [`stacks/egm.md`](../../stacks/egm.md)

## Notes

- A Goldfish review needs fresh subagents. With none available, stop and tell the user
- A review does not replace tests or human judgment

## Source

- Upstream: <https://github.com/google/elephant-goldfish-model>
- Copied from commit `8e2a5ed781b5704735ccbbf5abf524b6db847190` (plugin version 0.1.1)
- Copyright Google LLC, licensed under Apache 2.0. Not an officially supported Google product

## Changes from upstream

- Dropped plugin packaging, skill icons, `TEST.md`, `test_scenarios.yaml` and `agents/openai.yaml`
- In each `SKILL.md`, the Claude and Codex guide paths and the `docs/harnesses.md` link now point here, and one line names this folder as the EGM root
- The 8 working `egm-*` `SKILL.md` files are rewritten in plain, short English, using the `human-friendly` skill. Steps, gates, option labels, file names, JSON payloads and templates are kept. The `egm` index is this README's skills list, not a skill
- Everything else (`agents/`, `docs/`, `resources/`, `references/`) is unchanged

## Update

Do not copy upstream `SKILL.md` files over ours: they would undo the rewrite. Copy the unchanged files (`agents/`, `docs/`, `resources/`, `references/`) over the old ones. Diff each upstream `SKILL.md` against the commit below, port the changes by hand in the same plain style, then update the commit in this file
</content>
