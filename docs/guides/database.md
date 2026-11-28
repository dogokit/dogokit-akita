# Database

Follow this if want to run the database in a local container with Docker and Docker Compose.

## Docker

Install and setup Docker on your system.

- On Mac, use [OrbStack](https://orbstack.dev) (recommended) or [Podman](https://podman.io)
- On Linux, install [Docker](https://docs.docker.com/desktop/install/linux-install)
- On Windows, use WSL then install [Podman](https://podman.io), alternative to
  [Docker Desktop](https://docs.docker.com/desktop/install/windows-install)

## Docker Compose

Copy the example file once, then change the values in `.env` if you want your own:

```sh
cp .env.example .env
```

These values matter for the database:

```sh
POSTGRES_USER=change_user
POSTGRES_PASSWORD=change_password
POSTGRES_DB=change_db
POSTGRES_HOST_PORT=5432
DATABASE_URL="postgresql://change_user:change_password@127.0.0.1:5432/change_db"
```

- `POSTGRES_HOST_PORT` is the port on your machine. If you change it, change the port in `DATABASE_URL` too
- Keep the user, password and database in `DATABASE_URL` the same as the `POSTGRES_*` values

Start Docker, then start Postgres in the background. The command waits until the database is ready:

```sh
vp run infra:up
```

To stop it, run `vp run infra:down`. To delete the data too, run `vp run infra:reset`.

The image is Postgres 19. A data folder made by an older major version will not start on it. To keep that data, dump it with `pg_dump` before you upgrade. To start empty, run `vp run infra:reset`.

Older versions of this file mounted the data folder at the wrong path (`/var/lib/postgres`), so their data was never saved to the volume. If you ran that version, dump the database before you switch, since `infra:down` will not keep that data.

## Database Backup and Restore

🚧
