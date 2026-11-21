---
name: tdd-the-barramundi
description: Writes or simplifies a Technical Design Document (TDD) for any purpose (backend, frontend, infra, a decision, or an investigation) in plain English that a new engineer, PM, or ops reader can follow, with Mermaid diagrams chosen to fit each question (state, activity, sequence, flowchart, ER, class, journey, gantt and more). Use when the user invokes /tdd-the-barramundi, or asks to write, draft, simplify, or make a TDD readable.
disable-model-invocation: true
---

# TDD the Barramundi

Read [`human-friendly`](../human-friendly/SKILL.md) before writing any text a person will read. Use plain words for a reader new to the topic. Keep commands, paths, issue keys, numbers and dates exact.

Write a TDD that a new team member can read once and understand. Keep only what is needed.

For the repo's own rules on where design docs live and which sections are required, also follow [`design-docs`](../design-docs/SKILL.md). This skill adds the plain-language, diagram, and cut rules.

## Who reads this

The reader is a new engineer, a PM, ops, or a reviewer from another team. The reader is not an AI agent. They must understand the problem and the proposal from the first screen.

## Pick the type first

Always include the core sections from [template.md](template.md). Add only the optional sections that fit the type.

| Type          | Usually add                                                       |
| ------------- | ----------------------------------------------------------------- |
| Backend       | data model, API, states, jobs, errors and retries                 |
| Frontend      | user interface, user flows, API contract used, feature flags      |
| Infra         | architecture, cost, monitoring, deployment and rollback           |
| Decision      | alternatives, trade-offs, the decision, consequences (keep short) |
| Investigation | findings, root cause, fix, what is still unknown                  |

## Workflow

1. Gather the product doc, related issues and discussions, and decisions already made
2. For code topics, read the real code paths before you describe them. Cite `path:line` only where a claim depends on it
3. Copy [template.md](template.md). Keep the core sections. Add optional sections only when this type needs them
4. Add diagrams. For each one, decide which question it answers, then pick the type from "Pick the diagram"
5. Run the cut pass, then the self-check
6. Save where the user asks. Default: `docs/technical-design/[<domain>/]tdd-<slug>.md`

## Plain-language rules

These build on `human-friendly`.

- Write the plain meaning first, then the code value: "an order waiting for approval (`pending_approval`)"
- Use one term per idea. Define it once in "Words we use". List only terms the doc uses
- Give each case one clear behaviour. Never say a thing is "created in one place and ignored in another"
- Say where each decision comes from: the product doc, a team decision, or "our proposal"
- Mark what is confirmed and what is not. Never tick an item without evidence
- Keep scope wording exact. Say "web only" if only web is covered, not "web and mobile"
- Keep separate jobs, systems and states separate. Do not merge them in one sentence or diagram
- Never include secrets, credentials, customer names or private URLs
- Call the document a TDD or design. An investigation is a root-cause write-up. A decision is a decision record

## Index rules (data model)

When a TDD proposes a database index:

- Index for performance. List each index with the query it serves and why it is needed (a slow lookup, sort or poll)
- Mark each index row `performance` or `unique`. A unique index must name the race or rule it protects. Drop any row that is neither
- Say where each business rule is enforced: in the database (constraint, unique index) or in the app (service check, upsert, lock), and why

## Keep references light

- Issues: do not name issue keys in the body. Describe the work ("the payment webhook check"). Put issue links in the metadata table and Related links. Use a key in the body only when the reader must track that exact issue, such as a blocking dependency
- Code: describe behaviour in words first. Link code only when a claim depends on it. Soft limit: 5 to 8 code links in the whole doc, collected in Related links. Paste code only when its shape is the point, such as an API payload or a config diff
- Other links: link the product doc and main design pages once, in the metadata table

## Section references

Always give the number and the heading, as a link: `see [6 State machine](#6-state-machine)`. Never write "see §6" or "section 6" alone.

## Diagram rules

Use Mermaid. Add a diagram only when it replaces a paragraph. A flowchart is not the default: pick the diagram that matches the reader's question.

### Pick the diagram

| The reader asks…                                                    | Diagram                         | Notes                                                                 |
| ------------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------- |
| What states can this thing be in, and how does it move?             | `stateDiagram-v2`               | One thing (an order, a job) over its life. Use `<<choice>>`, `<<fork>>`, `<<join>>` and composite states when needed |
| What are the steps, with decisions, loops and parallel work?        | `flowchart TD` (activity)       | See "Activity diagram" below                                          |
| Who does what, in what order, between systems?                      | `sequenceDiagram` (one per job) | Use `alt`, `opt`, `loop`, `par`, `critical` for branches and retries  |
| Which systems exist and how do they connect?                        | `flowchart TD`                  | Group with `subgraph`, for example one per service or trust boundary  |
| What are the tables and how do they relate?                         | `erDiagram`                     | Add the column and index tables beside it                             |
| What are the types or DTOs and how do they depend on each other?    | `classDiagram`                  | Only when the code shape is the point. Prefer `erDiagram` for stored data |
| What does the user go through?                                      | `journey`                       | Frontend or ops flows. Use sparingly                                  |
| What is the rollout order and timing?                               | `gantt` or `timeline`           | Real dates only                                                       |
| How do the ideas in a decision or investigation group?              | `mindmap`                       | Short                                                                 |
| How do branches or releases relate?                                 | `gitGraph`                      | Release or backport explanations                                      |
| Where does the effort or value split?                               | `pie` or `quadrantChart`        | Only for a real trade-off                                             |

Combine types when one diagram would mix jobs. One or two diagrams that carry the design are enough.

### Activity diagram

Use `flowchart TD` with these conventions so it reads like a UML activity diagram:

| UML element       | Mermaid                                                         |
| ----------------- | --------------------------------------------------------------- |
| Start             | `Start([Start])`                                                |
| End               | `Done([End])`                                                   |
| Action            | `Step[Short verb phrase]`                                       |
| Decision or merge | `Check{Question?}` with labelled edges `-->\|yes\|`, `-->\|no\|` |
| Fork and join     | Edges from one node to several, then back to one join node      |
| Swimlane          | `subgraph Lane1["Client"] ... end`, one lane per actor or service |
| Loop              | An edge back to an earlier node, labelled with the retry condition |
| Error exit        | A separate end node, named for the outcome                      |

### Rules for every diagram

- Every state named in the text appears in the state diagram
- Keep each diagram to about 12 nodes. Split larger ones
- Draw top to bottom. Use `flowchart TD`, never `LR`. Add `direction TB` in `stateDiagram-v2` and `classDiagram`. Keep a `sequenceDiagram` to about 5 participants
- No spaces in node IDs. Quote labels with special characters. No colours or `click`
- Do not use reserved words (`end`, `graph`, `subgraph`) as IDs
- Prefer stable types that GitHub renders. Avoid `-beta` and `C4*` types unless the user asks
- Name the diagram in one sentence above it, so the reader knows what to look for
- One question per diagram

## Cut pass

- Delete empty or "N/A" optional sections. Leave no placeholder headings
- Target length: about 150 to 400 lines, depending on type. Move deep detail to linked docs
- Remove repeated conclusions, filler, speculation, unused terms, and UI trivia that changes no design decision
- Split long paragraphs into bullets when listing constraints or scope

## Self-check

- Summary answers what, for whom, and why, in 3 to 5 sentences
- One term per idea. One behaviour per case
- Each diagram uses the type that fits its question, not a flowchart by default
- States have a diagram. Each new state maps to its old status, if old statuses exist
- The doc matches the product doc, or says "our proposal"
- No issue keys in the body without need. Code links are within budget
- Every section reference includes its heading
- The metadata table and the acceptance scenarios table exist
- No unconfirmed item is ticked
- Every index names the query it serves and its reason
- Every link resolves

See [examples.md](examples.md) for before and after rewrites.
