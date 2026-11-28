# Start

Let's get started.

## Project Structure

The main structure of the project is mostly like this:

```sh
├── apps/
│   ├── web/
│   └── api/
├── packages/
│   ├── config/
│   ├── database/
│   ├── ui/
│   └── utils/
├── docs/
├── docker-compose.yml
└── README.md
```

The possiblity of the project structure is endless.

```sh
├── apps/
│   ├── web/
│   ├── admin/
│   ├── graphql/
│   └── rest-api/
```

## Prerequisites

### Vite+

Use [Vite+](https://viteplus.dev) and its `vp` CLI to run every command in this repo. See the [Vite+](../../stacks/vite-plus.md) stack note.

Install `vp` once per machine:

```sh
curl -fsSL https://vite.plus | bash
```

`vp` works with any package manager. npm, pnpm, Yarn and Bun are all equal choices. This repo picks Bun in `packageManager` in `package.json`, and `vp` uses it for you. You do not need to install Bun first.

[`vp env`](https://viteplus.dev/guide/env) manages the whole JavaScript setup: one Node.js runtime and one package manager. To see what it picked, run:

```sh
vp env current
```

Common commands:

- `vp install`: install the packages
- `vp add <package>`: add a package. Use `vp add -D <package>` for a dev dependency
- `vp run <script>`: run a `package.json` script, such as `vp run check`. `vpr <script>` is the short form
- `vp dlx <package>`: run a package without installing it

### Docker

Use [Docker](https://docker.com) for setting up the container, especially for the database.

Install Docker with either methods:

- [OrbStack](https://orbstack.dev) on macOS.
- [Docker Desktop](https://docker.com/products/docker-desktop) or [Podman](https://podman.io) on anywhere else.

## Clone repo

```sh
vp dlx degit dogokit/dogokit-akita
```

or

```sh
git clone --depth 1 https://github.com/dogokit/dogokit-akita.git <your-project-name>
```

## Install Dependencies

To run the app locally, make sure the project's local packages/dependencies are installed:

```sh
vp install
```

## Check and Fix Code Quality

Log, format, lint to check if the setup is fine:

```sh
vp run check
# env typecheck prettier eslint stylelint
```

```sh
vp run fix
# prettier eslint stylelint
```

> Note: Can ignore non-critical warning from ESLint and TypeScript

## Setup Environment Variables

Create a `.env.local` file for local development, not production. Configure the required environment variables if on local, otherwise in the project settings on other environments.

If necessary, create a `.env.production` for production access. Adjust accordingly if need for `staging`, `test`, etc. Be careful to change the `APP_MAIN_URL` on different domains and subdomains.

Client/Frontend/Application:

- `MAIN_CLIENT_URL`: For example, `http://localhost:3000`
- `ADMIN_CLIENT_URL` is also possible

Server/Backend/API:

- `MAIN_SERVER_URL`: For example, `http://localhost:4000`

Database:

- `DATABASE_URL`: For example, `postgres://user:password@localhost:5432/dogokit-akita`. Continue to read the Database Setup.

Auth:

- `SESSION_SECRET`: For example, `the_secret_text`. Anything goes, but better to generate a random string using `openssl rand -base64 32` on the terminal or put any long random text.

OAuth:

- `*_CLIENT_ID`
- `*_CLIENT_SECRET`

[Check the OAuth Guide](oauth.md)

## Database Setup

Prisma ORM is used to communicate with the database. Use raw SQL for queries that Prisma cannot do easily.

The database is PostgreSQL. Run it from a local system, a Docker container, or a hosted service.

If prefer using Docker and Docker Compose for local development, [check the database guide](database.md).

Schema changes use Prisma Migrate. It is not set up in this repo yet, so follow the steps in [Database Operations](#database-operations) when you add it.

### PostgreSQL Database

To start quickly, create a PostgreSQL database with either of these:

- Vercel Postgres
- Supabase
- Xata.io

### Database Operations

Use Prisma Migrate to change the schema. This repo does not define `db:migrate` yet, so add it to your app's `package.json` when you set up Prisma:

```sh
vp run db:migrate
# prisma migrate dev
```

> Note: Migrate writes migration files into the repo. Commit them with the schema change, so every environment runs the same steps

Create `users.ts` in the `credentials` folder with the format below. Can focus on certain users who want to be able to access in development, so it doesn't have to be everyone.

```ts
export const dataUsers = [
  {
    username: "example",
    fullname: "Example User",
    nickname: "Sample",
    email: "example@example.com",
    password: "exampleexample",
    roleSymbol: "ROOT",
  },
]
```

Then seed the initial data when needed. Like `db:migrate`, this script is not in this repo yet:

```sh
vp run db:seed
```

## Build

Check if the build is fine. This als be used to build the app for production.

```sh
vp run build
```

Then try to run the app in production mode:

```sh
vp run start
```

Then pick a host to deploy it to, such as:

- Vercel
- Netlify
- Fly.io
- Render.com
- Railway.app
- Google Cloud
- Amazon Web Services
- Microsoft Azure

## Development

Finally, develop the app while running the development server:

```sh
vp run dev
```

## Change the Contents

- Arrange and remove components as needed.
- Find and replace various texts, especially the word "Dogokit" and "Dogokit Akita".

## Setup some services

- Image upload with [Uploadcare](https://uploadcare.com)
  - `UPLOADCARE_PUBLIC_KEY`, `UPLOADCARE_SECRET_KEY`
- Transactional email with [Resend](https://resend.com)
  - `RESEND_API_KEY`
- Product analytics with [Posthog](https://posthog.com)
  - `POSTHOG_KEY`

## Subscribe for the status of the services

- [Vercel Status](https://vercel-status.com)
- [Uploadcare Status](https://status.uploadcare.com)
- [Resend Status](https://resend-status.com)
