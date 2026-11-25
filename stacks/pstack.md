# pstack

Open-source skill stack by Lauren Tan (poteto) for coding agents. The idea: if you want to go fast, go deep first. It helps you write less but better code, and run many agents in parallel with confidence

- `poteto-mode`: the main entry. It reads the task, picks a playbook and calls the other skills
- Skills for understanding code, designing changes, building, verifying and shipping
- 24 `principle-*` skills you can name mid-task to steer an agent
- Playbooks for bug fixes, features, refactors, perf work and overnight runs

Built for Cursor. Works in Claude Code through an adapter. MIT

Install in Claude Code:

```sh
/plugin marketplace add cursor/plugins
/plugin install pstack@cursor-plugins
```

Added as a Git submodule in [`.claude/pstack/`](../.claude/pstack), pinned to an upstream commit. We do not edit it. To change a skill, copy it into `.claude/skills/` and link back to the original here. Not slash commands: read the `SKILL.md` file. The skills are under `harness/pstack/claude-code/`, the generated Claude Code tree

## Skills index

Pick a skill here, then read its `SKILL.md`. These are not slash commands. `poteto-mode` is the main entry. It reads the task, picks a playbook and calls the other skills

### Start here

- [`poteto-mode`](../.claude/pstack/harness/pstack/claude-code/skills/poteto-mode/SKILL.md): the main entry for any task that needs rigor
- [`setup-pstack`](../.claude/pstack/harness/pstack/claude-code/skills/setup-pstack/SKILL.md): pick a model per role and a budget
- [`poteto-help`](../.claude/pstack/harness/pstack/claude-code/skills/poteto-help/SKILL.md): find the right skill when you are not sure

### Understand

- [`how`](../.claude/pstack/harness/pstack/claude-code/skills/how/SKILL.md): walk through how code works before you change it
- [`why`](../.claude/pstack/harness/pstack/claude-code/skills/why/SKILL.md): find the reason behind a decision
- [`teach`](../.claude/pstack/harness/pstack/claude-code/skills/teach/SKILL.md): explain a body of work plainly
- [`recall`](../.claude/pstack/harness/pstack/claude-code/skills/recall/SKILL.md): rebuild recent working context
- [`ketchup`](../.claude/pstack/harness/pstack/claude-code/skills/ketchup/SKILL.md), [`ketchup-video`](../.claude/pstack/harness/pstack/claude-code/skills/ketchup-video/SKILL.md): catch the user up on what changed
- [`in-your-own-words`](../.claude/pstack/harness/pstack/claude-code/skills/in-your-own-words/SKILL.md), [`sharpen`](../.claude/pstack/harness/pstack/claude-code/skills/sharpen/SKILL.md), [`bro`](../.claude/pstack/harness/pstack/claude-code/skills/bro/SKILL.md): restate the goal, deepen a task, or drop the jargon

### Design

- [`architect`](../.claude/pstack/harness/pstack/claude-code/skills/architect/SKILL.md): sketch types and modules before code
- [`arena`](../.claude/pstack/harness/pstack/claude-code/skills/arena/SKILL.md), [`swarm`](../.claude/pstack/harness/pstack/claude-code/skills/swarm/SKILL.md), [`interrogate`](../.claude/pstack/harness/pstack/claude-code/skills/interrogate/SKILL.md): parallel candidates, fan-out workers, multi-model review
- [`figure-it-out`](../.claude/pstack/harness/pstack/claude-code/skills/figure-it-out/SKILL.md): design a playbook for large or unattended work
- [`statechart`](../.claude/pstack/harness/pstack/claude-code/skills/statechart/SKILL.md): check a TLA+ model and draw it as a statechart

### Build and clean

- [`tdd`](../.claude/pstack/harness/pstack/claude-code/skills/tdd/SKILL.md), [`typescript-best-practices`](../.claude/pstack/harness/pstack/claude-code/skills/typescript-best-practices/SKILL.md)
- [`unslop`](../.claude/pstack/harness/pstack/claude-code/skills/unslop/SKILL.md), [`no-comments`](../.claude/pstack/harness/pstack/claude-code/skills/no-comments/SKILL.md), [`technical-writing`](../.claude/pstack/harness/pstack/claude-code/skills/technical-writing/SKILL.md)

### Verify and ship

- [`blast-radius`](../.claude/pstack/harness/pstack/claude-code/skills/blast-radius/SKILL.md): find what a change could break elsewhere
- [`benchmark-checklist`](../.claude/pstack/harness/pstack/claude-code/skills/benchmark-checklist/SKILL.md): vet a perf measurement
- [`create-verification-skill`](../.claude/pstack/harness/pstack/claude-code/skills/create-verification-skill/SKILL.md), [`maintain-verification-skill`](../.claude/pstack/harness/pstack/claude-code/skills/maintain-verification-skill/SKILL.md): drive the app like a user
- [`create-formal-verification-skill`](../.claude/pstack/harness/pstack/claude-code/skills/create-formal-verification-skill/SKILL.md), [`maintain-formal-verification-skill`](../.claude/pstack/harness/pstack/claude-code/skills/maintain-formal-verification-skill/SKILL.md): formal checks where tests rarely reach
- [`show-me-your-work`](../.claude/pstack/harness/pstack/claude-code/skills/show-me-your-work/SKILL.md): keep a decision trail for long runs

### Improve the stack

- [`correct`](../.claude/pstack/harness/pstack/claude-code/skills/correct/SKILL.md): make repeated agent mistakes impossible
- [`reflect`](../.claude/pstack/harness/pstack/claude-code/skills/reflect/SKILL.md): turn learnings into skill edits
- [`automate-me`](../.claude/pstack/harness/pstack/claude-code/skills/automate-me/SKILL.md): capture your style as a skill
- [`make-bot-ui`](../.claude/pstack/harness/pstack/claude-code/skills/make-bot-ui/SKILL.md)

### Principles

24 short skills named `principle-*`, such as [`principle-fix-root-causes`](../.claude/pstack/harness/pstack/claude-code/skills/principle-fix-root-causes/SKILL.md) and [`principle-prove-it-works`](../.claude/pstack/harness/pstack/claude-code/skills/principle-prove-it-works/SKILL.md). Name one mid-task to steer the agent. The list is in [guide page 8](../.claude/pstack/harness/pstack/claude-code/docs/guide/08-principles.md)

## Notes

- Several skills start subagents and some spend real tokens. Run `setup-pstack` first to pick models and a budget
- Skill text says `/poteto-mode` or `pstack:<name>`. Read the `SKILL.md` for it

## Source

- Upstream: <https://github.com/cursor/plugins>
- Pinned at commit `792440e8a560a4a3f63748cdee70491ecd412982` (plugin version 0.15.46)
- Copyright (c) 2026 Lauren Tan, licensed under MIT. The licence is in the submodule

## Update

```sh
git submodule update --remote .claude/pstack
```

Then commit the new pin. Dependabot also opens a PR for it

Links:

- [GitHub](https://github.com/cursor/plugins/tree/main/pstack)
- [Guide](https://github.com/cursor/plugins/tree/main/pstack/docs/guide)
- [Claude Code adapter](https://github.com/cursor/plugins/blob/main/pstack/docs/harness/claude-code.md)
