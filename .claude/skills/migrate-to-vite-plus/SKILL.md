---
name: migrate-to-vite-plus
description: Move a JavaScript or TypeScript repo to Vite+ and its vp CLI. Replaces Oxc, Biome, Prettier, ESLint and direct Bun, Node.js, npm, pnpm or Yarn commands with vp commands, merges the config into vite.config.ts, and updates scripts, CI, hooks, docs and editor settings. Use when the user asks to migrate to Vite+, VP or vp, or to replace Bun, Node.js, npm, pnpm or Yarn commands in scripts, CI or docs with vp.
---

# Migrate to Vite+

Goal: the repo runs format, lint, type checks, tests and scripts through `vp`, with one config file (`vite.config.ts`). No old tool command is left in the scripts, CI, hooks, docs or editor settings. The package manager stays the one the repo chose.

Check `package.json` first. If it has `vite-plus` and no old tool command is left, the repo is done. If it has `vite-plus` but still has `bun run`, `npm run` or old tool names in scripts, docs or hooks, skip to step 5.

## 1. Detect what the repo has

Find these before changing anything:

- Vite+ already: `vite-plus` in `package.json`, and a `vite.config.ts` that imports from `vite-plus`. Without it, `vp` prints "This project does not use vite-plus".
- Old formatter and linter: `biome.json` or `biome.jsonc`, `.prettierrc*`, `prettier.config.*`, `.prettierignore`, `.eslintrc*`, `eslint.config.*`, `.eslintignore`, `.oxfmtrc*`, `.oxlintrc*`
- Staged-file hooks: `lint-staged` config, `.husky/`, `simple-git-hooks`
- Runtime and package manager: `packageManager` in `package.json`, the lockfile (`bun.lock`, `bun.lockb`, `package-lock.json`, `pnpm-lock.yaml` or `yarn.lock`), and `.nvmrc`, `.node-version`, `.tool-versions` or `engines`
- Scripts in `package.json` that call a tool directly: `bun`, `bunx`, `npm`, `npx`, `pnpm`, `yarn`, `node`, `tsx`, `biome`, `prettier`, `eslint`, `oxlint`, `oxfmt`, `vite`, `vitest`
- CI: `.github/workflows/*.yml`, such as `oven-sh/setup-bun` or `actions/setup-node`, and the command each workflow runs
- Docs and agent files: `AGENTS.md`, `CLAUDE.md`, `README.md`, `docs/`, `.github/`, and hook commands in `.claude/settings.json`
- Editor: `.vscode/settings.json` and `.vscode/extensions.json`

Map each tool to its gate. Only rewire gates the repo has:

| Found | Gate | Vite+ replacement |
| --- | --- | --- |
| Biome lint, Oxlint, ESLint | lint | `vp lint`, from the `lint` block of `vite.config.ts` |
| Biome format, Oxfmt, Prettier | format | `vp fmt`, from the `fmt` block |
| Several of the above | check | `vp check`, which runs format, lint and type checks |
| markdownlint | Markdown lint | keep as is, in a script such as `lint:md` |
| Vitest | tests | `vp test` |
| Vite | dev and build | `vp dev` and `vp build` |
| lint-staged | pre-commit | `vp staged`, with hooks from `vp config` |

If the repo still uses Biome, Prettier or ESLint, run [migrate-to-oxc](../migrate-to-oxc/SKILL.md) first. The Vite+ stack note says `vp migrate` merges Oxc and lint-staged config. It does not say it handles Biome, Prettier or ESLint, so move those to Oxc first.

Write down the gates and the mapping before you move on. List any ESLint rule that has no Oxlint equivalent, and say which ones were dropped.

## 2. Check the vp CLI

Every contributor and CI runs `vp`, so the repo needs it on every machine.

- Check with `vp --version`.
- If it is missing, give the user the install command from the [Vite+ stack note](../../../stacks/vite-plus.md) and wait. Running an install on the user's machine is theirs to do.
- Plan to say in the start guide and the README that `vp` is required.

## 3. Work on a branch in a worktree

The migration touches many files. In an agent session, make a new worktree in `.claude/worktrees/` on a new branch, and do not switch branches in the main checkout. Follow the repo's worktree rule in `AGENTS.md`.

## 4. Migrate the tool config

- Run `vp migrate --no-interactive --no-agent --no-hooks` in the repo root. `--no-agent` keeps the repo's own `AGENTS.md`. `--no-hooks` skips the pre-commit setup, which is a separate choice in step 6.
- Read the whole diff. `vp migrate` merges `.oxlintrc*`, `.oxfmtrc*` and lint-staged config into `vite.config.ts`, swaps `oxlint` and `oxfmt` for `vite-plus`, and rewrites scripts. Check the scripts again in step 5.
- For an app that uses Vite or Vitest, `vp migrate` asks for Vite 7+ and Vitest 4+. Check the versions.
- Carry the old formatter options into the `fmt` block. Keep the values the repo already uses, such as semicolons, quotes and print width. Keep `ignorePatterns` for folders that must not be formatted or linted, such as `.claude/**`.
- Delete the old configs (`biome.json`, `.prettierrc*`, `.eslintrc*`, `.eslintignore`, `.prettierignore`, `.oxfmtrc*` and `.oxlintrc*`) if `vp migrate` left them. Do not keep copies.
- Check imports and path aliases, as the migrate summary says.

## 5. Adapt the scripts from Bun, Node.js, npm, pnpm or Yarn

Keep the repo's package manager. Vite+ reads it from `packageManager`. Do not change the lockfile or the `packageManager` value in this migration unless the user asks.

Replace the commands in `package.json` scripts, CI, hooks and docs:

| Before | After | Note |
| --- | --- | --- |
| `bun run X`, `npm run X`, `pnpm run X`, `yarn X` | `vp run X` | Runs a `package.json` script |
| `bun install`, `npm install`, `pnpm install`, `yarn` | `vp install` | In CI, use `vp install --frozen-lockfile` |
| `bun add X`, `npm i X`, `pnpm add X` | `vp add X` | Use `vp add -D X` for dev dependencies |
| `bun remove X`, `npm uninstall X` | `vp remove X` | |
| `bunx X` or `npx X`, for a package not in dependencies | `vp dlx X` | Runs without installing it |
| `bunx X` or `npx X`, for a package in dependencies | `vp exec X` | Runs from `node_modules/.bin` |
| `bun file.ts`, `node file.js` | `vp node file.js`, or `vpx file.ts` for TypeScript | |
| `biome check`, `prettier --check`, `eslint .` | `vp check`, `vp fmt`, `vp lint` | |
| `oxlint`, `oxfmt` | `vp lint`, `vp fmt` | |
| `vitest` | `vp test` | |
| `vite`, `vite build` | `vp dev`, `vp build` | |
| `bun test` | ask first | It uses Bun's own test runner, not Vitest. Move those tests only with the user's OK |

Rules for scripts:

- Keep the script names. Change only what runs, unless the user asks to rename.
- A script that runs a local binary, such as `tsc` or `markdownlint`, can stay as it is. `vp run` finds binaries in `node_modules/.bin`.
- Keep the flags the repo already uses, such as `--deny-warnings`.
- A script that needs a runtime feature, such as `bun --hot` or `Bun.serve`, is not a plain swap. Ask the user before you rewrite it.
- Write scripts that work with any package manager. Do not write docs or hooks that only work with Bun.
- Remove scripts that only ran the old tools.

Example:

```json
"check": "vp check --deny-warnings && vp run lint:md",
"fix": "vp check --fix",
"lint:md": "markdownlint \"**/*.md\" --dot"
```

## 6. Adapt CI, hooks, docs and editor

- **CI:** replace the Bun or Node setup with `voidzero-dev/setup-vp`. Keep the Node version the repo pins, and run `vp run check`. Keep the job name and the checkout step.

  ```yaml
  - uses: voidzero-dev/setup-vp@v1.22.0
    with:
      node-version: "24"
      cache: true
  - name: Run checker
    run: vp run check
  ```

  Add `vp install --frozen-lockfile` before the check, unless the setup action is confirmed to install dependencies in this repo. Report that the GitHub run was not tested.

- **Hooks:** only if the repo had hooks. `vp config --hooks` installs the hook dispatcher, and `vp staged` runs linters on staged files in place of lint-staged. Rewrite hook commands in `.claude/settings.json` and git hooks to `vp run` or `vp` commands.
- **Docs and agent files:** update `AGENTS.md`, `README.md`, `.github/` files, `docs/` and the repo's own skills. Tell readers to install `vp` first. Keep the word Bun only where it describes Bun as an option, such as in a Bun stack note.
- **Skip** vendored packs (Git submodules under `.claude/<pack>/`) and examples from other repos, such as the `migrate-to-oxc` example. Their commands are not ours to change.
- **Editor:** in `.vscode/extensions.json`, add `VoidZero.vite-plus-extension-pack`. Remove `biomejs.biome`, `esbenp.prettier-vscode` and `dbaeumer.vscode-eslint`, and remove trailing commas, which are invalid JSON. In `.vscode/settings.json`, set `oxc.oxc-vscode` as the default formatter for each language that Biome or Prettier handled before, and remove the ESLint code actions.
- **Stack note:** make sure `stacks/vite-plus.md` matches what the repo does.

Find what is left with:

```sh
git grep -n -E "bun (run|install|add|x)|bunx|npx|npm (run|i|install)|pnpm|yarn|biome|prettier|eslint" -- ':!.claude/mattpocock' ':!.claude/addyosmani' ':!.claude/egm' ':!.claude/pstack' ':!.claude/skills/migrate-to-oxc' ':!bun.lock'
```

Skip vendored packs and examples, as above. Add a pathspec for each pack the repo vendors. Explain each remaining hit.

## 7. Verify

Run read-only checks in the worktree and report the output for each:

1. Clean install: `rm -rf node_modules && vp install --frozen-lockfile`.
2. The CI command: `vp run check`.
3. Each gate alone, in check mode: `vp fmt --check`, `vp lint` and `vp run lint:md`.
4. A planted violation in a scratch copy, to confirm lint catches it. Delete the copy afterward.
5. Each changed script, with `vp run <name>`. Skip any script that rewrites files, such as `fix`.
6. Each JSON config and editor file parses.
7. The `git grep` result from step 6. Explain every hit.
8. `git status`, to confirm the changes are only the ones the migration made.

Say plainly what was not tested, such as the GitHub CI run and the live editor.

## 8. Stop and hand over

Do not commit unless the user asks. When they ask, use `good-commit`.

Do not run format or fix commands that rewrite many files unless the user asks in this conversation. End the migration with:

- The `vp fmt --check` list, so the user can see which files would change.
- The commands to run when they are ready: `vp run fix` rewrites files, and `vp run check` only checks them.
- Any script, hook or CI step that was not changed, and why.
