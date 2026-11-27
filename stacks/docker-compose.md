# Docker Compose

Docker Compose runs several containers from one YAML file

This repo has three Compose files:

- `docker-compose.yml`: local development
- `docker-compose.test.yml`: ephemeral integration tests, added on top of `docker-compose.yml`
- `docker-compose.prod.yml`: shared dev, staging and production

See the [Environments](../docs/guides/environments.md) guide for which one to use

Links:

- [Docker Compose Docs](https://docs.docker.com/compose/)
