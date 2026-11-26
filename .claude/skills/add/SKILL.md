---
name: add
description: Add one or more entries to this repo, usually a new tech stack note in stacks/, sometimes a guide in docs/guides/ or a reference in docs/references/. Runs in a new worktree and ends in a PR. A gate decides whether the entry also goes into the main README. Use when the user types /add, or asks to add, document or list a tool, stack, guide or reference. Not for vendoring another repo's skill pack (use extract-the-meerkat).
---

# Add

Add an entry to this repo. Most entries are a new stack note. Read [`human-friendly`](../human-friendly/SKILL.md) before writing any note or PR text

## Rules

- Work in a new worktree and branch from `main`. Never add on `main` or on another open branch
- One PR per request. Several entries in one request go in one PR, one commit per entry
- Never overwrite an existing entry. If the file exists, update it only when the user asks, else stop and say so
- Do not invent facts. Check the official site or repo for the name, links, package name and version. Use WebSearch, or the `web-fetch` agent when no fetch tool is at hand. Say so when you cannot verify one
- Keep each note short and plain. Match the shape of the notes next to it
- Never touch app code. The only code in this repo is `index.ts`
- Do not add a note to the README without passing the gate below
- Vendored skill packs and stacks from other repos go through [`extract-the-meerkat`](../extract-the-meerkat/SKILL.md), not this skill

## 1. Pick the kind of entry

| Kind      | Folder             | File                | Use for                                         |
| --------- | ------------------ | ------------------- | ----------------------------------------------- |
| Stack     | `stacks/`          | `<tool-slug>.md`    | One tool, library, service or app (the default) |
| Guide     | `docs/guides/`     | `<topic-slug>.md`   | A how-to that spans tools                       |
| Reference | `docs/references/` | `<topic-slug>.md`   | Credits and inspirations                        |

- File names are lowercase kebab-case, like `react-helmet.md`
- Unsure of the kind: ask once, with the options above
- Look for a near duplicate first: `ls stacks | grep -i <word>` and `grep -ril <word> README.md stacks docs`. A tool that fits an existing note (a new package of the same tool) goes into that note

## 2. Open the worktree

```sh
git fetch origin main
git worktree add -b docs/add-<slug> .claude/worktrees/add-<slug> origin/main
```

- Branch name: `docs/add-<slug>`. For several entries use a short group name, like `docs/add-oxc-tools`
- If the branch or the worktree folder already exists, stop and ask. Do not reuse it
- Move the session into the new worktree and run every later command there
- If the tool has its own worktree feature (Claude Code `EnterWorktree`, Orca), use it. Name the branch the same way
- Run `bun install` in the new worktree before step 5. A new worktree has no `node_modules`, so `bun run check` fails without it

## 3. Write the entry

### Stack note

Read two notes in `stacks/` first. Then write:

```md
# <Name>

<One or two sentences: what it is and why it is in this stack>

Links:

- [<Label>](<url>): <what it is>
```

- Add `- Package: ...`, `- Latest version: ...` or a short "use X instead of Y" line only when it helps and you verified it
- Links come first from the official site or repo. Add a docs link when it is useful
- The file name is the link target in the README, so keep `<tool-slug>.md` exactly the same in both places

### Guide or reference

- Read two notes in the same folder first and match their shape
- Link to it from the nearest place that lists its siblings: `## Guides` or `## References` in the README, if the gate passes (see below)

## 4. Run the gate

The gate decides if the entry is also listed in the main [README](../../../README.md). Most entries fail the gate. They stay in `stacks/` only. That is fine

Score the entry. It passes only when **all** of these are true:

1. It is a default or a clear first choice for a job, not one of many options
2. A new reader of the README would miss it
3. It fits a section that already exists (`Default Stack`, `Development Tools`, `Optional: ...`, `Guides`, `References`)

Else it fails. A tool you only want to remember, compare or try is not README material. A guide or reference uses the same three checks, with "a new reader would miss it" meaning a how-to or credit a newcomer needs

Then:

- Show the user the verdict in two lines: pass or fail, and the one reason. Ask for a yes before you touch the README. When the user said up front that it goes in the README, or that it does not, follow that and skip the question
- On a pass, add one line to the best README section, in the style of its neighbours (`Label: [Name](stacks/<slug>.md)`). Keep the numbering right. A new default may mean you must renumber the list
- Guides go under `## Guides`. References go under `## References`
- Do not edit the `Core Stack` list, the hero, `Goal`, `Benefits` or `Features` through this skill. Ask first

## 5. Check and commit

- `bun run check` (format, lint, Markdown lint). Fix what it reports. If it still fails, stop and report- Commit with [`good-commit`](../good-commit/SKILL.md): `docs(stacks): add <name> stack`. The README link goes in the same commit as the note, since they are one change
- Several entries: one commit each, so a reviewer can drop one

## 6. Open the PR

Use [`good-pr`](../good-pr/SKILL.md). It is already in the right worktree, so it skips the worktree step

- Title in plain words: `Add Knip stack note`, or `Add Knip stack note and list it in README`
- Body: use the three sections from `good-pr` (Description, Situation, Proposal). Put the gate verdict under Proposal (for example "Not in README: one of many options")
- No Approach diagram, since this is a docs change

## Report

Give the PR URL, the entries added, the gate verdict for each, and the worktree path. Add one line for anything that failed or was skipped
