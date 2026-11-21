---
name: pstack
description: Index of the pstack skills by Lauren Tan (poteto). Lists each pstack skill and when to use it, and where the shared files live. Use when the user asks for pstack or poteto-mode, or wants rigorous agent workflows (understand, design, build, verify, ship) and you need to pick the right skill.
---

# pstack index

pstack is a set of engineering skills with one idea: go deep first, then write less and better code. `poteto-mode` is the main entry. It reads the task, picks a playbook and calls the other skills

This skill only points to the others. Read the chosen skill's `SKILL.md` and follow it. pstack skills live in `.claude/pstack/skills/`, so they are not slash commands: read the file. Stack note: [`stacks/pstack.md`](../../../stacks/pstack.md)

## Start here

| Need                                  | Skill                                              |
| ------------------------------------- | -------------------------------------------------- |
| Any task that needs rigor             | [`poteto-mode`](../../pstack/skills/poteto-mode/SKILL.md)           |
| Pick a pstack model per role          | [`setup-pstack`](../../pstack/skills/setup-pstack/SKILL.md)         |
| Not sure which skill fits             | [`poteto-help`](../../pstack/skills/poteto-help/SKILL.md)           |

## Understand

- [`how`](../../pstack/skills/how/SKILL.md): walk through how code works before you change it
- [`why`](../../pstack/skills/why/SKILL.md): find the reason behind a decision
- [`teach`](../../pstack/skills/teach/SKILL.md): explain a body of work plainly
- [`recall`](../../pstack/skills/recall/SKILL.md): rebuild recent working context
- [`ketchup`](../../pstack/skills/ketchup/SKILL.md), [`ketchup-video`](../../pstack/skills/ketchup-video/SKILL.md): catch the user up on what changed
- [`in-your-own-words`](../../pstack/skills/in-your-own-words/SKILL.md), [`sharpen`](../../pstack/skills/sharpen/SKILL.md), [`bro`](../../pstack/skills/bro/SKILL.md): restate the goal, deepen a task, or drop the jargon

## Design

- [`architect`](../../pstack/skills/architect/SKILL.md): sketch types and modules before code
- [`arena`](../../pstack/skills/arena/SKILL.md), [`swarm`](../../pstack/skills/swarm/SKILL.md), [`interrogate`](../../pstack/skills/interrogate/SKILL.md): parallel candidates, fan-out workers, multi-model review
- [`figure-it-out`](../../pstack/skills/figure-it-out/SKILL.md): design a playbook for large or unattended work
- [`statechart`](../../pstack/skills/statechart/SKILL.md): check a TLA+ model and draw it as a statechart

## Build and clean

- [`tdd`](../../pstack/skills/tdd/SKILL.md), [`typescript-best-practices`](../../pstack/skills/typescript-best-practices/SKILL.md)
- [`unslop`](../../pstack/skills/unslop/SKILL.md), [`no-comments`](../../pstack/skills/no-comments/SKILL.md), [`technical-writing`](../../pstack/skills/technical-writing/SKILL.md)

## Verify and ship

- [`blast-radius`](../../pstack/skills/blast-radius/SKILL.md): find what a change could break elsewhere
- [`benchmark-checklist`](../../pstack/skills/benchmark-checklist/SKILL.md): vet a perf measurement
- [`create-verification-skill`](../../pstack/skills/create-verification-skill/SKILL.md), [`maintain-verification-skill`](../../pstack/skills/maintain-verification-skill/SKILL.md): drive the app like a user
- [`create-formal-verification-skill`](../../pstack/skills/create-formal-verification-skill/SKILL.md), [`maintain-formal-verification-skill`](../../pstack/skills/maintain-formal-verification-skill/SKILL.md): formal checks where tests rarely reach
- [`show-me-your-work`](../../pstack/skills/show-me-your-work/SKILL.md): keep a decision trail for long runs

## Improve the stack

- [`correct`](../../pstack/skills/correct/SKILL.md): make repeated agent mistakes impossible
- [`reflect`](../../pstack/skills/reflect/SKILL.md): turn learnings into skill edits
- [`automate-me`](../../pstack/skills/automate-me/SKILL.md): capture your style as a skill
- [`make-bot-ui`](../../pstack/skills/make-bot-ui/SKILL.md)

## Principles

24 short skills named `principle-*`, such as [`principle-fix-root-causes`](../../pstack/skills/principle-fix-root-causes/SKILL.md) and [`principle-prove-it-works`](../../pstack/skills/principle-prove-it-works/SKILL.md). Name one mid-task to steer the agent. The list is in [guide page 8](../../pstack/docs/guide/08-principles.md)

## Notes

- Shared agents, the guide and the Claude Code adapter live in [`.claude/pstack/`](../../pstack/README.md), with the upstream source, license and our changes
- Several skills start subagents and some spend real tokens. Run `setup-pstack` first to pick models and a budget
- Skill text says `/poteto-mode` or `pstack:<name>`. Read `.claude/pstack/skills/<name>/SKILL.md` for it
