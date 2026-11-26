---
name: clean-the-garden
description: Garden a codebase. Do a whole-repo weeding round (unused code, stale or contradicting comments, copied broken patterns, hand-rolled duplicates of shared code, dead links), fix what you find, then make the fix stick with the strongest guard you can: a design change first, then a check (lint, test, type error), then a written rule beside the code. Use when the user asks to garden, weed, clean up rot, do a cleanup or hygiene round, review a whole repo for drift, or run the periodic (about weekly) agent review of a codebase. Not for new features, bug hunting in a diff (use code review), or refactors with no rot.
---

# Clean the garden

Source: Yihan Zhu, "Codebase Gardening" (building on Lauren Tan's "your codebase is kind of like a garden").

## Why this matters

Agents copy whatever they find nearby. Before a change, an agent reads the code around it, and whatever is there "looks like the way things are done here." Good patterns spread that way, and so do weeds, at the speed agents write. You keep the garden clean "so that agents are always copying the good stuff."

So a round has two jobs: pull the weeds, then put rules into the code that keep them out. Weeding alone does not last.

## When and how wide

- Cadence: about once a week, or when the user asks.
- Scope: the whole codebase, not only the latest diff. Earlier rounds often remove one weed and miss others close by, and old weeds sit outside recent diffs.
- A human approves each change. Do not commit unless the user asks.
- Do not change behavior. No features, broad refactors, public API, schema or user-visible text changes. Report those as separate work.
- If a weed might still be live (dynamic use, string names, routes, config, outside users), leave it and list it as uncertain.
- Run the project checks after each group of fixes. A fix that breaks the build is not a fix.
- A weed that comes back after a guard was added means the guard is too weak or misses that code. Make it stronger.

## Step 1. Read the house rules

Read the agent instruction files (CLAUDE.md, AGENTS.md, .cursor/rules, and so on), the lint, type-check and test config, and the shared helpers (link components, style tokens, shared constants and ranges). You need to know what "the good stuff" is before you can see what has drifted from it.

## Step 2. Hunt for weeds

Sweep the whole repo. Look for these kinds, most common first:

1. Unused code. This is the clearest weed and it keeps coming back. Look for exports nothing imports, styles for removed features, settings or config keys nothing reads, and fallback code for old browsers or runtimes the project no longer supports. Run the type checker and linter, and read their hints and warnings, not only errors. A hint that only prints lets weeds through.
2. Bad comments. Comments grow faster than code and go stale fast. Flag comments that:
   - no longer match the code (for example, a test was rewritten but its comment was not);
   - say the opposite of the code (watch for this after anyone "shortens" comments);
   - explain a workaround in a way that makes it look intentional to the next agent;
   - just restate what the code does.
   Keep a comment only when it guards against a real mistake.
3. Copies that bypass a shared place. Look for hand-typed versions of things that already exist as shared code: a link written by hand instead of with the shared link component, a constant or regex range retyped in a file instead of imported. Shared code protects only the code that uses it.
4. Copied broken patterns. When you find one bug, search the whole repo for the same shape. Look-alikes are a trap (for example, a Unicode range whose first character is a look-alike glyph, which then also matches the wrong script). Compare by code point or value, not by how it looks.
5. Unintended defaults that rode along. Look for settings that were copied onto new code without anyone choosing them (for example, a referrer or target attribute on outside links).
6. Rot from outside the code. Dead external links, outdated docs that describe removed behaviour.

For each finding, write down where it is, what kind of weed it is, and how it got in: copied from existing code, newly made by later work, or old and missed before. Most weeds are new ones from later work, not copies. Copying explains how a weed spreads, not how it gets in, so do not assume every weed is a copy.

## Step 3. Pull the weeds

Fix most findings on the spot, in small focused changes:

- Delete unused code. Do not comment it out.
- Rewrite or delete stale and explaining comments.
- Point hand-rolled copies at the shared code.
- Fix every copy of a broken pattern, not only the first one you saw.

Add a short write-up to each change (in the PR or commit body, or as notes for the user): what went wrong and why. The codebase is "a form of memory" that the next agent reads, so the reason should stay with the change.

## Step 4. Keep them out

For every weed that could come back, add the strongest guard that fits, as close to the code as it can go. Use this order:

1. Design change (best). Make the wrong choice impossible. Move a rule into one shared piece of code so a later change to the rule is one line. Keep a feature agents misuse out of product code. Write values as numbers (code points) so a look-alike shows up as a different number.
2. Check. If an instruction for agents can become a check, make it a check. Options: a lint rule whose error message points to the real fix, a test that checks the real cases (for example, a range test with both the right and wrong script), a test that fails if any other file defines its own copy, or turning a type-checker hint into a failure that stops a change from going in.
3. Written rule (weakest). Put it right next to the code it governs, for example a short comment beside shared styles saying how every hover effect must work. Put rules that apply everywhere in the file agents read before they start.

Prefer encoding effort into the code and its checks over relying on human review.

Do not add a new tool or dependency for a guard without asking the user first. Propose it instead.

## Step 5. Report

Give the user:

- Weeds found and fixed, grouped by kind, each with a one-line write-up.
- Guards added, labelled design, check, or written rule.
- Gaps that no guard covers, which wait for the next round. Be honest about these. The usual ones are:
  - code that never goes through a shared place (hand-typed links, content inside posts or data files);
  - whether a comment is still true (no check can judge this, so review keeps it);
  - unused styles and stale comments that sit outside what the checks read.
- Findings you did not fix, and why.

See [checklist.md](checklist.md) for a quick per-round checklist.
