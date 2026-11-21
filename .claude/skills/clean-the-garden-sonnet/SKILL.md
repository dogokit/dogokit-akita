---
name: clean-the-garden-sonnet
description: Garden a codebase. Run a whole-repo review round that finds and fixes small rot (dead or unused code, stale comments and docs, unused styles and settings, dead links, drift, look-alike copies of a pattern), then encode a rule (design, check, or nearby note) so the rot stops coming back. Use when the user asks to clean up, weed, garden, tidy, or de-rot a repo, wants a dead-code or stale-docs sweep, or says agent-written code is piling up cruft. Not for new features, bug-hunting in a diff (use code review), or refactors with no rot.
---

# Clean the Garden (Sonnet 5.5 Version)

Based on Yihan Zhu's "Codebase Gardening". Core idea: agents copy whatever is in the code, so every leftover weed is something the next agent will reproduce. Keep the garden clean so agents always copy good code. Weeding alone is not enough; weeds return. So each round has two jobs: weed what exists, then plant rules so it cannot regrow.

## Principles
- Whatever is in the code gets copied: good choices, unmade choices, and broken patterns alike. Treat bad examples as hazards for future output.
- Most weeds are *new* (left by recent work), not old. Expect repeats round after round.
- Fix on the spot when you can. Don't just list problems.
- Fix as close to the code as possible, strongest first: design that removes the wrong choice > a check that runs on every change and can block it > a written rule next to the code. A fix that relies on someone remembering is the weakest.
- One-at-a-time weeding fixes only what a round finds; it neither prevents regrowth nor reaches unseen old weeds.

## Workflow

### 1. Scope and baseline
- Review the whole repo (or the area named), not just the latest diff. Read the agent-rules file (CLAUDE.md, AGENTS.md, etc.), `git log` for recent churn, and prior gardening notes if any.
- Run the existing checks (typecheck, lint, tests, build) to get a baseline. Note whether any checks only warn and never block.
- Work on a branch or clean tree; keep changes reviewable (human approves what lands). Do not commit unless asked.

### 2. Sweep for weeds
Look for these kinds, using search plus reading, not guesses:
1. Unused code (the most common new weed): unreferenced functions, exports, files, dependencies, feature flags, settings nothing reads, styles for removed elements, compat shims for browsers/versions no longer supported. Verify with grep and the type checker/lint before deleting.
2. Comments: stale, now-false, restating the code, or explaining a workaround in a way that makes it "look intentional". Comments grow faster than code and rot silently. Check each against what the code does now.
3. Docs and write-ups: README/docs/config references that disagree with code; notes on fixes that describe old state.
4. Copies and look-alikes: the same pattern, regex, constant, rule, or link handling duplicated by hand; near-identical copies that differ subtly (e.g. a look-alike character range that matches more than intended). Find every copy, not just the first.
5. Drift and inconsistency: places not following the shared helper/convention; hand-written instances of something that has a shared rule (hand-typed links, inline copies in content/posts); naming and structure that disagree.
6. Old weeds earlier rounds missed: when you find one instance, search for siblings.
7. Outside-the-code rot: dead links, moved URLs, outdated external references.

Classify each finding: *copy of existing pattern*, *new problem from recent work*, *old missed problem*, or *external*. This tells you where regrowth comes from.

### 3. Weed
- Fix the findings now, in small, separate, easily reviewed edits grouped by kind.
- Delete rather than comment out. Re-run checks after each group.
- Comments: keep one only when it guards against a real mistake; otherwise delete. Never shorten comments blindly; confirm the result still matches the code (a rewritten comment once said the opposite of its code).
- When removing one weed, search for the rest of its family in the same pass.
- Don't change behavior. If a "weed" might be live (dynamic use, public API, reflection, external consumers), leave it and list it as uncertain.

### 4. Plant rules (prevent regrowth)
For every recurring or high-copy-risk weed, pick the strongest feasible layer:
1. Design: move the rule into one shared helper/component/constant so the wrong choice cannot be made; migrate all uses (including hand-written ones).
2. Check: add or tighten a lint rule, type-check, boundary/import rule, or test that fails on the weed (e.g. a test that no other file defines its own copy of a shared constant; a lint error that names the right fix). Make existing warn-only checks (unused code, hints) block the change.
3. Written rule next to the code: a short note beside the shared code or in the agent-rules file, placed where the next agent will read it before acting. Keep it rare and specific.
Prefer encoding rules as numeric/explicit forms where look-alikes could slip in. Don't add a rule you can't justify by a weed you actually saw.

### 5. Report
Output a short round summary:
- Counts and list of what was fixed, by kind and by origin (copy / new / old / external).
- Rules planted, with the layer used (design / check / note).
- Left for human or next round: things no check can read yet (unused styles, stale-comment truth, anything uncertain). Be honest that comment accuracy still needs human review.
- Any check that still only warns, or gaps where a shared rule doesn't cover hand-written code.

## Cadence
Run as a recurring round (roughly weekly in agent-heavy repos), since weeds return. Each round should find fewer repeats of anything already encoded; a repeat of an encoded weed means the rule is too weak or doesn't cover that code. Strengthen it.

## Guardrails
- Small rot only: no features, no broad refactors, no style rewrites.
- Verify before deleting; run all checks after; never hide failures.
- Keep a human approving what lands; don't commit or push unless asked.
