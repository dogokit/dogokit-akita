# pstack shared files

The vendored [pstack](https://github.com/cursor/plugins/tree/main/pstack) by Lauren Tan (poteto), kept in its own folder so it stays apart from our skills in `.claude/skills/`. The folder layout matches upstream, so skill links to `../../docs/` work unchanged

- `skills/`: the 58 pstack skills, not auto-loaded. Start from the index below, or read `skills/<name>/SKILL.md`
- `agents/`: the `poteto-agent` and `comment-sicko` subagent files
- `docs/guide/`: the pstack guide, 10 short pages
- `docs/harness/claude-code.md`: maps Cursor names in the skills to Claude Code. Every pstack skill points to it
- `UPSTREAM_README.md`: the upstream README, unchanged
- `plugin.json`: upstream plugin manifest, kept for the version
- `LICENSE`: MIT License from upstream

## Skills index

Pick a skill here, then read its `SKILL.md`. These are not slash commands. `poteto-mode` is the main entry. It reads the task, picks a playbook and calls the other skills

### Start here

- [`poteto-mode`](skills/poteto-mode/SKILL.md): the main entry for any task that needs rigor
- [`setup-pstack`](skills/setup-pstack/SKILL.md): pick a model per role and a budget
- [`poteto-help`](skills/poteto-help/SKILL.md): find the right skill when you are not sure

### Understand

- [`how`](skills/how/SKILL.md): walk through how code works before you change it
- [`why`](skills/why/SKILL.md): find the reason behind a decision
- [`teach`](skills/teach/SKILL.md): explain a body of work plainly
- [`recall`](skills/recall/SKILL.md): rebuild recent working context
- [`ketchup`](skills/ketchup/SKILL.md), [`ketchup-video`](skills/ketchup-video/SKILL.md): catch the user up on what changed
- [`in-your-own-words`](skills/in-your-own-words/SKILL.md), [`sharpen`](skills/sharpen/SKILL.md), [`bro`](skills/bro/SKILL.md): restate the goal, deepen a task, or drop the jargon

### Design

- [`architect`](skills/architect/SKILL.md): sketch types and modules before code
- [`arena`](skills/arena/SKILL.md), [`swarm`](skills/swarm/SKILL.md), [`interrogate`](skills/interrogate/SKILL.md): parallel candidates, fan-out workers, multi-model review
- [`figure-it-out`](skills/figure-it-out/SKILL.md): design a playbook for large or unattended work
- [`statechart`](skills/statechart/SKILL.md): check a TLA+ model and draw it as a statechart

### Build and clean

- [`tdd`](skills/tdd/SKILL.md), [`typescript-best-practices`](skills/typescript-best-practices/SKILL.md)
- [`unslop`](skills/unslop/SKILL.md), [`no-comments`](skills/no-comments/SKILL.md), [`technical-writing`](skills/technical-writing/SKILL.md)

### Verify and ship

- [`blast-radius`](skills/blast-radius/SKILL.md): find what a change could break elsewhere
- [`benchmark-checklist`](skills/benchmark-checklist/SKILL.md): vet a perf measurement
- [`create-verification-skill`](skills/create-verification-skill/SKILL.md), [`maintain-verification-skill`](skills/maintain-verification-skill/SKILL.md): drive the app like a user
- [`create-formal-verification-skill`](skills/create-formal-verification-skill/SKILL.md), [`maintain-formal-verification-skill`](skills/maintain-formal-verification-skill/SKILL.md): formal checks where tests rarely reach
- [`show-me-your-work`](skills/show-me-your-work/SKILL.md): keep a decision trail for long runs

### Improve the stack

- [`correct`](skills/correct/SKILL.md): make repeated agent mistakes impossible
- [`reflect`](skills/reflect/SKILL.md): turn learnings into skill edits
- [`automate-me`](skills/automate-me/SKILL.md): capture your style as a skill
- [`make-bot-ui`](skills/make-bot-ui/SKILL.md)

### Principles

24 short skills named `principle-*`, such as [`principle-fix-root-causes`](skills/principle-fix-root-causes/SKILL.md) and [`principle-prove-it-works`](skills/principle-prove-it-works/SKILL.md). Name one mid-task to steer the agent. The list is in [guide page 8](docs/guide/08-principles.md)

Stack note: [`stacks/pstack.md`](../../stacks/pstack.md)

## Notes

- Several skills start subagents and some spend real tokens. Run `setup-pstack` first to pick models and a budget
- Skill text says `/poteto-mode` or `pstack:<name>`. Read `skills/<name>/SKILL.md` for it

## Source

- Upstream: <https://github.com/cursor/plugins/tree/main/pstack>
- Copied from the generated Claude Code tree `harness/pstack/claude-code`, at commit `792440e8a560a4a3f63748cdee70491ecd412982` (plugin version 0.15.46)
- Copyright (c) 2026 Lauren Tan, licensed under MIT

## Changes from upstream

- Dropped plugin packaging (`.claude-plugin`), `assets/`, `automations/` (Benny) and `skills/statechart/scripts/test/` (3.9 MB of test files)
- Skills live in `.claude/pstack/skills/`, so they are not slash commands. The one link to the upstream README now points at `UPSTREAM_README.md`. Nothing else in the skills is edited
- Text that says `/poteto-mode` or `pstack:<name>` means the skill at `skills/<name>/SKILL.md`. Read that file, since there is no slash command
- `agents/` are not registered as subagents here. To use `pstack:poteto-agent`, install the upstream plugin or copy the files to `.claude/agents/`
- The index is this README's skills section, not a skill. Everything else is unchanged

## Update

Copy `skills/`, `agents/` and `docs/` from the upstream `harness/pstack/claude-code` folder over the old ones, drop `skills/statechart/scripts/test/`, point the link to the upstream README in `skills/poteto-help/SKILL.md` at `UPSTREAM_README.md`, then update the commit in this file
