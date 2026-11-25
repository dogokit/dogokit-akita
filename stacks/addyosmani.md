# Addy Osmani agent-skills

Open-source engineering skills by Addy Osmani for coding agents. The idea: run the whole software lifecycle with an agent, the way a senior engineer would. Six stages: Define → Plan → Build → Verify → Review → Ship

- A command per stage: `spec`, `plan`, `build`, `test`, `review`, `ship`. `build auto` runs a whole plan after one approval
- Each skill has an anti-rationalization table: the excuses an agent makes to skip a step, and why not
- `doubt-driven-development`: a fresh-context reviewer doubts each big decision while you build
- 5 reviewer personas: code reviewer, test engineer, security, web performance, accessibility

Team-friendly and easy to port. Works in Claude Code, Cursor, Codex, Gemini CLI and more. MIT

Install in Claude Code:

```sh
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

Added as a Git submodule in [`.claude/addyosmani/`](../.claude/addyosmani), pinned to an upstream commit. We do not edit it. To change a skill, copy it into `.claude/skills/` and link back to the original here. Not slash commands: read the `SKILL.md` file

## Skills index

Pick a skill here, then read its `SKILL.md`. These are not slash commands. Not sure which one fits? Read [`using-agent-skills`](../.claude/addyosmani/skills/using-agent-skills/SKILL.md), the meta skill

### Define: what to build

- [`interview-me`](../.claude/addyosmani/skills/interview-me/SKILL.md): one question at a time until the real goal is clear
- [`idea-refine`](../.claude/addyosmani/skills/idea-refine/SKILL.md): turn a vague idea into a sharp one
- [`spec-driven-development`](../.claude/addyosmani/skills/spec-driven-development/SKILL.md): write a spec before code. Command: [`spec`](../.claude/addyosmani/.claude/commands/spec.md)
- [`constraint-driven-development`](../.claude/addyosmani/skills/constraint-driven-development/SKILL.md): write the quality bar to `CONSTRAINTS.md`. Command: [`constraints`](../.claude/addyosmani/.claude/commands/constraints.md)

### Plan: break it down

- [`planning-and-task-breakdown`](../.claude/addyosmani/skills/planning-and-task-breakdown/SKILL.md): small tasks with acceptance criteria. Command: [`plan`](../.claude/addyosmani/.claude/commands/plan.md)

### Build: write the code

- [`incremental-implementation`](../.claude/addyosmani/skills/incremental-implementation/SKILL.md): thin slices, each tested and committed. Command: [`build`](../.claude/addyosmani/.claude/commands/build.md), with `build auto` to run the whole plan after one approval
- [`test-driven-development`](../.claude/addyosmani/skills/test-driven-development/SKILL.md): red, green, refactor. Command: [`test`](../.claude/addyosmani/.claude/commands/test.md)
- [`doubt-driven-development`](../.claude/addyosmani/skills/doubt-driven-development/SKILL.md): a fresh-context reviewer doubts each big decision as you build
- [`source-driven-development`](../.claude/addyosmani/skills/source-driven-development/SKILL.md): check each choice against official docs
- [`context-engineering`](../.claude/addyosmani/skills/context-engineering/SKILL.md): give the agent the right context and rules
- [`frontend-ui-engineering`](../.claude/addyosmani/skills/frontend-ui-engineering/SKILL.md), [`api-and-interface-design`](../.claude/addyosmani/skills/api-and-interface-design/SKILL.md): UI and API design

### Verify: prove it works

- [`browser-testing-with-devtools`](../.claude/addyosmani/skills/browser-testing-with-devtools/SKILL.md): check the app in a real browser
- [`debugging-and-error-recovery`](../.claude/addyosmani/skills/debugging-and-error-recovery/SKILL.md): reproduce, localize, reduce, fix, guard

### Review: gates before merge

- [`code-review-and-quality`](../.claude/addyosmani/skills/code-review-and-quality/SKILL.md): five-axis review. Command: [`review`](../.claude/addyosmani/.claude/commands/review.md)
- [`code-simplification`](../.claude/addyosmani/skills/code-simplification/SKILL.md): simpler code, same behavior. Command: [`code-simplify`](../.claude/addyosmani/.claude/commands/code-simplify.md)
- [`security-and-hardening`](../.claude/addyosmani/skills/security-and-hardening/SKILL.md): OWASP checks, auth, secrets
- [`performance-optimization`](../.claude/addyosmani/skills/performance-optimization/SKILL.md): measure first, then fix. Command: [`webperf`](../.claude/addyosmani/.claude/commands/webperf.md)
- [`accessibility-engineering`](../.claude/addyosmani/skills/accessibility-engineering/SKILL.md): WCAG 2.2 AA audit and fixes. Command: [`a11y`](../.claude/addyosmani/.claude/commands/a11y.md)

### Ship: deploy with confidence

- [`shipping-and-launch`](../.claude/addyosmani/skills/shipping-and-launch/SKILL.md): pre-launch checklist and go or no-go. Command: [`ship`](../.claude/addyosmani/.claude/commands/ship.md)
- [`git-workflow-and-versioning`](../.claude/addyosmani/skills/git-workflow-and-versioning/SKILL.md), [`ci-cd-and-automation`](../.claude/addyosmani/skills/ci-cd-and-automation/SKILL.md): commits, branches and pipelines
- [`deprecation-and-migration`](../.claude/addyosmani/skills/deprecation-and-migration/SKILL.md), [`documentation-and-adrs`](../.claude/addyosmani/skills/documentation-and-adrs/SKILL.md), [`observability-and-instrumentation`](../.claude/addyosmani/skills/observability-and-instrumentation/SKILL.md): retire old code, record decisions, see production

## Notes

- Skill and command text says `agent-skills:<name>`. Read the `SKILL.md` for it
- `agents/` are not registered as subagents here. To use one, copy it to `.claude/agents/`, or install the upstream plugin
- Three skills ship helper scripts: `accessibility-engineering`, `constraint-driven-development` and `idea-refine`. Read a script before you run it
- Roll out slowly. Upstream's [adoption guide](../.claude/addyosmani/docs/adoption-guide.md) says to start with verification skills, not all 26 at once

## Source

- Upstream: <https://github.com/addyosmani/agent-skills>
- Pinned at commit `e997ac5b9a74eab332d5e9793bb38a38c8cfdd74` (plugin version 0.6.18)
- Copyright (c) 2025 Addy Osmani, licensed under MIT. The licence is in the submodule

## Update

```sh
git submodule update --remote .claude/addyosmani
```

Then commit the new pin. Dependabot also opens a PR for it

Links:

- [GitHub](https://github.com/addyosmani/agent-skills)
- [Website](https://skills.addy.ie)
- [Adoption guide](https://github.com/addyosmani/agent-skills/blob/main/docs/adoption-guide.md)
