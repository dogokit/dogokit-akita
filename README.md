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

Read the [Tech Stack](docs/tech-stack.md) with ready to use [Domain-Driven Design](docs/domain-driven-design.md), [UI Design System](docs/ui-design-system.md), and [Component Library](docs/ui-component-library.md)

Default configuration:

1. Monorepo: [moonrepo](docs/moonrepo.md)
2. Environment variables: [Doppler](docs/doppler.md)
3. Language and runtime: [TypeScript](docs/typescript.md) with [Bun](docs/bun.md)
4. Frontend Framework: [Remix](docs/remix.md) ([Vite](docs/vite.md & [React Router](docs/react-router.md))
5. Auth: [Lucia Auth](docs/lucia-auth.md)
6. UI library: [React](docs/react.md)
7. UI styling: [Tailwind CSS](docs/tailwind.md) with [cva](docs/cva.md)
8. UI component: [shadcn UI](docs/shadcn-ui.md) with [Radix UI](docs/radix-ui.md) and more
9. API: [GraphQL](docs/graphql.md), [Apollo](docs/apollo.md), [Pothos](docs/graphql-pothos.md)
10. Database: [PostgreSQL](docs/postgresql.md) on [Neon](docs/neon.md)
11. ORM: [Drizzle](docs/drizzle.md)
12. Container: [Docker](docs/docker.md)
13. Mail: [Resend](docs/resend.md)
14. Payment: [Lemon Squeezy](docs/lemonsqueezy.md)
15. Testing: [Vitest](docs/vitest.md), [Testing Library](docs/testing-library.md), and [Playwright](docs/playwright.md)

## Credits

🐶Dogokit itself is a collection of development kit, templates, tech stack docs, and code marketplace.

Originally created by [M Haidar Hanif](https://github.com/mhaidarhanif) from the 🐾 Allnimal group (🐻 Bearmentor, 🐱 Catamyst, 🐶 Dogokit).

- [🐾 Allnimal](https://allnimal.com)
  - [🐻 Bearmentor](https://bearmentor.com)
  - [🐱 Catamyst](https://catamyst.com)
  - [🐶 Dogokit](https://dogokit.allnimal.com)
