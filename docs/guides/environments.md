# Environments

This guide says which Docker Compose setup to use for each environment

## Recommendation

Use one Compose file per way of running, not one file per environment name

- Many environments run the same way. Dev, staging and production all run long-lived servers, so they share one file and differ only by their `.env` file
- Make a new file only when the way of running changes, such as "throw away the data after each run"

| Environment                     | How it runs                          | Files                                            | Command                                         |
| ------------------------------- | ------------------------------------ | ------------------------------------------------ | ----------------------------------------------- |
| Local development               | On your machine, data kept           | `docker-compose.yml`                             | `bun run setup-db`                              |
| Ephemeral integration test      | Fresh each run, data in memory       | `docker-compose.yml` + `docker-compose.test.yml` | `bun run test:infra:up`                         |
| Shared dev, staging, production | On a server, data kept, auto restart | `docker-compose.prod.yml`                        | See [below](#shared-dev-staging-and-production) |
| Preview per pull request        | Fresh per pull request               | Same as the ephemeral test                       | Set `COMPOSE_PROJECT_NAME`                      |

Other options, and why they are not the default:

- One file per environment (`docker-compose.dev.yml`, `docker-compose.staging.yml`, and so on): the files drift apart, and a fix in one is missed in the others
- [Profiles](https://docs.docker.com/compose/how-tos/profiles/) only: good to turn on extra tools, such as a database UI, but they cannot change a service's ports or volumes
- [Testcontainers](https://testcontainers.com): starts containers from test code. Good when each test file needs its own database. It adds a library, and the test setup no longer matches the Compose file

## Ephemeral integration tests

`docker-compose.test.yml` adds to `docker-compose.yml`. It changes the database so that:

- Data lives in memory (`tmpfs`) and is gone after `down`
- The host port is random, so it never clashes with your dev database
- It uses fixed test values, so it does not need a `.env` file
- `--wait` waits until the health check passes, so tests do not start too early

```sh
bun run test:infra:up
docker compose -f docker-compose.yml -f docker-compose.test.yml port postgres 5432
# Point DATABASE_URL at that port, run the tests
bun run test:infra:down
```

In CI, give each run its own project name, so parallel runs do not share containers:

```sh
COMPOSE_PROJECT_NAME=akita-test-$GITHUB_RUN_ID bun run test:infra:up
```

Always run `test:infra:down` at the end, even when the tests fail. In GitHub Actions, use `if: always()` on that step

## Shared dev, staging and production

Use `docker-compose.prod.yml` with a different env file for each server:

```sh
docker compose -f docker-compose.prod.yml --env-file .env.staging up -d
docker compose -f docker-compose.prod.yml --env-file .env.production up -d
```

Keep real secrets out of Git. See [Doppler](../../stacks/doppler.md), [Infisical](../../stacks/infisical.md) or [dotenvx](../../stacks/dotenvx.md)

## Links

- [Merge Compose files](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/)
- [Docker Compose](../../stacks/docker-compose.md)
- [Database](database.md)
