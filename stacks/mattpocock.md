# Matt Pocock skills

Open-source agent skills by Matt Pocock for real engineering, not vibe coding. The idea: most failures come from you and the agent not agreeing on what to build, so put the effort up front

- `grill-with-docs` and `grill-me`: the agent interviews you before it writes anything
- A shared language: `GLOSSARY.md` for project terms and ADRs (decision records) for hard choices
- `to-spec`, `to-tickets` and `implement`: turn the talk into a spec, tickets, then code with `tdd`
- Small, composable skills you can edit. No framework that owns your process

Works with any model and many agents. MIT

Install in Claude Code:

```sh
claude plugin install mattpocock-skills@claude-plugins-official
```

Added as a Git submodule in [`.claude/mattpocock/`](../.claude/mattpocock), pinned to an upstream commit. We do not edit it. To change a skill, copy it into `.claude/skills/` and link back to the original here. Not slash commands: read the `SKILL.md` file

## Skills index

Pick a skill here, then read its `SKILL.md`. These are not slash commands. Not sure which one fits? Read [`ask-matt`](../.claude/mattpocock/skills/engineering/ask-matt/SKILL.md), the router over all of them

### Align before you build

- [`grill-with-docs`](../.claude/mattpocock/skills/engineering/grill-with-docs/SKILL.md): the agent interviews you about a plan, and writes the glossary and ADRs (decision records) as it goes. The best first skill in a repo
- [`grill-me`](../.claude/mattpocock/skills/productivity/grill-me/SKILL.md), [`grilling`](../.claude/mattpocock/skills/productivity/grilling/SKILL.md): the same interview with nothing saved, for work with no repo
- [`domain-modeling`](../.claude/mattpocock/skills/engineering/domain-modeling/SKILL.md): sharpen project terms in `GLOSSARY.md` and record hard choices as ADRs
- [`codebase-design`](../.claude/mattpocock/skills/engineering/codebase-design/SKILL.md): shared words for deep modules and seams
- [`prototype`](../.claude/mattpocock/skills/engineering/prototype/SKILL.md): throwaway code to answer one design question
- [`research`](../.claude/mattpocock/skills/engineering/research/SKILL.md): gather facts from primary sources into a Markdown file
- [`to-questionnaire`](../.claude/mattpocock/skills/productivity/to-questionnaire/SKILL.md): turn an open decision into questions for someone else

### Turn it into work

- [`to-spec`](../.claude/mattpocock/skills/engineering/to-spec/SKILL.md): turn the talk so far into a spec on the issue tracker
- [`to-tickets`](../.claude/mattpocock/skills/engineering/to-tickets/SKILL.md): split a spec into small tickets with blocking links
- [`wayfinder`](../.claude/mattpocock/skills/engineering/wayfinder/SKILL.md): map a huge, foggy effort as decision tickets, one at a time
- [`triage`](../.claude/mattpocock/skills/engineering/triage/SKILL.md): move incoming issues and PRs to agent-ready briefs
- [`setup-matt-pocock-skills`](../.claude/mattpocock/skills/engineering/setup-matt-pocock-skills/SKILL.md): set the issue tracker, labels and doc layout once per repo

### Build and close out

- [`implement`](../.claude/mattpocock/skills/engineering/implement/SKILL.md), [`implement-spec`](../.claude/mattpocock/skills/engineering/implement-spec/SKILL.md): build one ticket, or a whole spec with parallel subagents
- [`tdd`](../.claude/mattpocock/skills/engineering/tdd/SKILL.md): red, green, refactor, one slice at a time
- [`diagnosing-bugs`](../.claude/mattpocock/skills/engineering/diagnosing-bugs/SKILL.md): a loop for hard bugs and slow code
- [`code-review`](../.claude/mattpocock/skills/engineering/code-review/SKILL.md): review a diff for standards and for the spec
- [`pr`](../.claude/mattpocock/skills/engineering/pr/SKILL.md): write a PR body
- [`retro`](../.claude/mattpocock/skills/engineering/retro/SKILL.md): look back on a session and fix the agent setup
- [`improve-codebase-architecture`](../.claude/mattpocock/skills/engineering/improve-codebase-architecture/SKILL.md): find deepening chances in spare time
- [`wizard`](../.claude/mattpocock/skills/engineering/wizard/SKILL.md): a bash wizard for steps only a human can do

### Talk and hand off

- [`handoff`](../.claude/mattpocock/skills/productivity/handoff/SKILL.md): compact the session into a file for the next agent
- [`wait-what`](../.claude/mattpocock/skills/productivity/wait-what/SKILL.md): re-explain a message that did not land
- [`teach`](../.claude/mattpocock/skills/productivity/teach/SKILL.md): teach a new concept in this workspace
- [`writing-for-agents`](../.claude/mattpocock/skills/productivity/writing-for-agents/SKILL.md): write skills and `AGENTS.md`

Main flow: `grill-with-docs` → `to-spec` → `to-tickets` → `implement` with `tdd` → `code-review` → `pr` → `retro`

## Notes

- The submodule holds the whole upstream repo, including `in-progress/`, `misc/` and `deprecated/`. Use only the `engineering/` and `productivity/` skills
- Skill text says `/grill-me` or `/<name>`. Read the `SKILL.md` for it, since there is no slash command
- Some skills read setup from `setup-matt-pocock-skills`, such as the issue tracker. Without it, say where to put tickets and docs
- `wizard` and `diagnosing-bugs` ship a shell template. Read it before you run it
- `tdd` and `teach` also exist in [pstack](pstack.md). Pick the one that fits, both are fine

## Source

- Upstream: <https://github.com/mattpocock/skills>
- Pinned at commit `6f7f7831a625f040a8e06a0e7954826b87ce775a` (plugin version 1.3.2)
- Copyright (c) 2026 Matt Pocock, licensed under MIT. The licence is in the submodule

## Update

```sh
git submodule update --remote .claude/mattpocock
```

Then commit the new pin. Dependabot also opens a PR for it

Links:

- [GitHub](https://github.com/mattpocock/skills)
- [skills.sh](https://skills.sh/mattpocock/skills)
- [Newsletter](https://www.aihero.dev/s/skills-newsletter)
