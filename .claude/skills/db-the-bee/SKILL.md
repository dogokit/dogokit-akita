---
name: db-the-bee
description: Prepares copy-paste SQL and explicit row or column values for direct database work, with preflight, change and verify scripts. The agent never runs the queries. Use when the user invokes /db-the-bee, asks for manual SQL, preflight or verify scripts, or says they will run SQL themselves.
disable-model-invocation: true
---

# DB the Bee

Helper for direct database changes (not migrations, not app code). You clarify the task, then print SQL and full values. The human runs everything.

Read [`human-friendly`](../human-friendly/SKILL.md) before writing the short prose around the SQL blocks.

## Hard rules

- Output: SQL fences and full row values (a table or column list). One line like "Run this on the database you named" is enough prose
- **Never run** SQL, shell, database CLIs, migrations, seeders, or HTTP calls. Do not imply the agent will run anything
- **Do not invent** IDs, secrets, or JSON the human did not give. Ask, or use placeholders until they answer
- Secrets: never put credentials in committed repo files. Values from chat may appear in the printed SQL for copy-paste only
- Smallest safe change: one logical operation. Use a transaction when several writes must succeed together
- Schema: if columns or types are unclear, read the ORM schema (for example `prisma/schema.prisma`), entity files or migrations only to name columns. Do not run SQL to explore

## Workflow

1. Gather enough context (ask if needed)
2. Print full row values
3. Print preflight SELECTs
4. Print change script
5. Print verify SELECTs
6. Print optional follow-up (if any)

### 1. Ask first

Stop until you have enough to write safe SQL. Ask only what applies:

| Topic       | Examples                                                    |
| ----------- | ----------------------------------------------------------- |
| Database    | Which database or schema, by the name the human uses        |
| Operation   | Check (SELECT), INSERT, UPDATE, DELETE, multi-step          |
| Target      | Tables, and how rows are found (primary key, natural key, JSON path) |
| Values      | Every column written, or "unchanged"                        |
| Environment | Local, staging, production                                  |
| Guardrails  | Rows that must not be touched                               |
| Later step  | A separate script now, or "do not run now"                  |

Separate databases, no cross-database SQL. When the app uses more than one database, print one script per database and say which database each block runs on. If a task needs both sides, print two labelled queries and say how to match them (for example by UUID).

### 2. Print in this order

1. Full row values: every column that will be inserted or updated. Use literals, `gen_random_uuid()` or `NOW()` where it fits
2. Preflight: read-only SELECTs for duplicates, missing parents, or wrong state. Tell the human to stop if results look wrong
3. Change script: the writes. Wrap them in `BEGIN` … `COMMIT` when one failure must roll back the rest
4. Verify: SELECTs that show the rows after the change
5. Optional follow-up: a second script for later (for example turn on a flag). Label it Do not run now when that is the intent

After the human answers, print concrete SQL. Leave no placeholders unless they chose to keep one.

Every SELECT you hand over has a `WHERE` clause and a `LIMIT`.

## Template (placeholders for this skill file only)

```sql
-- Preflight: run first, stop if the count is not 1
SELECT id, status FROM <table> WHERE id = '<id>' LIMIT 5;

-- Change
BEGIN;
UPDATE <table> SET <column> = '<value>', updated_at = NOW() WHERE id = '<id>';
COMMIT;

-- Verify
SELECT id, <column>, updated_at FROM <table> WHERE id = '<id>' LIMIT 5;
```

## Out of scope

- Agent or CI running SQL
- Delivering the change through repo migrations or seeders (use the normal implementation flow)
- Domain runbooks inside this skill file
