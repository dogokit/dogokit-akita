# Scripts

This guide explains each script in `package.json`. Run one with `bun run <name>`, such as `bun run check`

## Naming

The script names use a prefix to group them:

- No prefix: code quality, such as `check`, `format` and `lint`
- `infra:`: Docker Compose for the database. `infra:test:` is for the ephemeral test stack
- `server:`: checks for the server Compose file

## Code quality

| Script         | What it does                                             | When to use it                      |
| -------------- | -------------------------------------------------------- | ----------------------------------- |
| `check`        | Runs `format:check`, `lint` and `lint:md` in that order  | Before you finish, and in CI        |
| `format`       | Formats the files with Oxfmt and saves them              | To fix formatting                   |
| `format:check` | Checks formatting with Oxfmt and changes no files        | Inside `check`                      |
| `lint`         | Lints with Oxlint. Warnings fail too (`--deny-warnings`) | Inside `check`                      |
| `lint:md`      | Lints every Markdown file with markdownlint              | Inside `check`                      |
| `check:links`  | Checks links in the Markdown files in the root folder    | By hand, since it needs the network |

`check` stops at the first failing step. To see every problem from one tool, run that tool alone, such as `bun run lint`.

## Local database

These scripts use `docker-compose.yml`. Use them for development. See the [Database](database.md) guide.

| Script        | What it does                                                  |
| ------------- | ------------------------------------------------------------- |
| `infra:up`    | Starts Postgres in the background and waits until it is ready |
| `infra:down`  | Stops Postgres and keeps the data                             |
| `infra:logs`  | Shows the Postgres logs. Press Ctrl+C to stop                 |
| `infra:reset` | Stops Postgres and deletes the data                           |

`infra:reset` deletes the data for good. Use it only when you want an empty database.

## Ephemeral test database

These scripts add `docker-compose.ephemeral.yml` to `docker-compose.yml`. The data lives in memory and is gone after `infra:test:down`. See the [Environments](environments.md) guide.

| Script            | What it does                                                    |
| ----------------- | --------------------------------------------------------------- |
| `infra:test:up`   | Starts a fresh Postgres and waits until it is ready             |
| `infra:test:port` | Prints the random host port of Postgres, for the `DATABASE_URL` |
| `infra:test:logs` | Shows the Postgres logs                                         |
| `infra:test:down` | Stops Postgres and deletes its data                             |

Always run `infra:test:down` at the end, even when the tests fail.

## Server

| Script          | What it does                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `server:config` | Checks `docker-compose.server.yml` with `.env.example`. It prints nothing when the file is valid |

This script checks the file only. It does not start anything. Use real values on the server, not `.env.example`.

## Other

| Script            | What it does                                                 |
| ----------------- | ------------------------------------------------------------ |
| `generate:secret` | Prints a random 32-byte string, such as for `SESSION_SECRET` |

## Not defined yet

Some guides mention these scripts. This repo does not define them yet. Add them to your app's `package.json` when you need them:

- `dev`, `build` and `start`, for the app itself
- `db:push`, `db:seed`, `db:generate` and other `db:*` scripts, for Drizzle or Prisma
