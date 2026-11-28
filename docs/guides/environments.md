# Environments

This guide says which Docker Compose setup to use for each environment

## Recommendation

Use one Compose file per way of running, not one file per environment name

- Many environments run the same way. Dev, staging, UAT and production all run long-lived servers, so they share one file and differ only by their `.env` file
- Make a new file only when the way of running changes, such as "throw away the data after each run"
- Name each file after the one trait that sets it apart from `docker-compose.yml`, such as `ephemeral` (data is thrown away after each run) or `server` (runs on a server and restarts on its own). Never name a file after an environment, such as `prod` or `staging`

| Environment                     | How it runs                          | Files                                                 | Command                                         |
| ------------------------------- | ------------------------------------ | ----------------------------------------------------- | ----------------------------------------------- |
| Local development               | On your machine, data kept           | `docker-compose.yml`                                  | `vp run infra:up`                               |
| Ephemeral integration test      | Fresh each run, data in memory       | `docker-compose.yml` + `docker-compose.ephemeral.yml` | `vp run infra:test:up`                          |
| Shared dev, staging, production | On a server, data kept, auto restart | `docker-compose.server.yml`                           | See [below](#shared-dev-staging-and-production) |

Other options, and why they are not the default:

- One file per environment (`docker-compose.dev.yml`, `docker-compose.staging.yml`, and so on): the files drift apart, and a fix in one is missed in the others
- [Profiles](https://docs.docker.com/compose/how-tos/profiles/) only: good to turn on extra tools, such as a database UI, but they cannot change a service's ports or volumes
- [Testcontainers](https://testcontainers.com): starts containers from test code. Good when each test file needs its own database. It adds a library, and the test setup no longer matches the Compose file

## Local development

`docker-compose.yml` reads `.env`, so copy the example file once before you start. Without it, Compose stops with "env file .env not found":

```sh
cp .env.example .env
vp run infra:up
```

Change the `change_*` values in `.env` if you want your own. Git ignores `.env`.

## Ephemeral integration tests

`docker-compose.ephemeral.yml` adds to `docker-compose.yml`. It needs Docker Compose 2.24.4 or later, for the `!reset` and `!override` tags. Check with `docker compose version`. It changes the database so that:

- Data lives in memory (`tmpfs`) and is gone after `down`
- The host port is random, so it never clashes with your dev database
- It uses fixed test values, so it does not need a `.env` file
- `--wait` waits until the health check passes, so tests do not start too early

```sh
vp run infra:test:up
vp run infra:test:port
# The test values are fixed in docker-compose.ephemeral.yml
DATABASE_URL="postgresql://test:test@127.0.0.1:<port>/test"
# Run the tests
vp run infra:test:down
```

In CI, give each run its own project name, so parallel runs do not share containers. Set it once for the whole job, not on one command. `infra:test:port` and `infra:test:down` need the same name, or they look for the default stack and leave yours running:

```sh
export COMPOSE_PROJECT_NAME=<project>-<run-id>
vp run infra:test:up
# Run the tests
vp run infra:test:down
```

In GitHub Actions, set `COMPOSE_PROJECT_NAME` under `env:` at the job level

Always run `infra:test:down` at the end, even when the tests fail. In GitHub Actions, use `if: always()` on that step

## Shared dev, staging and production

Use `docker-compose.server.yml` on each server. It has no default values. Compose stops with an error when a value is missing

Compose looks for each value in this order:

1. The shell, such as variables set by your secrets tool or CI
2. The file you pass with `--env-file`
3. Without `--env-file`, the `.env` file in the project folder

Always pass `--env-file` on a server. Otherwise a dev `.env` left there is used without a warning

Pass the same file twice: to `--env-file` for Postgres and the `DATABASE_URL` value, and to `API_ENV_FILE` so the api container reads every app variable from it

```sh
# From a file
API_ENV_FILE=.env.staging docker compose -f docker-compose.server.yml --env-file .env.staging up -d
# From the shell
export POSTGRES_PASSWORD="..."
API_ENV_FILE=.env.production docker compose -f docker-compose.server.yml --env-file .env.production up -d
```

The api reads only the file named by `API_ENV_FILE`. Shell-only values reach Postgres but not the api, so put app variables in that file

To give the api a value that comes from the Compose setup, not the file, add it under `environment` in `docker-compose.server.yml`

Keep real secrets out of Git. See the secrets tools in the [README](../../README.md#development-tools)

## Links

- [Docker - Merge Compose files](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/)
- [Docker Compose](../../stacks/docker-compose.md)
- [Database](database.md)
