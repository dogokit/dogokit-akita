# pstack

Open-source skill stack by Lauren Tan (poteto) for coding agents. The idea: if you want to go fast, go deep first. It helps you write less but better code, and run many agents in parallel with confidence

- `poteto-mode`: the main entry. It reads the task, picks a playbook and calls the other skills
- Skills for understanding code, designing changes, building, verifying and shipping
- 24 `principle-*` skills you can name mid-task to steer an agent
- Playbooks for bug fixes, features, refactors, perf work and overnight runs

Built for Cursor. Works in Claude Code through an adapter. MIT

Install in Claude Code:

```sh
/plugin marketplace add cursor/plugins
/plugin install pstack@cursor-plugins
```

Vendored in this repo as project skills in `.claude/skills/`, with the index at [`pstack`](../.claude/skills/pstack/SKILL.md) and shared files in [`.claude/pstack/`](../.claude/pstack/README.md)

Links:

- [GitHub](https://github.com/cursor/plugins/tree/main/pstack)
- [Guide](https://github.com/cursor/plugins/tree/main/pstack/docs/guide)
- [Claude Code adapter](https://github.com/cursor/plugins/blob/main/pstack/docs/harness/claude-code.md)
