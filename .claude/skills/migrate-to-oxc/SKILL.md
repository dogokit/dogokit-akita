---
name: migrate-to-oxc
description: Move a JavaScript or TypeScript repo from Biome, Prettier or ESLint to Oxc (oxlint for linting, oxfmt for formatting). Detects which tools and gates the repo has, swaps the packages, migrates configs to the repo root, rewires scripts and VS Code settings, and verifies every gate. Use when the user asks to migrate to Oxc, Oxlint or Oxfmt, or to replace Biome, Prettier or ESLint.
---

# Migrate to Oxc

Goal: the repo runs `oxlint` and `oxfmt` through the same gates it had before, with no Biome, Prettier, ESLint packages, configs or editor settings left behind.

Not for a repo that already runs Vite+ (`vp check`), such as this one. Check `package.json` first and stop if it does.

## 1. Detect what the repo has

Find these before changing anything:

- Biome: `biome.json`, `biome.jsonc`, or `.dotfiles/biome.json`
- Prettier: `.prettierrc*`, `prettier.config.*`, a `prettier` key in `package.json`, `.prettierignore`
- ESLint: `.eslintrc*`, `eslint.config.*`, `.eslintignore`, `.eslintcache` in `.gitignore`
- Scripts in `package.json` that call `biome`, `prettier`, `eslint`, or any `*:md` gate
- CI: the command the workflow runs (for example `bun check`)
- Editor: `.vscode/settings.json` and `.vscode/extensions.json`

Map each tool to its gate. Only rewire gates the repo actually has:

| Found | Gate to keep | Oxc replacement |
| --- | --- | --- |
| Biome lint | lint | `oxlint` |
| Biome format | format | `oxfmt` |
| Prettier | format (code and Markdown) | `oxfmt` |
| ESLint | lint | `oxlint` (port rules by hand) |
| markdownlint | Markdown lint | keep as is |

Write down the gates and the mapping before moving on.

## 2. Swap the packages

- Remove the old tools with `bun remove` (or the project's package manager). Remove their plugin packages too, such as `eslint-config-prettier`.
- Add `oxlint` and `oxfmt` with `bun add -d oxlint oxfmt`.
- Commit the lockfile change only when the user asks.

## 3. Migrate the formatter

- Run `oxfmt --migrate=biome` or `oxfmt --migrate=prettier` in a scratch copy of the config folder, not the repo. It writes `.oxfmtrc.json` there.
- Read the warnings. Oxfmt skips unsupported Prettier plugins and logic in `.prettierrc.mjs`, so port those by hand. Prettier's import-order plugin becomes `sortImports`, the package.json plugin becomes `sortPackageJson`, and the Tailwind plugin becomes `sortTailwindcss`.
- If Biome and Prettier both exist, pick one base config and say which values you kept. Typical conflicts are `semi` and `arrowParens`.
- For Markdown, set `proseWrap: "preserve"` unless the repo already wraps prose at 80 columns. "always" rewraps every doc and creates a large diff.

## 4. Migrate the linter

- The installed `oxlint` has no migrate command for ESLint configs (check the version you installed with `oxlint --version`), so check each custom ESLint rule and find its Oxlint equivalent. Drop rules that have no equivalent and list them for the user.
- Biome's linter defaults are close to Oxlint's, but not identical. Run both once on the repo and note the difference only if it matters.
- Keep the linter config minimal. Add rule categories only when the user asks for them.

## 5. Place the configs at the repo root

- Put `.oxfmtrc.json` and `.oxlintrc.json` at the repo root. Oxfmt and Oxlint find them automatically, so the scripts need no `-c` flag.
- Keep ignore patterns in the config (`"ignorePatterns": [".claude/**"]`). Config ignore patterns cannot use `..` and resolve only inside the config's own folder, so a config in `.dotfiles/` cannot reach the repo root. Do not use a second ignore file unless the repo already has one.
- Delete the old configs (Biome, Prettier, ESLint) and their ignore files. Do not keep copies.

## 6. Rewire the scripts

Use one command per gate and keep the CI command the same:

```json
"format": "oxfmt",
"format:check": "oxfmt --check",
"lint": "oxlint --deny-warnings .",
"check": "bun run format:check && bun run lint && bun run lint:md"
```

- Add `format:check` to `check` only after the repo passes it. Otherwise CI fails.
- Remove scripts that only ran the old tools.

## 7. Update the editor

- In `.vscode/settings.json`, set `oxc.oxc-vscode` as the default formatter for each language the repo used Biome or Prettier for. Remove the Biome, Prettier and ESLint code actions.
- In `.vscode/extensions.json`, replace `biomejs.biome` and `esbenp.prettier-vscode` with `oxc.oxc-vscode`, and remove any `dbaeumer.vscode-eslint` entry. Remove trailing commas, which are invalid JSON.
- You can skip testing in a live editor if the user says so.

## 8. Handle existing format issues

- Run `oxfmt --check` and list the failing files with the reason for each. Most come from config choices, such as semicolons, tabs or import order, not from Oxfmt defaults.
- Do not run `oxfmt` without `--check`, `format`, or `oxlint --fix` on the repo unless the user asks for it in this conversation. Those commands rewrite files, and the user may want to migrate now and run them later.
- Oxfmt also formats code blocks inside Markdown. Tell the user this when you list the failing files.

## 9. Verify

Run read-only checks on the repo. Do write tests only in a scratch copy, never in the repo. Run all of these and report the output:

1. Clean install with the lockfile, for example `rm -rf node_modules && bun install`.
2. The CI command, for example `bun check`.
3. Each gate on its own, in check mode (`format:check`, `lint`, `lint:md`).
4. A planted violation in a temporary folder, to confirm lint catches it. Delete the folder afterward.
5. Format a sample file in a scratch copy, then confirm the output matches the config.
6. Each JSON config and editor file parses.
7. `git grep` for `biome`, `prettier` and `eslint` outside docs. Explain any hits.
8. `git status`, to confirm the changes are only the ones the migration made.

Say plainly what was not tested, such as the live editor.

## 10. Stop and hand over

Do not run the write commands on the repo. End the migration with:

- The `oxfmt --check` list, so the user can see which files would change.
- The commands to run when they are ready: `bun run format` to rewrite files, and `bun run lint` to check lint. Say that `format` changes files and that `lint` does not.
- A note that `format:check` is not in `check` until the user has run `format` and reviewed the diff.

