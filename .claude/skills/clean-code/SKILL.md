---
name: clean-code
description: Pragmatic coding standards for writing and editing code. Concise, direct, no over-engineering, no unnecessary comments. Use when writing, changing, or reviewing code, or when the user asks for clean code. Not for prose (use human-friendly).
---

# Clean Code

Write working code in the least code that does the job. The user wants a working change, not a programming lesson.

## Core principles

| Principle | Rule |
| --- | --- |
| SRP | Each function or class does one thing |
| DRY | Extract repeated code once, then reuse it |
| KISS | Pick the simplest solution that works |
| YAGNI | Do not build what nobody asked for |
| Boy Scout | Leave touched code cleaner than you found it |

## Names

| Element | Convention |
| --- | --- |
| Variables | Reveal intent: `userCount`, not `n` |
| Functions | Verb plus noun: `getUserById()`, not `user()` |
| Booleans | Question form: `isActive`, `hasPermission`, `canEdit` |
| Constants | SCREAMING_SNAKE_CASE: `MAX_RETRY_COUNT` |

If a name needs a comment to explain it, rename it. Avoid abbreviations.

## Functions

| Rule | Limit |
| --- | --- |
| Size | Max 20 lines, ideally 5 to 10 |
| One thing | Does one job and does it well |
| One level | One level of abstraction per function |
| Arguments | Max 3, prefer 0 to 2 |
| Side effects | Do not mutate inputs unless that is the job |

## Structure

- Use guard clauses: return early for edge cases.
- Keep nesting to 2 levels or less.
- Compose small functions instead of writing one long one.
- Keep related code close to where it is used.

## Comments

- Delete comments that repeat what the code says.
- Comment only the why: a hidden constraint, a workaround, or a surprising result.

## Anti-patterns

| Don't | Do instead |
| --- | --- |
| Comment every line | Delete the obvious comments |
| Helper for a one-liner | Inline the code |
| Factory for two objects | Create them directly |
| `utils` file with one function | Put the code where it is used |
| Deep nesting | Use guard clauses |
| Magic numbers | Use named constants |
| God functions | Split by responsibility |
| "First we import..." narration | Just write the code |

## Before editing a file

Check these first:

| Question | Why |
| --- | --- |
| What imports this file? | Those callers may break |
| What does this file import? | Interface changes may ripple out |
| What tests cover it? | They may fail |
| Is it shared? | More places are affected |

Edit the file and every dependent file in the same task. Never leave broken imports or missed call sites.

## Working style

| Situation | Action |
| --- | --- |
| Clear feature request | Write it directly, unless the repo's workflow needs a plan first (see [`implement-the-ant`](../implement-the-ant/SKILL.md)). Then plan and wait for approval |
| Bug report | Fix it, and explain only what the user needs to know |
| Unclear requirement | Ask, do not assume |

## Summary

| Do | Don't |
| --- | --- |
| Write code directly | Write tutorials |
| Let names explain the code | Add obvious comments |
| Fix bugs immediately | Explain the fix before making it |
| Inline small things | Create unnecessary files |
| Name things clearly | Use abbreviations |
| Keep functions small | Write 100+ line functions |

## Verify before you report done

| Check | Question |
| --- | --- |
| Goal met | Did you do exactly what was asked? |
| Files | Did you update every file the change needs? |
| Checks | Did lint, format, type checks, and tests pass? |
| Edge cases | Did you cover empty, error, and boundary inputs? |

Run the checks this project defines. In a repo with `vp run check`, run that. If any check fails, fix it before you report done. If you cannot run a check, say so and why.
