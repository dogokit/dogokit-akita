# AI Agent Skills

AI agent skills live primarily in [`.claude/skills`](.). For others, can just use symbolic links. Each one is a `SKILL.md` that the agent loads when the task fits, or when you type `/<skill-name>`.

## Plan and build

- [plan-the-lion](plan-the-lion/SKILL.md): plan issues at the right depth, from one issue to a full backlog, and refine old ones
- [implement-the-ant](implement-the-ant/SKILL.md): plan first, then land a small, review-ready change
- [investigate-the-cat](investigate-the-cat/SKILL.md): triage a bug report or question into a verdict, a cause, and next steps
- [db-the-bee](db-the-bee/SKILL.md): print safe, copy-paste SQL for a person to run
- [extract-the-meerkat](extract-the-meerkat/SKILL.md): extract someone else's stack or skills into this repo on a new branch and PR

## Review and release

- [commit-good](commit-good/SKILL.md): make atomic commits with Conventional Commits messages
- [release-the-kraken](release-the-kraken/SKILL.md): commit, push, and open a short, scannable PR
- [review-the-kangaroo](review-the-kangaroo/SKILL.md): deep-review a PR or a local diff, with checked findings
- [address-the-elephant](address-the-elephant/SKILL.md): fix PR review comments, red checks, and merge conflicts

## Design and explain

- [tdd-the-barramundi](tdd-the-barramundi/SKILL.md): write or simplify a Technical Design Document (TDD) in plain English
- [design-docs](design-docs/SKILL.md): rules for where design docs live and what they must contain
- [present-the-chicken](present-the-chicken/SKILL.md): turn documentation into a talk guide and a slide deck
- [draw-the-owl](draw-the-owl/SKILL.md): explain a topic with diagrams, code sketches, and small HTML pages
- [statechart-the-hart](statechart-the-hart/SKILL.md): draw states and moves as a Mermaid statechart

## Write

- [human-friendly](human-friendly/SKILL.md): rewrite text in simple, short words for people
- [technical-english](technical-english/SKILL.md): rewrite text so an agent or parser cannot misread it

## Maintain

- [clean-the-garden-opus](clean-the-garden-opus/SKILL.md), [clean-the-garden-sonnet](clean-the-garden-sonnet/SKILL.md), [clean-the-garden-haiku](clean-the-garden-haiku/SKILL.md): find and fix small rot across the repo, tuned for each model
