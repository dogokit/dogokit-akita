---
name: design-docs
description: 'Use when creating or revising a TDD, spike, plan, integration doc or QA test plan in docs/technical-design/, docs/spikes/, docs/plans/ or docs/integrations/, or when an implementation PR changes a feature that has a TDD.'
---

# Writing Technical Design Docs (TDD) and Request for Comment (RFC)

Format: `.claude/rules/writing-markdown.md`. Plain wording: `human-friendly` skill. Schema rules inside a TDD: `writing-migrations-entities` skill.

## Before you write

- **PRD is the authority.** If the TDD changes a PRD scope item, metric definition, default or open item, add a decision row with the proposal, the owner and the PM approval, and cite the PRD open-item number. Otherwise label it "proposal, not approved". Never drop PRD scope silently.
- **Verify every "today the code does X" claim on current `main`.** Grep, read, and cite the symbol (`OrderService.updateOrderStatus`). Check side effects of reused methods, existing roles and guards (`SALES_ROLE_NAME` in `libs/constants/role.constant.ts`), config names, cron and queue wiring, cron cadence and infra names. Say whether the design replaces, keeps or builds on each existing pipeline.
- **Vendor facts come from the official source.** Copy field names, endpoints, enums, error codes, required flags and version floors exactly from the vendor schema or docs and cite them. Label behaviour you did not exercise live as "unverified". If the documented payload lacks a field the design needs, mark that decision blocked.
- **Scope = the ticket's current use case.** Drop features with no consumer today. Move out-of-scope flows (for example inbound webhooks in an outbound-cancel TDD) to a separate doc.

## Required sections

Open with a metadata table: status, revision and date (bump on every revision), ticket, epic, parent TDD. Then:

1. **Problem and proposal.**
2. **Terminology.** Define every acronym and term, for example "today = UTC date captured once per run".
3. **Current and proposed behaviour.** Symbol citations, state diagrams, FE access gates (user, role, client).
4. **Data model.** Follows the `writing-migrations-entities` skill. The ER diagram shows the same unique keys and indexes as the tables. No FK test cases.
5. **Contract.** Follows the `writing-api-endpoints` skill. For each param, state required or defaulted, PATCH mutability and the exact rejection status. Also state the empty-result response, and the enum values with their `*.constant.ts` path.
6. **Risks** in the template format.
7. **Open questions.** Numbered, each with an owner. No "may" or "decide at implementation" for a product rule. Record data gaps and non-default parameters (cache TTL, FX source) here.
8. **Verification.** Given/when/then pass/fail checks for the happy path, auth or HMAC failure, boundary dates, duplicate delivery, fallback and stale paths, plus one concrete rollback step. Siblings: `tdd-gowarehouse-integration-feasibility.md` §9 "Validation plan", `freight-shipment/freight-shipment-management-tdd.md` §3.15 "Testing plan".
9. **Rollout.** New env vars (`.env.example`, secrets for testing, production and ephemeral), migrations, deploy order.

Mark a section that depends on an unapproved ticket "re-check when <KEY> is approved".

## Citations and evidence

- In committed docs, cite file paths and symbols, not line numbers; line numbers drift. Line numbers are fine in chat and review comments.
- Point at the source file instead of copying SQL or code into the doc.
- Every relative link resolves from the doc's own folder at this head. Do not link `../` out of the repo (reference `bundle-frontend` by GitHub URL), to gitignored files (`AGENTS.local.md`) or to uncommitted files.
- Write a Jira key with its title and link, or leave it out: `[BUN-2056](https://wayfindr.atlassian.net/browse/BUN-2056) Airpak ShipNow spike`. A bare key means nothing to a reader. Write the text about the design, not about the ticket sequence.
- Match the wording to the evidence: "can be applied" for steps not yet run; "estimate" for sample-based figures; fixed dates and the filter and denominator for every count or percentage; a date on time-sensitive claims (token expiry, PR status). Before you call an irreversible action safe, list the checks you ran and the checks you did not run.
- Redact: no personal emails, account IDs or real client UUIDs (use an obviously fake UUID such as `00000000-0000-4000-8000-000000000001`). Get infra sign-off before you commit egress IPs, NAT IDs, RDS hosts or monitoring endpoints.

## After every revision

Re-read the whole doc and make every section state one current rule: diagrams, code samples, error tables, acceptance rows, metadata, counts, go-live gates, open-question lists and companion docs. Typical drift:

- Inclusive bounds in one section, half-open `[from, to)` UTC in another.
- HMAC over `JSON.stringify(request.body)` in one place, `request.rawBody` in another.
- An endpoint with no matching requirement, permission or test.
- A removed status code (for example a stale 409) still in a table.
- A verdict that names a different number of open items than the section lists.

## Implementation PRs

When a PR changes the schema, an index, status transitions, error codes, cron cadence, column types or the response shape of a feature that has a TDD in `docs/technical-design/`, update that TDD's tables and examples in the same PR or in a linked one.

## Integration docs and test plans (`docs/integrations/**`)

- Check each statement (status mapping, polling eligibility, cancellation rule, field mapping, summary table, decision row) against current code and the order status guards. Update it in the same PR as the code. Name known gaps instead of overstating what ships.
- In `test-plan.md`, include only Bundle behaviour. Drop provider-side validation and cases a unit spec already covers, and point to that spec. Link the Epic Ticket field to the client integration epic, or write `-`. Summary counts equal the section sums. List env vars and URLs for local, testing and production.

## Before you push

```bash
npx prettier --write <changed .md files>   # npm run format covers apps/ and libs/ TypeScript only
f=docs/technical-design/<file>.md
grep -oE '\]\([^)#]+' "$f" | cut -c3- | grep -vE '^[a-z]+:' | sort -u | while read -r p; do [ -e "$(dirname "$f")/$p" ] || echo "BROKEN $p"; done
```

- Plain Markdown only, no HTML for alignment.
- After a script pads or reformats a table, diff the rows to confirm no cell lost content.
