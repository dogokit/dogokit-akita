---
name: present-the-chicken
description: Turns a documentation into a team presentation kit, a facilitator guide of 20 minutes or less in chat, then a visual slide deck with speaker notes and an optional source tag on every fact. Use when the user asks to present a doc, walk the team through it, or make slides from a TDD.
---

# Present the Chicken

Turn any documentation into a way to present it: a short run sheet first, then a deck. Read-only on the repo. Nothing is written to the repo, committed or sent to anyone.

## Input

- A doc path (for example `docs/technical-design/tdd-<slug>.md`). If none is given, ask once
- Optional: a time box (default 20 minutes) and the audience (default: the engineering team)
- The user may ask for only the guide or only the deck. Do just that part

## Step 1: Read the doc once

- Read the whole doc. Note every section number and title (`grep -nE '^#{1,3} '`). The tags in step 4 depend on them
- Write down: the ask (decision or approval), the three-line story, key numbers, dates, plan phases, safety rules, rollback, testing, risks, and decisions needed
- Compare today's date with the doc's dates. If a planned date has passed or is close, flag it in the notes and the final report. Do not change it

## Step 2: Facilitator guide in chat (no slides)

Apply [`human-friendly`](../human-friendly/SKILL.md). Plain words. Keep every number, date, version and command.

- Run sheet as a table: minute range, part, what to say, what to show. Total at or under the time box
- Open with the ask, then the story in three lines, then the problem, plan, rules, rollout, testing, and decisions
- Say what to skip when time runs short
- Name the likely questions, with short answers from the doc
- Flag anything the doc does not say (for example a count you worked out). Do not invent facts

## Step 3: Build the deck

1. Use the best slide tool the session has. When an Artifact tool exists, call it with `action: "quickstart"` and `intent: "slides"`, and follow the type's instructions. Otherwise write one HTML deck file. Make a `.pptx` only when the user asks for a file
2. Work in the scratchpad, not the repo
3. One slide per idea, about 12 to 16 slides for 20 minutes. Map the run sheet to slides one to one. Split long timelines in two
4. Look and layout (1920×1080):
   - Alternate dark and light slides. Use one main accent color and one second color for emphasis. Match the product's brand when it has one
   - One heading font and one body font
   - Generous padding. Estimate content height before writing, so nothing overflows
   - Big numbers, cards, pills, and one flow diagram. Body text at least 24px, except source tags
   - Exact doc wording is fine for names, versions, dates and field names
   - Footer on content slides: `<doc title>` in small text
5. Speaker notes on every slide: the talk track, the minute range, and any caveat or date to check
6. Open with a cover (the ask) and a "whole talk in three lines" slide. Close with the decisions slide and repeat the three lines

## Step 4: Source tags on every fact (optional)

When the user wants traceability, add a small line to each fact:

- Format: `TDD §<n> <exact section title>`. Add the subsection when it helps, for example `§5 Proposed design › Rule 3`. Join several with ` · `
- Style: small (about 20px), muted color that still passes contrast on its background
- Place it inside the card, tile or row it backs, to save height
- Verify every tag against the doc: search for the fact and read its section. Never guess the number
- For many edits, back up the slides folder first, then use one script that asserts each replacement happens exactly once

## Step 5: Check and report

- Layout check is optional. If the user asks for one, open the deck in a browser and look
- Say plainly what was not checked, and name the slides most likely to be tight
- Flag dates that may be stale and any numbers you worked out
- Tell the user how to share the deck (it starts private)
- Final report is short: the link or path, slide count, what is in the notes, and the flags

## Rules

- Do not edit the source doc
- Do not commit, push, post or share anything
- Facts come only from the doc. Mark anything you worked out
