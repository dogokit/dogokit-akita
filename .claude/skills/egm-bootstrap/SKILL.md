---
name: egm-bootstrap
license: Apache-2.0
disable-model-invocation: true
description: Bootstrap directory README.md files across a repository subtree.
---

# EGM Peanuts and Hay Bootstrap (`egm-bootstrap`)

Read the harness guide first:

- Codex or ChatGPT Work: [Codex integration](../../egm/docs/codex.md)
- Claude Code or Cowork: [Claude Code integration](../../egm/docs/claude.md)

In this repo the EGM root is `.claude/egm/` (`../../egm/` from here). The `agents/`, `resources/` and `docs/` folders named in this skill are the folders there. Skills run as `/egm-review` and so on, without the `/egm:` prefix

## Overview

This skill creates, fixes, formats and checks EGM `README.md` files across a directory tree. Each file states clear contracts (interfaces, invariants and side effects) for human developers and AI assistants

- Peanuts: leaf-level Component Package READMEs with the contracts of specific files
- Hay: parent-level Repository Blueprints that roll up child contracts into a high-level index

## Delegation

A Goldfish runs in a fresh context with no conversation history

- Spawn each subagent with your harness's subagent tool: Antigravity `invoke_subagent`, Claude Code `Agent`, Codex `spawn_agent`
- Each persona lives in `agents/<file>.md`. Its frontmatter `name` (for example `egm-zoom-out`) is the subagent type to request, if your harness registers named subagents
- Otherwise spawn a general-purpose subagent and tell it to read the persona file first
- Pass the prompt verbatim and wait for the report
- If your harness cannot nest subagents, dispatch directly instead of using the synthesizer. See [`docs/harnesses.md`](../../egm/docs/harnesses.md)
- If your harness has no subagent tool, run the scout steps inline

## Inputs

- `path` (required): root directory to bootstrap
- `is_worker` (optional, internal, default `false`): `true` when you run as a worker Sub-Orchestrator
- `sub_tree_root` (optional, internal): root path of the subtree assigned to a worker
- `target_filename` (optional, default `"README.md"`): contract file to create or update. Use an alternate name such as `"EGM.md"` when you must not change human-written READMEs

## Rules (CRITICAL)

1. Docs only: do not write or refactor any working source code
2. No version control: do not run `git commit` or `git add`. Write all changes to the local filesystem with normal file-writing tools. The human tracks and submits them
3. Private temp files: each worker keeps its status, checkpoint and log files in its own directory outside the workspace (host scratch or `mktemp -d`). Never use a fixed, shared path. If neither exists, skip these files
4. Tools (CRITICAL): use your shell, file-reading, file-writing and file-editing tools to find directories and write contracts and READMEs. Write clean Markdown as you go (standard headers, tables, fenced code blocks). If the repo explicitly configures a markdown formatter (for example `npx prettier --write`), you may run it
5. Parallel workers: spawn Sub-Orchestrator workers in parallel
6. Safety gate (CRITICAL): if you find more than 15 subdirectories, you must ask the user for approval right away (structured question tool if your harness has one, or plain chat) before you run the full tree or spawn workers

---

## Workflow

### Step 0: Find the ecosystem and test command

1. Look for package and build manifests at the repo root:
   - Node.js or TypeScript: `package.json` → `npm test` (or `pnpm test` or `yarn test`)
   - Rust: `Cargo.toml` → `cargo test`
   - Go: `go.mod` → `go test ./...`
   - Python: `pyproject.toml`, `pytest.ini` or `setup.py` → `pytest`
   - .NET or C#: `*.sln`, `*.slnx` or `*.csproj` → `dotnet test`
   - C or C++ with Make: `Makefile` → `make test`
   - Bazel: `BUILD` or `BUILD.bazel` → `bazel test //...`
   - None found: `<test-command>`
2. Save the result as `VerificationCommand` to fill the generated README contracts

---

### Step 1: Choose the start path

1. Check the `is_worker` input
2. If `is_worker` is `true`, jump to Step 4 (Sub-Orchestrator worker flow) and process the assigned `sub_tree_root`
3. If `is_worker` is `false` or unset, act as the Root Orchestrator and go to Step 2

---

### Step 2: Scope the tree and pass the safety gate (Root Orchestrator)

1. Incremental BFS discovery: map the target `path` one level at a time (BFS) with a directory queue. List one directory level at a time. CRITICAL: never run a recursive search such as `find` or `ls -R`
   - Keep intermediate folder nodes
   - Ignore symbolic links, to avoid endless loops
   - Ignore hidden and system directories (`.git`, `.antigravity`, `node_modules`, `venv`, `dist`, `build`, `third_party`)
   - Read `.gitignore` and `.egmignore` (if present) and ignore the glob patterns that match
   - Keep package and build manifests (`package.json`, `Cargo.toml`, `go.mod`, `pyproject.toml`, `*.sln`, `*.csproj`, `Makefile`, `BUILD`) in the map, so you can find test targets later
2. Safety gate and spawn approval (CRITICAL): during the BFS loop, if the running count of directories goes above 15, pause discovery right away. Warn the user and ask for approval (structured question tool if your harness has one, or plain chat) to run the full tree:
   - `question`: "The target directory tree contains more than 15 subdirectories. This is a large execution scope: up to 5 parallel workers, and at least one scout per code directory (one per ~1,500 lines of source). Do you want to proceed with full-tree bootstrapping?"
   - `options`: `["Yes, proceed with full tree bootstrapping", "No, abort execution"]`
   - CRITICAL: after you ask, wait for the user's answer before you continue or spawn any worker
   - If the user chooses abort, stop right away
3. Bottom-up pruning: when mapping is done (and approved), walk the map from leaves to root. Remove directories that hold no code, or only tests
   - Source code files: files with a known source code, schema or contract extension:
     - Systems and compiled: `.c`, `.cc`, `.cpp`, `.cxx`, `.h`, `.hh`, `.hpp`, `.rs`, `.go`, `.zig`, `.lean`, `.f`, `.f90`, `.f95`, `.f03`, `.f08`, `.hs`
     - Managed and enterprise: `.java`, `.kt`, `.scala`, `.cs`, `.razor`, `.cshtml`, `.fs`, `.vb`
     - Scripting and dynamic: `.py`, `.rb`, `.php`, `.lua`, `.sh`, `.bash`, `.ps1`, `.psm1`, `.psd1`, `.r`, `.R`, `.ex`, `.exs`
     - Web and mobile: `.ts`, `.tsx`, `.js`, `.jsx`, `.mjs`, `.cjs`, `.swift`, `.m`, `.dart`
     - Data, schemas and IDLs: `.sql`, `.proto`, `.graphql`, `.gql`, `.thrift`, `.prisma`
     - Infrastructure and declarative code: `.tf`, `.hcl`, `.cue`
     - Not source: build manifests, lockfiles, test fixtures, docs, and generic data dumps like `.csv`, `.tsv`, `.parquet`
   - Test directories: remove directories that hold only test code (named `tests`, `testing` or `testdata`, or holding only files that match `*_test.*`, `*Test.*`, `test_*.*` or `*.spec.*`)
   - Non-code directories: remove any directory that has no source code files and no subdirectory with code. Keep an empty middle folder only if it has child directories that hold code
4. Count the pruned directories and find the maximum depth. Go to Step 3

---

### Step 3: Choose the run strategy (Root Orchestrator)

1. Direct run (5 or fewer directories):
   - If the pruned count is 5 or fewer, write the docs bottom-up in the current thread
   - Go to Step 4 (treat the Root Orchestrator as the worker for the whole `path`), then to Step 5
2. Parallel swarm (more than 5 directories):
   - CRITICAL: if the count is above 15, check that you have explicit user approval before you go on. If not, ask now and wait for the answer before you spawn workers
   - Split the map into independent subtree branches with the Adaptive Depth Partitioning Algorithm:
     1. Set `depth = 1`
     2. Take the directory nodes in the map at the current `depth`
     3. If the node count at `depth` is 3 to 5: use these nodes as partition roots
     4. If the node count at `depth` is below 3: add 1 to `depth` (up to 3) and repeat step 2
     5. If the node count at `depth` is above 5: group the largest branches (by total nested folder count) into 3 or 4 partitions, merge the remaining small branches into one fallback partition, and use these as partition roots
     6. Fallback: if `depth` reaches 3 and the count is still below 3, use the direct children of the root (or fall back to a sequential run)
   - Spawn Sub-Orchestrators: for each partition root, use your harness's subagent tool to spawn a parallel worker:
     - Subagent: `egm-bootstrap-orchestrator` (`agents/bootstrap_orchestrator.md`), or a general-purpose subagent
     - Prompt: "Run egm-bootstrap with path=`[path]`, is_worker=true, sub_tree_root=`[partition_root]`, target_filename=`[target_filename]`."
   - Worker cap: spawn the Sub-Orchestrators in parallel, never more than 5
   - Go idle and wait for all workers to return their JSON subtree index payloads. Then go to Step 5

---

### Step 4: Sub-Orchestrator worker flow

1. Register the scout: use a read-only `goldfish-explorer` scout. If your harness can define subagents at run time, register it with:
   - `name`: `goldfish-explorer`
   - `description`: `Read-only codebase explorer scout.`
   - `system_prompt`: >- You are a read-only codebase explorer. Your task is to analyze the source files in the target directory and return a concise, factual summary. Do not write or modify any files. Return a JSON object containing the directory's public symbols (interface), invariants, and side effects matching schema: {"interface": [], "invariants": [], "side_effects": []}. Never infer RPC methods, routes, status enums, or invariants from file or directory names alone; cite the exact `[file:symbol_or_flag]` for every entry, and output `["None"]` if no explicit invariants or side effects exist in code.
   - `enable_write_tools`: `false`
   - `enable_subagent_tools`: `false`
2. Post-order walk: walk the assigned `sub_tree_root` (or `path`) in post-order (deepest leaves first). For each directory `D`:
   - Fix and update policy: check if `target_filename` (default `README.md`) already exists in `D`
     - If it exists, do not overwrite it whole. Read its current content
     - Scout scan: whether or not `target_filename` exists, always scan the source code with the `goldfish-explorer` scout for `D`, to get the true code symbol boundary
     - Legacy extraction and fix: if `target_filename` exists, call the reasoning LLM with this prompt: > "Analyze the following unstructured documentation content. Extract all public symbol names, classes, interfaces, invariants, and side effects. Format your response strictly as a JSON object matching the following schema: { \"interface\": string[], \"invariants\": string[], \"side_effects\": string[] }." Merge these symbols with the scout's code symbols. Use your file-editing (or file-writing) tool to fix and update the existing contract file so it follows EGM, and keep the developer notes and descriptions
   - Spawn the scout and keep to its limits: spawn `goldfish-explorer` for `D`
     - Size limits: there is no per-directory or per-file byte cap, and you read every non-test file in `D` in full. Instead, keep each scout call to about 1,500 lines of source:
       - List top-level definitions (class, func, def, route and flag lines) with your search tool
       - Cut the directory's files into chunks at those boundaries (never in the middle of a body, and small files share a chunk)
       - Spawn one `goldfish-explorer` per chunk in parallel, at most 5 at a time (queue the rest), and merge their JSON
       - Give each chunk the file's imports and top-level definition list, so it can judge visibility
       - Before you credit an RPC service, schema or message type to a local file, check the build-manifest dependencies and the `import` and `#include` lines
     - Reading order for non-test files:
       1. Contracts, schemas and build manifests (`.h`, `.hh`, `.hpp`, `.proto`, `.graphql`, `.gql`, `.thrift`, `.prisma`, `.sql` DDL, interface classes). Extract exact DDL table names and exported build targets
       2. Module entry points (`main.*`, `index.*`, `lib.*`, `mod.*`, `__init__.py`, or files that match the directory name), then production source and query files in alphabetical order
       3. Templates and configs: up to 200 lines each (800 in config-only directories). Skip `.css` and `.scss`
       4. Test files (`*_test.*`, `*Test.*`, `test_*.*`, `*.spec.*`): ignore them fully, also in mixed directories
     - Child failure: if the scout fails or times out, log a warning, use the placeholder `["(Details pending/documentation failed)"]`, and continue
   - Parent context: when you process a parent directory `P`, fetch the interface summaries of its direct child subdirectories
     - If the child was documented in this run, get its public interface straight from the in-memory cache
     - If the child was fixed or changed (fix policy), use the merged legacy-extraction symbols
     - Pass these child symbol blocks as prompt context when you call `P`'s explorer scout
   - Verification command lookup: fill the Verification section with the `VerificationCommand` you found
     - Bazel or BUILD files: check for a `BUILD` file in `D` or the nearest parent. Refer to `bazel test` or `bazel build` with valid target patterns (`//[package_path]/...` or `//[package_path]:all`, never `//[package_path]...` or `//[package_path]:...`). Use `bazel run` for interactive runner targets
     - Other manifests (`package.json`, `Cargo.toml`, `go.mod`, `pyproject.toml`, `*.sln`, `*.csproj`, `Makefile`): use the matching test runner command (.NET: `dotnet test` on the nearest `*.csproj`)
     - If you find no verification command, leave it out or use a placeholder
   - Classify the directory and write from a template: create or fix `target_filename` with your file-writing or file-editing tool, based on how you classify `D`
     - Component Package (Peanut): `D` has source code files directly in it. Use the Component Package README Template. If it also has child subdirectories, add relative links to their contracts in the Interface section
     - Repository Blueprint (Hay): `D` has no source code files directly, but has subdirectories with code contracts. Use the Intermediate Blueprint README Template
   - Link rules (CRITICAL): package contract files mix link styles for portability and clarity:
     1. Relative links to files that exist: use relative paths (for example `./child/${target_filename}` or `../sibling/${target_filename}`) for child contracts and sibling file references inside the same subsystem. CRITICAL: write a `[Child](./child/${target_filename})` link only for child directories that are in the pruned `subtree_index` and hold a real `${target_filename}`. If a child directory holds a `SKILL.md` or another non-contract file, link straight to `./child/SKILL.md` or write a plain bullet with no link. Never write guessed links to contract files that do not exist
     2. Absolute links: use standard URLs or repo paths for files outside the package subsystem (for example cross-package dependencies)
   - Markdown format: right after you write or fix `target_filename` in `D`, make sure the markdown is clean (valid headers, tables and code fences). If the repo configures a markdown formatter (for example `npx prettier --write`), you may run it on `target_filename`
3. Worker report: when the assigned subtree is fully walked, build the `subtree_index` array. For every processed directory it holds the `path`, `summary`, `interface`, `invariants` and `side_effects`
4. If `is_worker` is `true`, read the [Worker Return Interface Schema](references/worker-return.schema.json) (path is relative to this skill folder), return a matching JSON payload to the Root Orchestrator, and stop. If `is_worker` is `false` (sequential mode), go straight to Step 5

---

### Step 5: Compile the result and finish (Root Orchestrator)

1. Collect worker payloads: gather the JSON `subtree_index` payloads from all parallel Sub-Orchestrators
   - Worker failure: if a parallel worker fails or times out, log a warning and put a placeholder warning link (`[Subtree Root] (Documentation failed / Subagent execution timeout)`) in the root Blueprint's subdirectory index. Finish the rest of the compile. Partial files from a failed worker are fine: the fix policy lets a later run pick up where it stopped
2. Middle directories: find any directories between the root `path` and the partition roots
   - Process them one by one, bottom-up
   - Write Intermediate Blueprint contract files from the summaries the workers returned
   - Make sure each Intermediate Blueprint file is clean and its relative links are valid
3. Root directory: the target root `path` is always the Repository Root (Blueprint or Hay)
   - Check if `target_filename` already exists in `path`. If so, apply the fix policy: keep the existing title, metadata and architecture overview at the top of the root contract file
   - Check if `path` itself has any source files directly. If so, spawn a `goldfish-explorer` scout for `path` to get its local symbols and invariants. Add them under the optional `## Local Interface & Invariants` section
   - Build the final root `target_filename` from the Repository Root Blueprint Template, rolling up all top-level subdirectory boundaries. Any root architecture or sequence diagrams must match the sync and async boundaries, operation names and storage backends in the child `subtree_index` payloads. Do not invent unverified nodes
   - Write the root `target_filename` with your file-writing tool
4. Final correctness check (CRITICAL): before you finish, check ALL created and changed contract files in the `subtree_index` (including all child package contracts such as `pkg1/${target_filename}` and `pkg2/${target_filename}`). You must read every created or changed contract file. Do not skip any child file. Check:
   - EGM rules and code grounding: the `Interface`, `Invariants` and `Side Effects` sections exist, cite real code symbols, flags and tables from the scout extraction, and contain no guesses or unverified claims
   - Markdown: clean headers, valid tables and correct code block fences
   - Links (CRITICAL): all subdirectory and sibling links use valid relative paths (`./subdir/${target_filename}` or `./subdir/SKILL.md`). Confirm that every linked file exists on the filesystem. Remove or fix any broken relative link
   - Test targets: verification targets match the project's test setup and use valid target syntax (for Bazel, `/...` or `:all`, never `:...`)
5. Optional drift review (CRITICAL): after the check, offer to run a drift report on the new docs. Ask the user (structured question tool if your harness has one, or plain chat):
   - `question`: "Do you want to run the EGM Drift Report on the generated contract updates to check for consistency with the codebase?"
   - `options`: `["(Recommended) Yes, run drift report on modified contracts", "No, skip drift review"]`
   - If the user says yes, run the `egm-drift-report` skill on the changed contracts. It checks both missing code coverage and docs that invent things, by checking every documented method, route, enum, database table and invariant against the local source files. It writes the gaps into the drift report for a human to triage. Note: `egm-drift-report` is mostly used for design documents, but it also works on EGM contracts as a variant
6. Finish successfully

---

## Templates

Before you write any contract file, read the [README templates](references/templates.md) (path is relative to this skill folder). It defines the Component Package (Peanuts), Repository Root (Blueprint or Hay) and Intermediate Blueprint README templates used above
