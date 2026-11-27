# Docker Compose

Docker Compose runs several containers from one YAML file

This repo needs only three Compose files, listed in [File names](#file-names). They cover every environment, because there are only three ways to run the stack. See the [Environments](../docs/guides/environments.md) guide for which one to use

Links:

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Compose file reference: services](https://docs.docker.com/reference/compose-file/services/)
- [Compose project name](https://docs.docker.com/compose/how-tos/project-name/)
- [Merge multiple Compose files](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/)
- [docker compose exec](https://docs.docker.com/reference/cli/docker/compose/exec/)

## File names

Name a Compose file after how the stack runs, not after the environment that uses it

| File                           | How it runs                          | Used by                              |
| ------------------------------ | ------------------------------------ | ------------------------------------ |
| `docker-compose.yml`           | On your machine, data kept           | Local development                    |
| `docker-compose.ephemeral.yml` | Fresh each run, data in memory       | Integration tests, PR previews       |
| `docker-compose.server.yml`    | On a server, data kept, auto restart | Shared dev, staging, UAT, production |

- `docker-compose.ephemeral.yml` is not used alone. It adds to `docker-compose.yml`
- Staging and production run the same way, so they share `docker-compose.server.yml`. The env file tells them apart, such as `--env-file .env.staging`
- Do not add `docker-compose.prod.yml` or `docker-compose.staging.yml`. Two files for the same way of running drift apart, and a fix in one is missed in the other
- Add a new file only when the way of running changes

### UAT

UAT (user acceptance testing) does not need its own file, such as `docker-compose.integration.yml` or `docker-compose.uat.yml`. It runs the same way as staging: on a server, with data kept, so testers can come back to their work. Use `docker-compose.server.yml` with its own env file:

```sh
docker compose -f docker-compose.server.yml --env-file .env.uat up -d
```

- Integration tests are different from UAT. They throw the data away after each run, so they use `docker-compose.ephemeral.yml`
- Give UAT its own database and secrets in `.env.uat`. Never point it at production data
- If UAT and staging run on the same server, give each its own project name, such as `-p myapp-uat`. Otherwise they share containers and the database volume

## Project name

Compose uses the project name as a prefix for containers, networks and volumes. Two stacks with the same project name share those resources, so one run can stop another run's containers.

`docker-compose.ephemeral.yml` sets the name like this:

```yaml
name: ${COMPOSE_PROJECT_NAME:-dogokit-akita-test}
```

- With `COMPOSE_PROJECT_NAME` set, Compose uses that value
- Without it, Compose uses `dogokit-akita-test`
- `:-` also falls back when the value is empty. `${VAR-default}` only falls back when the variable is unset

In CI, set a unique value for each run, such as `COMPOSE_PROJECT_NAME=<project>-<run-id>`, where the run ID comes from your CI system, such as a run or build number. See the [Environments](../docs/guides/environments.md) guide.

## Container names

This repo does not set [`container_name`](https://docs.docker.com/reference/compose-file/services/#container_name). Compose names each container after the project, such as `<project>-postgres-1`.

A fixed `container_name` is unique on the whole Docker host:

- Two stacks with the same name cannot run at once, such as dev and tests
- CI runs and worktrees would clash too

Compose keeps stacks apart by [project name](https://docs.docker.com/compose/how-tos/project-name/) instead. Set `COMPOSE_PROJECT_NAME` to run several stacks at once.

Use [`docker compose exec postgres`](https://docs.docker.com/reference/cli/docker/compose/exec/) instead of `docker exec <name>`.

On a server that still has an old `container_name`, the next `up` creates a new container under the new name. Check this before you deploy.

## Variables

Only make a value a variable when someone may really need to change it. A variable that must always hold the same value adds a setting that can only break things

- `POSTGRES_HOST_PORT` is a variable. It is the port on your machine, and you may need another one when 5432 is already taken
- The container port is not a variable. Postgres always listens on 5432 inside its container, so the files write `5432` directly. A `POSTGRES_CONTAINER_PORT` set to any other value would point Compose at a port where nothing listens
- `docker-compose.server.yml` publishes no Postgres port at all. The api reaches Postgres over the Compose network at `postgres:5432`, so a host port would only open the database to the network
- `docker-compose.yml` binds the port to `127.0.0.1`, so only your own machine can reach the dev database. Without it, Docker listens on every network interface, and other devices on the same Wi-Fi could try to log in
- `DATABASE_URL` uses a different host in each place. On your machine it is `127.0.0.1`. On a server the api runs in a container, where `127.0.0.1` is the container itself, so it uses the service name `postgres`
- The test values in `docker-compose.ephemeral.yml` (`test`, `test`, `test`) are fixed on purpose. The database is thrown away after each run, so the values protect nothing, and fixed values mean tests need no `.env` file
