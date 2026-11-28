---
name: write-design-docs
description: 'Use when creating or revising a TDD, spike, plan or integration doc in docs/technical-design/, docs/spikes/, docs/plans/ or docs/integrations/, or when an implementation PR changes a feature that has a TDD.'
---

# Writing Technical Design Docs (TDD)

Plain wording and layout: [`human-friendly`](../human-friendly/SKILL.md) and [`tdd-the-barramundi`](../tdd-the-barramundi/SKILL.md). Follow the repo's `AGENTS.md` and `CLAUDE.md` for anything else.

## Before you write

- The product doc is the authority. If the TDD changes a scope item, metric, default or open question in it, add a decision row with the proposal, the owner and the approval. Otherwise label it "proposal, not approved". Never drop scope silently.
- Verify every "today the code does X" claim on the current `main`. Grep, read, and cite the symbol (for example `OrderService.updateOrderStatus`). Check side effects of reused methods, roles and guards, config names, and job or queue wiring. Say whether the design replaces, keeps or builds on each existing path.
- Vendor facts come from the official source. Copy field names, endpoints, enums, error codes, required flags and version floors exactly, and cite them. Label behaviour you did not run as "unverified". If the documented payload lacks a field the design needs, mark that decision blocked.
- Scope is the ticket's current use case. Drop features with no consumer today. Move out-of-scope flows to a separate doc.

## Required sections

Open with a metadata table: status, revision and date (bump on every revision), ticket links, epic, parent TDD. Issue keys go only in this table, with their links, never in the body. Then:

1. Problem and proposal.
2. Terminology. Define every acronym and term once.
3. Current and proposed behaviour. Symbol citations and state diagrams where they help.
4. Data model. The ER diagram shows the same unique keys and indexes as the tables.
5. Contract. For each parameter, state required or defaulted, whether it can change after create, and the exact rejection status. Also state the empty-result response, and the enum values with their source path.
6. Risks.
7. Open questions. Numbered, each with an owner. No "may" or "decide at implementation" for a product rule.
8. Verification. Given/when/then pass/fail checks for the happy path, failure and auth cases, boundary values, duplicate delivery, fallback paths, and one concrete rollback step.
9. Rollout. New env vars (in the example env file and the secrets store), migrations, deploy order.

Mark a section that depends on an unapproved ticket "re-check when <KEY> is approved".

## Citations and evidence

- In committed docs, cite file paths and symbols, not line numbers. Line numbers drift. Line numbers are fine in chat and review comments.
- Point at the source file instead of copying SQL or code into the doc.
- Every relative link resolves from the doc's own folder at this head. Do not link outside the repo, to gitignored files, or to uncommitted files.
- Write the text about the design, not about the ticket sequence.
- Match the wording to the evidence: "can be applied" for steps not yet run; "estimate" for sample-based figures; fixed dates and the filter and denominator for every count or percentage; a date on time-sensitive claims. Before you call an irreversible action safe, list the checks you ran and the checks you did not run.
- Redact: no personal emails, account IDs or real client IDs. Use an obviously fake ID such as `00000000-0000-4000-8000-000000000001`. Get infra sign-off before you commit IPs, host names or monitoring endpoints.

## After every revision

Re-read the whole doc and make every section state one current rule: diagrams, code samples, error tables, acceptance rows, metadata, counts, go-live gates, open-question lists and companion docs. Typical drift:

- Inclusive bounds in one section, half-open ranges in another.
- A signing input described one way in one place and another way elsewhere.
- An endpoint with no matching requirement, permission or test.
- A removed status code still in a table.
- A verdict that names a different number of open items than the section lists.

## Implementation PRs

When a PR changes the schema, an index, status transitions, error codes, job schedule, column types or the response shape of a feature that has a TDD in `docs/technical-design/`, update that TDD's tables and examples in the same PR or in a linked one.

## Integration docs (`docs/integrations/`)

- Check each statement (status mapping, eligibility rules, cancellation rule, field mapping, summary table) against the current code. Update it in the same PR as the code. Name known gaps instead of overstating what ships.
- Keep a test plan to the behaviour this project owns. Point to the unit spec for cases it already covers. Summary counts equal the section sums. List env vars and URLs for local, testing and production.

## Before you push

- Run the project checks (`vp run check`). Fix what they report.
- Check the relative links in the changed doc resolve:

```bash
f=docs/technical-design/<file>.md
grep -oE '\]\([^)#]+' "$f" | cut -c3- | grep -vE '^[a-z]+:' | sort -u | while read -r p; do [ -e "$(dirname "$f")/$p" ] || echo "BROKEN $p"; done
```

- Plain Markdown only, no HTML for alignment.
- After a script pads or reformats a table, diff the rows to confirm no cell lost content.
