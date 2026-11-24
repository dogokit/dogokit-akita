---
name: egm-drift-report
license: Apache-2.0
disable-model-invocation: true
description: >-
  Runs drift detection on all design documents to check for document and
  code consistency. Produces an actionable report with differences. Use when the
  user asks to detect drift or check for consistency across all design documents
  or READMEs in a directory.
---

# Detect Drift In Designs and Code

Read the harness guide first:

- Codex or ChatGPT Work: [Codex integration](../../docs/codex.md)
- Claude Code or Cowork: [Claude Code integration](../../docs/claude.md)

In this repo the EGM root is `.claude/egm/` (`../../` from here). The `agents/`, `resources/` and `docs/` folders named in this skill are the folders there. Skills run as `/egm-review` and so on, without the `/egm:` prefix

When the user asks to detect drift across all designs or a set of READMEs, find every place where the codebase has moved away from, or failed to build, what those designs or READMEs describe

1. Check the input: check that the user gave a directory with design documents or READMEs. If not, ask the user for the target directory
2. List the documents: list all files in the design directory
3. Analyze: for EACH design document:
   - Understand it: read the design document. Find the intent, the proposed changes, and the specific filenames and symbols it names
   - Find the source: find the matching source code files in the source tree. If paths are not explicit, use code search or grep to find the classes, functions or API endpoints the doc names. Ask the user to add the missing links to the document, so future detection is cheaper
   - Verify: read the current state of those source files
   - Detect drift: compare the design with reality. Look for:
     - Missing features: logic described in the doc but absent from the code
     - Incomplete models: dataclasses, classes, structs or protos that lack fields the design specifies
     - Logic shortcuts: hardcoded values where dynamic logic was planned
     - Architecture differences: the code uses different patterns or libraries than the design proposed
   - Filter: report ONLY the differences. Do not describe what works or what matches. If the code matches the design exactly, write "No drift detected."
4. Report: write one report that lists all discrepancies
   - Append the analysis for each file to `{YYYY-MM-DD}_DRIFT_REPORT.md` with your file-writing tool
   - Strict format:

     ```markdown
     ## <DESIGN_DOC_NAME>

     <Bulleted list of specific divergences found>
     <Or "No drift detected">
     ```

5. Guidance
   - Be rigorous. If a design doc names a specific object, field or file and the code does not have it, that is drift you must report. Check coverage twice. If some part of the logic is not referenced in any design or README, that is also drift you must report
   - Read files freely, so you look at the current state of the code and do not rely on memory
   - Process the files one at a time, so the tool output buffer does not overflow
