# Docker Compose

Docker Compose runs several containers from one YAML file

This repo has three Compose files:

- `docker-compose.yml`: local development
- `docker-compose.test.yml`: ephemeral integration tests, added on top of `docker-compose.yml`
- `docker-compose.prod.yml`: shared dev, staging and production

See the [Environments](../docs/guides/environments.md) guide for which one to use

Links:

- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Compose file reference: services](https://docs.docker.com/reference/compose-file/services/)
- [Compose project name](https://docs.docker.com/compose/how-tos/project-name/)
- [Merge multiple Compose files](https://docs.docker.com/compose/how-tos/multiple-compose-files/merge/)
- [docker compose exec](https://docs.docker.com/reference/cli/docker/compose/exec/)

## Container names

This repo does not set [`container_name`](https://docs.docker.com/reference/compose-file/services/#container_name). Compose names each container after the project, such as `<project>-postgres-1`.

A fixed `container_name` is unique on the whole Docker host:

- Two stacks with the same name cannot run at once, such as dev and tests
- CI runs and worktrees would clash too

Compose keeps stacks apart by [project name](https://docs.docker.com/compose/how-tos/project-name/) instead. Set `COMPOSE_PROJECT_NAME` to run several stacks at once.

Use [`docker compose exec postgres`](https://docs.docker.com/reference/cli/docker/compose/exec/) instead of `docker exec <name>`.

On a server that still has an old `container_name`, the next `up` creates a new container under the new name. Check this before you deploy.
