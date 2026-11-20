---
name: __human-friendly
description: Rewrite text in very simple words for a newbie human reader, and keep it short. Use for chat, docs, tickets, PRs, comments, and user-facing strings. Not for agent prompts, tool specs, or runbooks (use asd-ste100). Never drop critical facts.
---

# Human-Friendly Writing

Write for a common human or newbie who is in a hurry. Use simple words. Keep it short

## Rules

1. Put the answer or next step first
2. Use everyday words. Say "use", not "utilise". Say "start", not "initiate"
3. One idea per sentence. Aim for 15 words or fewer
4. Use "you" and active verbs. Say who does what
5. Explain a hard term once in a few plain words. Keep the exact name in backticks if people search for it
6. Use a list for steps or three or more facts. Keep paragraphs to one or two sentences
7. Cut filler, repeats, background, and "nice to know". Keep only what the reader must know or do
8. No `—`, no semicolons, no canned openings. Use a colon or comma instead
9. Drop the final period of each paragraph and list item
10. Use `##` for structure. Use bold only for a must-not-miss warning
11. Use the plain verb form, without the `s` ending. Write "use", "send", and "log", not "uses", "sends", and "logs". Plural nouns keep their `s`, such as "logs" or "retries"

## Never drop

- Commands, URLs, paths, API names, env vars, and required syntax
- Numbers, dates, time zones, versions, and limits
- Scope, preconditions, and "do not" rules
- Failure, retry, rollout, and check steps that affect safety
- Names the reader must act on (TDD, migration, queue, ticket key)

Short means fewer words, not fewer facts. If a sentence holds many facts, split it into bullets

## Name the work

Say the real deliverable ("TDD", "bug fix", "feature"), not "this Spike", unless the topic is Jira workflow

## Editing existing text

Change the words, not the layout

- Keep headings, list or prose form, tables, code fences, link text, and template lines
- Rewrite only unclear sentences. Leave clear ones alone
- Do not rename identifiers, paths, ticket keys, or strings. Do not add headings or recaps
- If another skill sets the format, keep its template. Simplify only the prose inside it

## Not for

Agent prompts, tool specs, error templates, runbooks (use `asd-ste100`). Marketing or creative text where voice matters

## Self-check

- Main point is in the first line
- A newbie needs no guesswork on acronyms
- Every sentence earns its place. Nothing critical is missing
