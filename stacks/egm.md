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

Skills: `egm-brainstorm`, `egm-draft`, `egm-review`, `egm-resolve`, `egm-lite`, `egm-review-loop`, `egm-bootstrap`, `egm-drift-report`. See the project skill [`egm`](../.claude/skills/egm/SKILL.md) for how we use them

Links:

- [Elephant-Goldfish Model](https://egm.dev)
- [GitHub](https://github.com/google/elephant-goldfish-model)
- [Getting started](https://github.com/google/elephant-goldfish-model/blob/main/docs/getting_started.md)
- [Announcement on the Google Open Source Blog](https://opensource.googleblog.com/2026/10/introducing-elephant-goldfish-model-plugin.html)
- [Elephants, Goldfish, and the New Golden Age of Software Engineering](https://medium.com/@drensin/elephants-goldfish-and-the-new-golden-age-of-software-engineering-c33641a48874): the essay by Dave Rensin behind the idea
