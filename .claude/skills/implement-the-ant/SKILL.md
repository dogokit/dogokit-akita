---
name: implement-the-ant
description: Implements a scoped fix or feature with a plan-first flow. Assesses the issue and branch state, reads the full issue thread, checks whether scope spans several deliverables, works on a dedicated branch, writes a plain-language plan with a Mermaid diagram and waits for approval, then lands a minimal, review-ready diff, rechecks docs and config, verifies, and hands off. Use when the user asks to implement a fix or feature, execute a plan, or land issue-based work. Not for issue-only planning or PR handoff.
---

# Implement the Ant

**Issue, branch, plan, then implement.**

Read [`human-friendly`](../human-friendly/SKILL.md) before chat handoffs and any issue text. Keep paths, symbols, commands and issue keys exact. Change only the wording you were asked to write.

## Related skills

| Situation                                   | Skill |
| ------------------------------------------- | ----- |
| Plan or refine issues before building       | [`plan-the-lion`](../plan-the-lion/SKILL.md) |
| Commit, push, open the PR                   | [`release-the-kraken`](../release-the-kraken/SKILL.md) |
| Fix review threads on an open PR            | [`address-the-elephant`](../address-the-elephant/SKILL.md) |
| One-off data fix the human runs as SQL      | [`db-the-bee`](../db-the-bee/SKILL.md) |
| Many states, retries or async steps (suggest only) | [`statechart-the-hart`](../statechart-the-hart/SKILL.md) |

## Workflow

```text
- [ ] Assess issue and branch state
- [ ] Route: code change, data-only fix, both, or no change
- [ ] Read the full issue thread (description, acceptance criteria, every comment)
- [ ] Scope check: split or keep one issue when it spans several deliverables
- [ ] Branch: create a dedicated branch if missing
- [ ] Plan first: plain-language issue, cause, solution and diagram, then wait for approval
- [ ] Orient and research
- [ ] Implement the minimal diff (review-ready patterns below)
- [ ] Self-pass and diff hygiene
- [ ] Queries and indexes, seed data, docs and config recheck
- [ ] Verify
- [ ] Hand off (no commit or push unless asked)
```

## 1. Assess state (always first)

Read-only checks:

```bash
git status --short
git branch --show-current
git log --oneline -5
```

- If the user named an issue, read it (`gh issue view <n> --comments`, or the tracker's CLI or MCP tool). Never invent an issue key
- If the repo requires an issue for every change and none exists, offer to create one (see `plan-the-lion`). Otherwise continue without one
- Pair every issue key with its title in chat, so the reader knows what it is

## 2. Route

| The fix needs…                                                    | Route |
| ----------------------------------------------------------------- | ----- |
| A change to code, config, migrations, jobs or an API contract     | Implement here |
| Only a one-off correction of existing rows, with no code path to fix | Data-only: hand to `db-the-bee`, stop here |
| Both (a bug that keeps making bad rows, plus the bad rows today)  | Fix the code here first, then the data, so it does not come back |
| Nothing (already fixed, duplicate, out of scope, or a question)   | Answer with evidence, and stop |

## 3. Read the whole thread

Read the description, acceptance criteria, and **every** comment before planning. Later comments often change scope or acceptance criteria. When a recent comment conflicts with the description, ask the user which one wins.

## 4. Scope check

When the work spans several deliverables (for example backend, web and mobile, or two repos), and the issue does not say how to cut it, ask once: **split** into linked issues, or **keep one** issue. Do not ask again in the same session. A backend-only change that adds a new type, enum value or field must also check the clients that validate it (for example a Zod schema in the web app), so they are not forgotten.

## 5. Branch

Never implement on the default branch or a release branch. Create a branch from the repo's integration base (usually `origin/main`, unless repo docs say otherwise): `<type>/<issue-key>-short-slug`, or `<type>/short-slug` without an issue.

## 6. Plan first (default)

Write the plan before editing code, and wait for the user's approval. Use plan mode when the tool has one. Skip only when the user says so in this message ("skip the plan", "just do it"). A small fix still gets a short plan.

| Section             | Answers                                                   | Length        |
| ------------------- | --------------------------------------------------------- | ------------- |
| **The issue**       | What is broken or missing, who feels it, why it matters   | 2–3 sentences |
| **Why it happens**  | The root cause, with `path:line` evidence                 | 2–4 sentences |
| **The fix**         | What changes, in plain words                              | 2–4 sentences |
| **Files**           | Each file and its action                                  | One line each |
| **Diagram**         | One Mermaid diagram of the changed flow                   | ~10 nodes     |
| **Checks**          | Tests to add or run, and what proves each acceptance criterion | Short list |
| **Out of scope**    | What this change does not do                              | Short list    |

Diagram rules: pick the type that fits (`flowchart TD`, `sequenceDiagram`, `stateDiagram-v2`, `erDiagram`, `classDiagram`), draw top to bottom, use real symbol names, and mark `(new)` or `(changed)` nodes. For a large rework, stack a small `Before` and `After`. Reuse this diagram in the PR.

## 7. Implement

1. **Orient.** Read the code paths the plan names, plus their callers and types. Read the canonical docs for the area in the same pass
2. **Minimal diff.** The smallest safe change. No drive-by refactors
3. **Self-pass.** Run the checklist below, then `git diff` and `git diff --check`
4. **Queries and indexes.** For each new or changed database query, name the index it uses (existing or new, created in the same change). Capture `EXPLAIN` output against realistic data when the table is large. Write "no new or changed queries" when that is true
5. **Seed data.** When tests or manual QA need data, add or extend the repo's seed scripts. Seeds are idempotent, deterministic, and hold no real secrets
6. **Docs and config.** When behaviour, a contract, a config value, or an env variable changes, update the doc that describes it (for example `.env.example`, `README.md`, or the TDD), or note the gap in the handoff
7. **Verify.** Run the smallest meaningful checks: focused tests and a type check of touched code. Say which acceptance criteria still need manual or post-deploy proof

## Review-ready patterns

### No slop

- No quick fix or workaround without saying so and getting the user's yes
- No `TODO` without an issue link
- Specific names for new functions, constants and files, not generic ones (`formatInvoiceDueDate`, not `formatDate2`)
- Comments say **why**, in one or two lines. Never restate the code

### Types

- Reuse and extend existing types (`Pick`, `Omit`, `NonNullable`, inferred schema types). Do not hand-copy a shape that already exists in the ORM, schema or API types
- Derive unions from `as const` objects, and keep them next to related types
- Validate at boundaries (request input, env, external API responses) with the repo's schema library

### Constants and order

- Group related constants in one `as const` object, not loose exports
- When adding to an existing list, map, enum or `switch`, **append**. Never reshuffle existing members

### Reuse

- Before writing a helper, search for one. Lift a helper copied from a sibling into a shared module, with a test
- Use framework enums or constants for HTTP status codes, not bare numbers

### Async work

- For each new async call, check how often it runs, whether runs can overlap, how it retries, and its fan-out
- No `await` inside a loop over a large list. Batch or use bounded concurrency
- No floating promises. Await, return, or handle each one

### Complexity and readability

- Keep functions small. Split a long function into a few helpers named for their phase, not into many one-line helpers
- No nested ternaries. No `== true` or `== false`
- Prefer `replaceAll` with a string over a global regex when no regex is needed. Use `includes` for membership
- Use `node:` imports for Node built-ins (`node:crypto`)

### Tests

- Every test has a real assertion
- When asserting on some calls of a mock, filter the calls and assert on the count and content

### Diff hygiene: no formatting churn

- Do not run formatters, `lint --fix`, or import sorters over whole existing files
- Before handoff, scan `git diff`. Revert every hunk that only changes whitespace, quotes, commas, import order, or line wrapping on code the change did not need to touch
- Formatting new files is fine

### Quick self-pass (before handoff)

- [ ] No unapproved shortcut or ticketless `TODO`
- [ ] Types reused, not copied. Boundaries validated
- [ ] Constants grouped. New members appended
- [ ] No copied helper. Shared helpers have tests
- [ ] Async calls checked for overlap, retry and fan-out
- [ ] Names are specific. Comments say why
- [ ] No complexity hotspot in the diff
- [ ] Each new query has its index named
- [ ] Seed data covers what tests and QA need, or the gap is noted
- [ ] Docs and env examples match the new behaviour
- [ ] `git diff` has no formatting-only hunks

## Hand off

Apply `human-friendly`. Lead with the next step. Open with the issue key and title (when there is one), then:

- What changed, file by file, in one line each
- Checks run, with real results. Never claim a check passed unless it ran
- What still needs manual or post-deploy proof
- Docs updated, or the gap
- Open questions

Do not commit, push, or open a PR unless the user asks. Use `release-the-kraken` for that. Never merge or enable auto-merge.

## Guardrails

- Never edit code before the plan is approved, unless the user said to skip the plan
- Never plan from the description alone when the issue has comments
- Never implement on the default branch
- Never mix unrelated local changes into the diff
- Never put real credentials, tokens or private URLs in code, seeds or docs. Use placeholders
- Never ship a new or changed env variable without updating its example or doc
- Evidence over guesses: cite `path:line`
- Keep local checks and post-deploy proof apart in the handoff
