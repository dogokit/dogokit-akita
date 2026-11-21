# Before and after

Each pair shows a common review pattern. All names are made up.

## TDD, not spike

Before:

> This spike records the design only: no code and no child issues filed here.

After:

> This TDD records the design only: no code and no child issues filed here.

## Plain words first

Before:

> `pending/on_hold` transitions to `ready` on scheduler tick when `hold_release_at <= now`.

After:

> An order on hold (`on_hold`) becomes ready to send (`ready`) when its release time passes. A timer checks this.

## One clear behaviour

Before:

> The app creates the cancelled order and also ignores it.

After:

> The app saves the cancelled order as `cancelled`. It never sends this order to the partner.

## One diagram per job

Before: one sequence diagram where the sync job calls the push job.

After: two diagrams. One for the sync job. One for the push job. Add one sentence: "The two jobs run on their own schedules. They only share the `orders` table."

## One term per idea

Before: "compare in parallel", "shadow run", "dual read" in different sections.

After: "side-by-side" everywhere, defined once in Words we use.

## Name the source of a decision

Before:

> Orders that are ready can be cancelled until the partner accepts them.

After:

> Our proposal: allow cancel until the partner accepts the order. The product doc allows cancel only for draft and pending orders.

## Issues in the body

Before:

> PROJ-968 must confirm the payment mapping before launch.

After:

> The payment mapping check must pass before launch.

The issue link goes in Related links.

## Section references

Before:

> See §12.

After:

> See `[12 Bulk upload](#12-bulk-upload)`.

## Too many code links

Before:

> The guard ([a.ts#L10-L40](a.ts)) calls the service ([b.ts#L5-L90](b.ts)), which reads the repository ([c.ts#L1-L60](c.ts)) and queues a job ([d.ts#L20-L50](d.ts)).

After:

> The access guard checks the user, then the service reads the order and queues the send job.

Keep the one or two links the claim truly depends on in Related links.

## Acceptance scenarios as a table

Before: six paragraphs of "the system should..."

After:

| Scenario         | Given                        | When                     | Then                                      |
| :--------------- | :--------------------------- | :----------------------- | :---------------------------------------- |
| Other team       | An order of team B           | A user of team A opens it | `404`, no data shown                     |
| Duplicate submit | An order was already created | The same request repeats | Existing order returned, no second order  |
| Empty list       | A team with no orders        | The list opens           | Empty list, no error                      |
