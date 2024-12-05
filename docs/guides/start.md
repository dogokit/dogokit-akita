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

### moon & proto

Install [proto](https://moonrepo.dev/proto) for toolchain versioning:

```sh
curl -fsSL https://moonrepo.dev/install/proto.sh | bash
```

Install [moonrepo](https://moonrepo.dev) for monorepo project management:

```sh
curl -fsSL https://moonrepo.dev/install/moon.sh | bash
# or
proto plugin add moon "https://raw.githubusercontent.com/moonrepo/moon/master/proto-plugin.toml"
proto install moon
```

> Note: moon & proto are not required for the project to run, but they are recommended for efficient project management and toolchain versioning.

### Bun

Use [Bun](https://bun.sh), a fast JavaScript all-in-one toolkit that replace Node.js and npm/yarn/pnpm.

[Install Bun](https://bun.sh/docs/installation) with either methods:

```sh
curl -fsSL https://bun.sh/install | bash
npm i -g bun
brew install oven-sh/bun/bun
proto install bun
```

### Docker

Use [Docker](https://docker.com) for setting up the container, especially for the database.

Install Docker with either methods:

- [OrbStack](https://orbstack.dev) on macOS.
- [Docker Desktop](https://docker.com/products/docker-desktop) or [Podman](https://podman.io) on anywhere else.

## Clone repo

```sh
bunx degit dogokit/dogokit-akita
```

or

```sh
git clone --depth 1 https://github.com/dogokit/dogokit-akita.git <your-project-name>
```

## Install Dependencies

To run the app locally, make sure the project's local packages/dependencies are installed:

```sh
bun install
```

## Check and Fix Code Quality

Log, format, lint to check if the setup is fine:

```sh
bun check
# env typecheck prettier eslint stylelint
```

```sh
bun fix
# prettier eslint stylelint
```

> Note: Can ignore non-critical warning from ESLint and TypeScript

## Setup Environment Variables

Create the `.env.local` file from `.env.example`. This is the one for local development, not production

```sh
cp -i .env.example .env.local
```

Configure the required environment variables if on local, otherwise in the project settings on other environments.

If necessary, create the `.env.production` for production access. Adjust accordingly if need for `staging`, `test`, etc. Be careful to change the `APP_MAIN_URL` on different domains and subdomains.

```sh
cp -i .env.example .env.production
```

Or run the script:

```sh
make setup-env
# cp -i .env.example .env.local
# cp -i .env.example .env.production
```

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

Drizzle ORM is used to communicate with the database easily. Can replace with query builder such as Kysely if needed or even raw database query.

For the database system itself, either choose to use PostgreSQL or MySQL from local system, Docker container, or hosted services.

If prefer using Docker and Docker Compose for local development, [check the database guide](database.md).

The app is configured primarily to be deployed using PlanetScale. Because of that, the migration files are not needed. Therefore, push the schema directly there. The migration process will be handled through its [deploy requests](https://planetscale.com/docs/concepts/deploy-requests).

### PostgresQL Database

To start quickly, create a PostgresQL database with either of these:

- Vercel Postgres
- Supabase
- Neon.tech
- Xata.io

### Database Operations

Sync between Drizzle schema and the database directly:

```sh
bun db:push
# drizzle-kit push
```

> Note: Only need to push the schema in development. No need for migration files.

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
];
```

Then seed the initial data when needed:

```sh
bun db:seed
```

## Build

Check if the build is fine. This als be used to build the app for production.

```sh
bun build
```

Then try to run the app in production mode:

```sh
bun start
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
bun dev
```

## Change the Contents

- Arrange and remove components as needed.
- Find and replace various texts, especially the word "Dogokit" and "Dogokit Akita".

## Change Theme Colors

Use [`kiliman/shadcn-custom-theme`](https://github.com/kiliman/shadcn-custom-theme) to generate shadcn/ui CSS variables with Tailwind CSS colors.

For example:

```sh
bunx shadcn-custom-theme primary=indigo secondary=blue accent=violet gray=neutral
```

## Setup some services

- Image upload with [Uploadcare](https://uploadcare.com)
  - `UPLOADCARE_PUBLIC_KEY`, `UPLOADCARE_SECRET_KEY`
- Transactional email with [Resend](https://resend.com)
  - `RESEND_API_KEY`
- Product analytics with [Posthog](https://posthog.com)
  - `POSTHOG_KEY`

## Subscribe for the status of the services

- [Vercel Status](https://vercel-status.com)
- [PlanetScale Status](https://planetscalestatus.com)
- [Uploadcare Status](https://status.uploadcare.com)
- [Resend Status](https://resend-status.com)
