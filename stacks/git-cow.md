# git-cow

A Rust tool that adds `git cow`, a git command for worktrees. New worktrees are copy-on-write clones, so folders like `target/` and `node_modules` take little extra disk. Use it when each worktree would otherwise cost gigabytes of build output

- Package: `git-cow` on crates.io, install with `cargo install git-cow`
- Latest version: 0.6.0

Official links:

- [git-cow GitHub](https://github.com/gabrielkoerich/git-cow): source code, MIT license
- [git-cow Docs](https://docs.rs/git-cow/): library docs, the homepage in the repo settings
