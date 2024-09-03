# 🐶Dogokit Akita

🐶Dogokit Akita is a full stack app development kit with mainly using React, Remix, GraphQL with [Domain-Driven Design](docs/domain-driven-design.md).

> The codename "Akita" comes from a Japanese dog breed of large size, originating from the mountains of northern Japan.

## Goals and Benefits

- Build web app as fast as possible with pre-built modules
- Encourage web standards with Remix
- Scale complexity and integration with GraphQL
- Ready to use React UI components, styled with Tailwind CSS, with the help of shadcn UI and more
- Highly customizable, 100% of the stack and components can be changed, or remove unnecessary parts
- Adaptability and scalability to develop for various other platforms beyond JavaScript and React, moonrepo and proto can help to manage other runtimes and runtimes such as Golang, Rust, Vue, Angular, etc

## Setup to Get Started

Read the [Setup](guides/setup.md)

## Main Structure

```sh
├── apps
│   ├── app-remix
│   ├── api-graphql
│   └── ...
├── packages
│   ├── config
│   ├── database
│   ├── env
│   ├── ui
│   ├── utils
│   └── ...
└── docker-compose.yml
```

## Tech Stack

Read the [Tech Stack](docs/tech-stack.md) and follow the [Domain-Driven Design](docs/domain-driven-design.md), [UI Design System](docs/ui-design-system.md), [UI Component Library](docs/ui-component-library.md)

The only essentials:

1. TypeScript
2. Bun
3. Remix
4. Tailwind CSS
5. Prisma
6. PostgreSQL
7. Docker

The recommendations:

1. Monorepo: [moonrepo](docs/moonrepo.md)
2. Language and runtime: [TypeScript](docs/typescript.md) with [Bun](docs/bun.md)
3. Frontend framework: [Remix](docs/remix.md) ([Vite](docs/vite.md) & [React Router](docs/react-router.md))
4. Backend API framework options:
   - [GraphQL](docs/graphql.md) with [Apollo](docs/apollo.md) and [Pothos](docs/graphql-pothos.md)
   - [REST API](docs/rest-api.md) with [Hono](docs/hono.md) and [OpenAPI Swagger](docs/swagger.md)
   - [tRPC](docs/trpc.md)
5. Auth: [Remix Auth](docs/remix-auth.md) with [Oslo](docs/oslo.md)
6. UI library: [React](docs/react.md)
7. UI styling: [Tailwind CSS](docs/tailwind.md) with [cva](docs/cva.md)
8. UI component: [shadcn UI](docs/shadcn-ui.md) with [Radix UI](docs/radix-ui.md) and more
9. ORM: [Prisma](docs/prisma.md) with [ZenStack](docs/zenstack.md)
10. Database: [PostgreSQL](docs/postgresql.md) on [Neon](docs/neon.md)
11. Container: [Docker](docs/docker.md), especially for local database
12. Analytics: [Simple Analytics](docs/simpleanalytics.md) and [PostHog](docs/posthog.md)
13. Mail: [React Email](docs/react-email.md) with [Plunk](docs/plunk.md) or [Resend](docs/resend.md)
14. Testing: [Vitest](docs/vitest.md) with [Testing Library](docs/testing-library.md) and [Playwright](docs/playwright.md)
15. Environment variables: plain `.env` file with [Infisical](docs/infisical.md)
16. Payment: [Lemon Squeezy](docs/lemonsqueezy.md) or [Polar](docs/polar.md)

## Credits

🐶Dogokit itself is a collection of development kit, templates, tech stack docs, and code marketplace.

Originally created by [M Haidar Hanif](https://github.com/mhaidarhanif) from the 🐾 Allnimal group (🐻 Bearmentor, 🐱 Catamyst, 🐶 Dogokit).

- [🐾 Allnimal](https://allnimal.com)
  - [🐻 Bearmentor](https://bearmentor.com)
  - [🐱 Catamyst](https://catamyst.com)
  - [🐶 Dogokit](https://dogokit.allnimal.com)
