---
name: clean-the-garden-haiku
description: Garden a codebase by finding and fixing small rot (dead code, stale comments, unused styles, dead links, drift, inconsistent copies) in whole-repo review rounds, then encoding rules so the rot stops coming back. Use when the user asks to clean up, weed, garden, tidy, or de-rot a codebase or repo, asks for a rot or dead-code sweep, says agent-written code is piling up cruft, or wants stale docs and comments checked against the code. Not for new features, bug hunting in a diff (use code review), or refactors with no rot to remove.
---

# Clean the Garden (Haiku 5.5 Version)

Agents copy whatever is already in the code. A small problem, left alone, gets copied into new files, and agents write code faster than people can review it. So weeding is continuous work, not a one-off cleanup. Each round looks at the whole codebase, fixes what it finds, and then changes the rules so the same kind of rot is harder to create.

Follow this order. Do not skip to step 4 because it looks like the easiest fix.

## 1. Set the scope of the round

- Decide the scope: the whole repo by default, or one area the user names.
- Note the current commit, so every fix can be traced back to this round.
- Do not change behavior. Every change in this skill is a cleanup: removing unused code, correcting text, unifying a copy, or adding a check. If a fix would change what the code does for users, stop and ask.

## 2. Look for the four kinds of rot

Search the whole scope for each kind. Record every finding with its file and line before you fix anything.

1. Copies of an existing problem. A bad pattern has been copied into new places. Find every instance of the pattern, not just the first one. Example from the article: a Unicode character range copied into new pages, where one character looked like a Chinese character but was not, and the range also matched Korean.
2. New leftovers from recent agent work. Code that was added and then made unused, or code that was left behind by a change that replaced it. Check the most recently changed files first (`git log --since` and `git log -p` on recent commits).
3. Old problems that earlier rounds missed. Look at everything, not just recent changes. Expect this to be the largest group.
4. Problems from outside the code. Dead links, docs that name removed commands or flags, README steps that no longer run, and config examples that no longer match the config schema.

Within those four kinds, check these categories:

- Dead code. Unused functions, exports, components, files, branches, feature flags that are always on or always off, and dependencies nothing imports. Use the type checker and linter for unused symbols, then confirm each one with a search. Search for dynamic references (string names, reflection, routes, config files) before deleting.
- Unused styles. CSS, classes, and style tokens with no remaining users. Styles for removed features are a common case.
- Stale comments. Comments that describe code that has changed, or that say the opposite of what the code does. Comments also grow fast when agents write them, so measure this: if comment lines are growing much faster than code, that is a finding.
- Stale docs. README, docs, and examples that describe old behavior, old file paths, or old commands.
- Drift and inconsistency. The same thing done two different ways in two places (two regexes for the same rule, two copies of a constant, a hand-typed link where a shared helper exists, a setting that differs between files without a reason).
- Accidental settings. Defaults or options that were copied in and quietly change behavior, such as a privacy setting that leaked into new links.
- Dead links. Internal and external links that no longer resolve. Check internal links with a script. Check external links only when the user allows network access.

## 3. Fix small, and fix with a record

- Make one small change per finding, or group findings of the same kind in the same file. Keep each commit or change about one kind of rot.
- For each fix, write a short note: what was wrong, what changed, and why it was safe. The article keeps these notes with the change so later readers can see why it was made. Put them in the commit message, or in a changelog file if the repo has one.
- Before deleting code, search for references, including tests, docs, configs, and generated files. If you are not sure it is unused, leave it and report it.
- For stale comments: delete the comment if the code is clear without it. Rewrite it only if it explains a reason, such as a constraint or a past bug. Keep a comment only when it guards against a real mistake.
- Run the project's type checker, linter, and tests after each group of changes. A fix that breaks the build is not a fix.

## 4. Fix the rules, not only the instances

After the fixes, ask which change would have stopped each kind of rot before it happened. Use the first option that works, and only move down the list when the one above is not possible:

1. Design that removes the wrong choice. Move a repeated rule into one shared function, constant, or component. The article's example: an outbound-link setting moved into one shared piece of code, so a later change took one line. Agents copy the nearest code, so make the nearest code correct.
2. Automated checks that run on every change and can block it. Turn the type checker's and linter's warnings for unused code into errors. Add a test that fails when a file defines its own copy of a shared rule. Add a test with the look-alike character or edge case that caused the bug. The article notes that a type checker hint that only prints a warning let the bad change go in for three days.
3. Written rules placed next to the code they govern. Put the rule in the agent instruction file, such as `CLAUDE.md` or `AGENTS.md`, close to the area it covers. Example rule: keep a comment only when it guards against a real mistake. Only write rules you can also check later.

Report how many findings got a design fix, a check, or only a written rule. This tells the user how much of the rot is structurally prevented.

## 5. Leave a status for the next round

Write a short report, and include it in the final answer:

- Scope and commit reviewed.
- Findings by kind (copy, new leftover, old missed, outside the code) and by category.
- Fixes made, with the commit or change for each.
- Findings not fixed, and why (unsure if unused, behavior change needed, needs the owner's decision).
- Rules added or changed, and which checks now block the kind of rot found.
- Areas not covered by any check yet. Unused styles and stale comments are often in this group, so list them for the next round.

## Guardrails

- Do not commit or push unless the user asks. Leave changes in the working tree for review, unless the user has already asked for commits.
- Do not delete files, branches, or data the user has not clearly marked as rot. Report them instead.
- Do not change public APIs, schemas, or user-visible text as part of a cleanup. Report those as separate work.
- Keep changes small enough that a reviewer can read each one. If the round is too large, do the most common rot first and say what remains.
- Remember that cleaning up old examples is part of improving future output. Treat old, bad examples in the code as an active source of new bad code.
