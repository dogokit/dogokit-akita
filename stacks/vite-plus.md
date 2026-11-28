# Vite+

Vite+ is a unified web toolchain from VoidZero, run through one CLI called `vp`. It combines Vite, Vitest, Oxlint, Oxfmt, tsrs, oxc-node, Rolldown, tsdown and Vite Task. It also manages the runtime and the package manager

Official links:

- [Vite+](https://viteplus.dev): official site
- [Vite+ Docs](https://viteplus.dev/guide): official docs
- [Vite+ GitHub](https://github.com/voidzero-dev/vite-plus): source code, MIT license
- Package: `vite-plus`

## In this repo

All tool config lives in one file, `vite.config.ts`. It holds the `fmt` block (Oxfmt) and the `lint` block (Oxlint). There is no `.oxfmtrc.json` or `.oxlintrc.json`

- `vp check`: format, lint and type checks in one run
- `vp check --fix`: format and apply safe lint fixes
- `vp fmt` and `vp lint`: run one tool alone
- `vp run <script>`: run a `package.json` script

Bun stays the package manager. Vite+ finds it from `packageManager` in `package.json`. CI uses `voidzero-dev/setup-vp` to install `vp`, Node and Bun

## Install

Install the `vp` CLI once per machine:

```sh
curl -fsSL https://vite.plus | bash
```

Then install the project packages with `bun install` or `vp install`

## Migrate a project

`vp migrate` moves a project to Vite+. It merges `.oxlintrc*`, `.oxfmtrc*` and lint-staged config into `vite.config.ts`, swaps `oxlint` and `oxfmt` for `vite-plus`, and rewrites the scripts

```sh
vp migrate --no-interactive --no-agent --no-hooks
```

`--no-agent` keeps our own `AGENTS.md`. `--no-hooks` skips the pre-commit hook. Run `vp check` after it
