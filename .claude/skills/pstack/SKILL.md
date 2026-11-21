---
name: pstack
description: Index of the pstack skills by Lauren Tan (poteto). Lists each pstack skill and when to use it, and where the shared files live. Use when the user asks for pstack or poteto-mode, or wants rigorous agent workflows (understand, design, build, verify, ship) and you need to pick the right skill.
---

# pstack index

pstack is a set of engineering skills with one idea: go deep first, then write less and better code. `poteto-mode` is the main entry. It reads the task, picks a playbook and calls the other skills

This skill only points to the others. Read the chosen skill's `SKILL.md` and follow it. Stack note: [`stacks/pstack.md`](../../../stacks/pstack.md)

## Start here

| Need                                  | Skill                                              |
| ------------------------------------- | -------------------------------------------------- |
| Any task that needs rigor             | [`poteto-mode`](../poteto-mode/SKILL.md)           |
| Pick a pstack model per role          | [`setup-pstack`](../setup-pstack/SKILL.md)         |
| Not sure which skill fits             | [`poteto-help`](../poteto-help/SKILL.md)           |

## Understand

- [`how`](../how/SKILL.md): walk through how code works before you change it
- [`why`](../why/SKILL.md): find the reason behind a decision
- [`teach`](../teach/SKILL.md): explain a body of work plainly
- [`recall`](../recall/SKILL.md): rebuild recent working context
- [`ketchup`](../ketchup/SKILL.md), [`ketchup-video`](../ketchup-video/SKILL.md): catch the user up on what changed
- [`in-your-own-words`](../in-your-own-words/SKILL.md), [`sharpen`](../sharpen/SKILL.md), [`bro`](../bro/SKILL.md): restate the goal, deepen a task, or drop the jargon

## Design

- [`architect`](../architect/SKILL.md): sketch types and modules before code
- [`arena`](../arena/SKILL.md), [`swarm`](../swarm/SKILL.md), [`interrogate`](../interrogate/SKILL.md): parallel candidates, fan-out workers, multi-model review
- [`figure-it-out`](../figure-it-out/SKILL.md): design a playbook for large or unattended work
- [`statechart`](../statechart/SKILL.md): check a TLA+ model and draw it as a statechart

## Build and clean

- [`tdd`](../tdd/SKILL.md), [`typescript-best-practices`](../typescript-best-practices/SKILL.md)
- [`unslop`](../unslop/SKILL.md), [`no-comments`](../no-comments/SKILL.md), [`technical-writing`](../technical-writing/SKILL.md)

## Verify and ship

- [`blast-radius`](../blast-radius/SKILL.md): find what a change could break elsewhere
- [`benchmark-checklist`](../benchmark-checklist/SKILL.md): vet a perf measurement
- [`create-verification-skill`](../create-verification-skill/SKILL.md), [`maintain-verification-skill`](../maintain-verification-skill/SKILL.md): drive the app like a user
- [`create-formal-verification-skill`](../create-formal-verification-skill/SKILL.md), [`maintain-formal-verification-skill`](../maintain-formal-verification-skill/SKILL.md): formal checks where tests rarely reach
- [`show-me-your-work`](../show-me-your-work/SKILL.md): keep a decision trail for long runs

## Improve the stack

- [`correct`](../correct/SKILL.md): make repeated agent mistakes impossible
- [`reflect`](../reflect/SKILL.md): turn learnings into skill edits
- [`automate-me`](../automate-me/SKILL.md): capture your style as a skill
- [`make-bot-ui`](../make-bot-ui/SKILL.md)

## Principles

24 short skills named `principle-*`, such as [`principle-fix-root-causes`](../principle-fix-root-causes/SKILL.md) and [`principle-prove-it-works`](../principle-prove-it-works/SKILL.md). Name one mid-task to steer the agent. The list is in [guide page 8](../../pstack/docs/guide/08-principles.md)

## Notes

- Shared agents, the guide and the Claude Code adapter live in [`.claude/pstack/`](../../pstack/README.md), with the upstream source, license and our changes
- Several skills start subagents and some spend real tokens. Run `setup-pstack` first to pick models and a budget
- Skills here run as bare names, so type `/poteto-mode`, not `/pstack:poteto-mode`
