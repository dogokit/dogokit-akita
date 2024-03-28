# Setup GUIDE

## Dependencies

Use [Bun](https://bun.sh), a fast JavaScript all-in-one toolkit, to replace both Node.js/Deno as runtime and npm/yarn/pnpm as package manager. So make sure to [install Bun](https://bun.sh/docs/installation) with either methods:

```sh
curl -fsSL https://bun.sh/install | bash
npm i -g bun
brew install oven-sh/bun/bun
proto install bun
```

To run the app locally, make sure the project's local packages/dependencies are installed:

```sh
bun install
```

## Code Quality

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

## Environment Variables

Create the `.env.local` file from `.env.example`. This is the one for local development, not production

```sh
cp -i .env.example .env.local
```

Configure the required environment variables if on local, otherwise in the project settings on other environments.

If necessary, create the `.env.production` for production access. Adjust accordingly if need for `staging`, `test`, etc. Be careful to change the `APP_MAIN_URL` on different domains and subdomains.

```sh
cp -i .env.example .env.production
```

Required:

- `APP_MAIN_URL`: For example, `http://localhost:3000`
  - There can also be like `APP_ADMIN_URL`
- `API_MAIN_URL`: For example, `http://localhost:4000`
  - There can also be like `API_ADMIN_URL`
- `SESSION_SECRET`: For example, `the_secret_text`. Anything goes, but better to generate a random string using `openssl rand -base64 32` on the terminal or put any long random text.
- `DATABASE_URL`: For example, `postgres://user:password@localhost:5432/dogokit-akita`. Continue to read the Database Setup.

Optional:

- `NODE_ENV`: For example, `development`
- `*_CLIENT_ID` and `*_CLIENT_SECRET`: For OAuth related,
  [check OAuth Guide](guides/oauth.md)

### Database Setup

Drizzle ORM is used to communicate with the database easily. Can replace with query builder such as Kysely if needed or even raw database query.

For the database system itself, either choose to use PostgreSQL or MySQL from local system, Docker container, or hosted services.

If prefer using Docker and Docker Compose for local development, [follow the database guide](guides/database.md).

The app is configured primarily to be deployed using PlanetScale. Because of that, the migration
files are not needed. Therefore, push the schema directly there. The migration process will be
handled through its [deploy requests](https://planetscale.com/docs/concepts/deploy-requests).

This repo template does not recommend MongoDB (document database), although Prisma has a stable
support for it. The database provider can still be changed, and the schema and databaase operations
might need to adapt.

### PostgresQL Database

To start quickly, create a PostgresQL database with either of these:

- Vercel Postgres
- Supabase
- Neon.tech
- Xata.io

## Database Operations

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

Use [`kiliman/shadcn-custom-theme`](https://github.com/kiliman/shadcn-custom-theme) to generate shadcn UI CSS variables with Tailwind CSS colors.

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
