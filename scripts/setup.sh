#!/bin/sh
# Setup script for any ADE (agentic development environment). Runs in a new worktree.

git fetch --prune origin
if git rev-parse --abbrev-ref --symbolic-full-name '@{u}' >/dev/null 2>&1; then
  git pull --ff-only || echo "setup: git pull skipped, resolve manually"
else
  echo "setup: no upstream branch, skipped git pull"
fi
vp install
