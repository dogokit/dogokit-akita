# Elephant-Goldfish Model (EGM)

Open-source plugin by Google for designing and reviewing software with coding agents. Design with an elephant, review with a goldfish

- Elephant: the agent that holds your project context and drafts the specification
- Goldfish: reviewer subagents that start in a fresh context, read only the document and the code it names, and expose hidden assumptions
- You: resolve the trade-offs and approve the design before anything is built

Works in Claude Code, Codex and Antigravity. Apache 2.0. Not an officially supported Google product

Install in Claude Code:

```sh
claude plugin marketplace add google/elephant-goldfish-model
claude plugin install egm@egm
```

Skills: `egm-brainstorm`, `egm-draft`, `egm-review`, `egm-resolve`, `egm-lite`, `egm-review-loop`, `egm-bootstrap`, `egm-drift-report`. Added as a Git submodule in [`.claude/egm/`](../.claude/egm), pinned to an upstream commit. We do not edit it. To change a skill, copy it into `.claude/skills/` and link back to the original here. Not slash commands: read the `SKILL.md` file.

## Skills index

The Elephant (the main agent with full project context) drafts the design. Goldfish reviewers (fresh subagents with no conversation history) review it. The human approves

Read the chosen skill's `SKILL.md` and follow it

- [`egm-brainstorm`](../.claude/egm/skills/egm-brainstorm/SKILL.md): test an idea before designing. Writes `concepts_brief.md`
- [`egm-draft`](../.claude/egm/skills/egm-draft/SKILL.md): turn a brief or notes into a design doc. Writes `design_draft.md`
- [`egm-review`](../.claude/egm/skills/egm-review/SKILL.md): review a design doc with fresh reviewers. Gives a review report
- [`egm-resolve`](../.claude/egm/skills/egm-resolve/SKILL.md): work through review findings. Gives agreed changes
- [`egm-lite`](../.claude/egm/skills/egm-lite/SKILL.md): small fix, refactor or spec tweak. Gives a short checklist and review
- [`egm-review-loop`](../.claude/egm/skills/egm-review-loop/SKILL.md): a chosen group of reviewers for one task. Gives a review report
- [`egm-bootstrap`](../.claude/egm/skills/egm-bootstrap/SKILL.md): docs for an existing codebase. Writes docs under `docs/designs/`
- [`egm-drift-report`](../.claude/egm/skills/egm-drift-report/SKILL.md): docs have drifted from the code. Gives a drift report

Core loop: `egm-brainstorm` → `egm-draft` → `egm-review` → `egm-resolve` → human review on a PR → build

## Notes

- A Goldfish review needs fresh subagents. With none available, stop and tell the user
- A review does not replace tests or human judgment

## Source

- Upstream: <https://github.com/google/elephant-goldfish-model>
- Pinned at commit `8e2a5ed781b5704735ccbbf5abf524b6db847190` (plugin version 0.1.1)
- Copyright Google LLC, licensed under Apache 2.0. Not an officially supported Google product. The licence is in the submodule

## Update

```sh
git submodule update --remote .claude/egm
```

Then commit the new pin. Dependabot also opens a PR for it

Links:

- [Elephant-Goldfish Model](https://egm.dev)
- [GitHub](https://github.com/google/elephant-goldfish-model)
- [Getting started](https://github.com/google/elephant-goldfish-model/blob/main/docs/getting_started.md)
- [Announcement on the Google Open Source Blog](https://opensource.googleblog.com/2026/10/introducing-elephant-goldfish-model-plugin.html)
- [Elephants, Goldfish, and the New Golden Age of Software Engineering](https://medium.com/@drensin/elephants-goldfish-and-the-new-golden-age-of-software-engineering-c33641a48874): the essay by Dave Rensin behind the idea
