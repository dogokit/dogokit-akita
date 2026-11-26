# AI Agent Skills

AI agent skills live primarily in [`.claude/skills`](.). For others, can just use symbolic links. Each one is a `SKILL.md` that the agent loads when the task fits, or when you type `/<skill-name>`.

## Plan and build

- [plan-the-lion](plan-the-lion/SKILL.md): plan issues at the right depth, from one issue to a full backlog, and refine old ones
- [implement-the-ant](implement-the-ant/SKILL.md): plan first, then land a small, review-ready change
- [investigate-the-cat](investigate-the-cat/SKILL.md): triage a bug report or question into a verdict, a cause, and next steps
- [db-the-bee](db-the-bee/SKILL.md): print safe, copy-paste SQL for a person to run
- [extract-the-meerkat](extract-the-meerkat/SKILL.md): extract someone else's stack or skills into this repo on a new branch and PR
- [add](add/SKILL.md): add a stack note, guide or reference in a new worktree and PR, with a gate for the main README

## Review and release

- [good-commit](good-commit/SKILL.md): make atomic commits with Conventional Commits messages
- [good-pr](good-pr/SKILL.md): open or update a PR with a plain-English title and a short body
- [good-merge](good-merge/SKILL.md): merge a PR with a merge commit, move stacked PRs to main, then pull and clean up
- [release-the-kraken](release-the-kraken/SKILL.md): commit, push, and open a short, scannable PR
- [review-the-kangaroo](review-the-kangaroo/SKILL.md): deep-review a PR or a local diff, with checked findings
- [address-the-elephant](address-the-elephant/SKILL.md): fix PR review comments, red checks, and merge conflicts
- [dependabot-the-bat](dependabot-the-bat/SKILL.md): clear open Dependabot PRs onto the latest versions and merge them

## Design and explain

- [tdd-the-barramundi](tdd-the-barramundi/SKILL.md): write or simplify a Technical Design Document (TDD) in plain English
- [design-docs](design-docs/SKILL.md): rules for where design docs live and what they must contain
- [present-the-chicken](present-the-chicken/SKILL.md): turn documentation into a talk guide and a slide deck
- [draw-the-owl](draw-the-owl/SKILL.md): explain a topic with diagrams, code sketches, and small HTML pages
- [statechart-the-hart](statechart-the-hart/SKILL.md): draw states and moves as a Mermaid statechart

## Write

- [human-friendly](human-friendly/SKILL.md): rewrite text in simple, short words for people
- [technical-english](technical-english/SKILL.md): rewrite text so an agent or parser cannot misread it

## Vendored packs

Other people's skill packs, each a Git submodule in its own `.claude/<pack>/` folder. They are not slash commands: open the stack note for the pack, pick a skill, and read its `SKILL.md`. Use one when it fits the task, and mix them freely

| Pack | Best for | Start with |
| --- | --- | --- |
| [Matt Pocock](../../stacks/mattpocock.md) | Before take-off: agree on what to build, then spec and tickets | [grill-with-docs](../mattpocock/skills/engineering/grill-with-docs/SKILL.md) |
| [Addy Osmani](../../stacks/addyosmani.md) | The whole lifecycle, from spec to ship, with quality gates for a team | [using-agent-skills](../addyosmani/skills/using-agent-skills/SKILL.md) |
| [EGM](../../stacks/egm.md) | Design docs reviewed by fresh-context reviewers | [egm-brainstorm](../egm/skills/egm-brainstorm/SKILL.md) |
| [pstack](../../stacks/pstack.md) | After take-off: hard bugs, big migrations, long runs, proof that it works | [poteto-mode](../pstack/harness/pstack/claude-code/skills/poteto-mode/SKILL.md) |

## Maintain

- [clean-the-garden-opus](clean-the-garden-opus/SKILL.md), [clean-the-garden-sonnet](clean-the-garden-sonnet/SKILL.md), [clean-the-garden-haiku](clean-the-garden-haiku/SKILL.md): find and fix small rot across the repo, tuned for each model
