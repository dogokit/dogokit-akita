---
name: egm
description: Index of the Elephant-Goldfish Model (EGM) skills by Google. Lists each egm-* skill and when to use it, the core loop, and where the shared files live. Use when the user asks for EGM, an elephant or goldfish review, a design review with fresh eyes, a spec before building, or a docs-versus-code drift check, and you need to pick the right skill.
---

# EGM index

Elephant-Goldfish Model: the Elephant (the main agent with full project context) drafts the design. Goldfish reviewers (fresh subagents with no conversation history) review it. The human approves

This skill only points to the others. Read the chosen skill's `SKILL.md` and follow it. Stack note: [`stacks/egm.md`](../../../stacks/egm.md)

## Skills

| Need                                     | Skill                                           | Output                     |
| ---------------------------------------- | ----------------------------------------------- | -------------------------- |
| Test an idea before designing            | [`egm-brainstorm`](../../egm/skills/egm-brainstorm/SKILL.md)       | `concepts_brief.md`        |
| Turn a brief or notes into a design doc  | [`egm-draft`](../../egm/skills/egm-draft/SKILL.md)                 | `design_draft.md`          |
| Review a design doc with fresh reviewers | [`egm-review`](../../egm/skills/egm-review/SKILL.md)               | Review report              |
| Work through review findings             | [`egm-resolve`](../../egm/skills/egm-resolve/SKILL.md)             | Agreed changes             |
| Small fix, refactor or spec tweak        | [`egm-lite`](../../egm/skills/egm-lite/SKILL.md)                   | Short checklist and review |
| A chosen group of reviewers for one task | [`egm-review-loop`](../../egm/skills/egm-review-loop/SKILL.md)     | Review report              |
| Docs for an existing codebase            | [`egm-bootstrap`](../../egm/skills/egm-bootstrap/SKILL.md)         | Docs under `docs/designs/` |
| Docs have drifted from the code          | [`egm-drift-report`](../../egm/skills/egm-drift-report/SKILL.md)   | Drift report               |

Core loop: `egm-brainstorm` → `egm-draft` → `egm-review` → `egm-resolve` → human review on a PR → build

## Notes

- Shared personas, standards and guides live in [`.claude/egm/`](../../egm/README.md), with the upstream source, license and our changes
- A Goldfish review needs fresh subagents. With none available, stop and tell the user
- A review does not replace tests or human judgment
