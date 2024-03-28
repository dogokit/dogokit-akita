# Database

Follow this if want to run the database in a local container with Docker and Docker Compose.

## Docker

Install and setup Docker on your system.

- On Mac, use [OrbStack](https://orbstack.dev) (recommended) or [Podman](https://podman.io)
- On Linux, install [Docker](https://docs.docker.com/desktop/install/linux-install)
- On Windows, use WSL then install [Podman](https://podman.io), alternative to
  [Docker Desktop](https://docs.docker.com/desktop/install/windows-install)

## Docker Compose

Setup `.env` to contain these and change them as needed:

```sh
POSTGRES_ROOT_PASSWORD=the_root_password
POSTGRES_USER=the_user
POSTGRES_PASSWORD=the_password
POSTGRES_DATABASE=bandungdev
POSTGRES_HOST_PORT=5432
POSTGRES_CONTAINER_PORT=5432
```

Start Docker service.

Run Docker Compose up.

```sh
docker-compose up
```

If everything is fine, exit and run it again in detached mode.

```sh
docker-compose up -d
```

Push the schema to it.

```sh
bun db:push
```

Seed initial data

```sh
bun db:seed
```

## Database Backup and Restore

🚧
