---
name: egm
description: Use the Elephant-Goldfish Model (EGM) plugin by Google to design and review a change with fresh-context reviewers. Picks the right EGM skill (brainstorm, draft, review, resolve, lite, drift report), checks the plugin is installed, and says where approved designs are saved. Use when the user asks for EGM, an elephant or goldfish review, a design review with fresh eyes, a spec before building, or a docs-versus-code drift check.
---

# EGM

Elephant-Goldfish Model: the Elephant (you, with full project context) drafts the design. Goldfish reviewers (fresh subagents with no conversation history) review it. The human approves. Read [`human-friendly`](../human-friendly/SKILL.md) before writing any summary

Stack note: [`stacks/egm.md`](../../../stacks/egm.md)

## Rules

- Never run a Goldfish review in the same context. If no fresh subagent can be created, stop and tell the user
- Never skip the human approval step. A review does not replace tests or human judgment
- Write drafts and review reports to files, then give the user the path. Do not paste them in chat
- Choose findings with the user. Do not apply every finding
- Do not build until the user approves the design
- For a small fix or refactor, use `egm-lite`. Do not force a full design doc

## 1. Check the plugin

Run `/plugin` or look for `egm:` skills. If missing, give the user these commands and stop:

```sh
claude plugin marketplace add google/elephant-goldfish-model
claude plugin install egm@egm
```

Then start a new session. In Claude Code, invoke skills with the `/egm:` prefix, for example `/egm:egm-review`

## 2. Pick the skill

| Need                                        | Skill                | Output                        |
| ------------------------------------------- | -------------------- | ----------------------------- |
| Test an idea before designing               | `egm-brainstorm`     | `concepts_brief.md`           |
| Turn a brief or notes into a design doc     | `egm-draft`          | `design_draft.md`             |
| Review a design doc with fresh reviewers    | `egm-review <path>`  | Review report                 |
| Work through review findings                | `egm-resolve`        | Agreed changes                |
| Small fix, refactor or spec tweak           | `egm-lite`           | Short checklist, exec, review |
| A chosen group of reviewers for one task    | `egm-review-loop`    | Review report                 |
| Docs for an existing codebase               | `egm-bootstrap`      | Docs under `docs/designs/`    |
| Docs have drifted from the code             | `egm-drift-report`   | Drift report                  |

Core loop: `egm-brainstorm` → `egm-draft` → `egm-review` → `egm-resolve` → human review on a PR → build

## 3. Save the design

- Save an approved design under `docs/designs/` and keep a `docs/designs/SITEMAP.md` index
- When the repo already has a design folder or the [`design-docs`](../design-docs/SKILL.md) skill, follow its folder and format instead
- Run `egm-drift-report docs/designs/` about once a week and let the human decide: fix the doc or the code

## 4. Hand off

Give the user a short report: what was designed or reviewed, the file paths, the findings that need a human decision, and the next step. Open a PR for the design with [`release-the-kraken`](../release-the-kraken/SKILL.md) when asked
