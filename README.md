# 🐶Dogokit Akita

🐶Dogokit Akita is a full stack app development kit with mainly using React, Remix, GraphQL with [Domain-Driven Design](docs/domain-driven-design.md).

Aiming for longer support of adaptability and scalability with various other platforms, through monorepo setup using moonrepo.

Ready to get started? [Read the Setup Guide](guides/setup.md)

Default configuration:

1. Pattern: [Domain-Driven Design](docs/domain-driven-design.md)
2. Repo: [moonrepo](docs/moonrepo.md)
3. Language and runtime: [TypeScript](docs/typescript.md) on [Bun](docs/bun.md)
4. Frontend Framework: [Remix](docs/remix.md) ([Vite](docs/vite.md & [React Router](docs/react-router.md))
5. UI library: [React](docs/react.md)
6. UI styling: [Tailwind CSS](docs/tailwind.md) with [cva](docs/cva.md) and [design system](docs/design-system.md)
7. UI component: [shadcn UI](docs/shadcn-ui.md) [component library](docs/component-library.md)
8. API: [GraphQL](docs/graphql.md), [Apollo](docs/apollo.md), [Pothos](docs/graphql-pothos.md)
9. ORM: [Drizzle](docs/drizzle.md)
10. Database: [PostgreSQL](docs/postgresql.md)
11. Container: [Docker](docs/docker.md)
12. Testing: [Vitest](docs/vitest.md) and [Playwright](docs/playwright.md)

[Check the inspirations](docs/inspirations.md)

> The codename "Akita" comes from a Japanese dog breed of large size, originating from the mountains of northern Japan.

🐶Dogokit is a collection of development kit, templates, tech stack docs, and code marketplace

## Introduction

Goals and benefits:

- Build web app as fast as possible with pre-built modules
- Encourage web standards with Remix
- Scale complexity and integration with GraphQL
- Ready to use React UI components, styled with Tailwind CSS, with the help of shadcn UI and more
- Ability to develop beyond JavaScript and React, moonrepo can help to manage other runtimes and runtimes such as Golang, Rust, Vue, Angular, etc
- Later support mobile app development with React Native using Expo
- Highly customizable, 100% of the stack can still be changed or remove unnecessary parts

## Tech Stack

Feel free to adjust the tech stack as you need and prefer. These are the complete things that can be used and recommended, with more focus on things labeled by the 👍 (thumbs up) emoji.

### General

- Browser: Chromium / Google Chrome / Arc Browser / Brave Browser
- Code editor: [VS Code](docs/vscode.md) / WebStorm / Neovim / Vim
- Terminal emulator: Warp / Alacritty / Kitty / Rio
- Links: [Markdown](docs/markdown.md)
- Markup: [HTML](docs/html.md)
- Styling: [CSS](docs/css.md)
- Programming: [JavaScript](docs/javascript.md) with [TypeScript](docs/typescript.md) 👍
- Runtime version manager: [proto](docs/proto.md) 👍, alternative to nvm / asdf
- Runtime: [Bun](docs/bun.md) 👍, alternative to [Node.js](docs/nodejs.md) / [Deno](docs/deno.md) / WinterJS
  - Package manager: [Bun](docs/bun.md) 👍, alternative to [npm](docs/npm.md) / [yarn](docs/yarn.md) / [pnpm](docs/pnpm.md)
- Monorepo: [moonrepo](docs/moonrepo.md) 👍, alternative to [Turborepo](docs/turborepo.md) / [Nx](docs/nx.md)

### Frontend

- UI library: [React](docs/react.md) v18 👍
  - Optimization: [Million.js](docs/millionjs.md)
- Meta-framework: [Remix](docs/remix.md) v2 👍 ([React Router](docs/react-router.md) v6), alternative to [Next.js](docs/nextjs.md)
  - Bundler: [Vite](docs/vite.md) 👍
  - PWA: Vite PWA Plugin for Remix
  - Extension: Remix Forge for VS Code
- GraphQL client: [Apollo Client](docs/apollo.md) v3 👍
- Auth: [Lucia Auth](docs/lucia-auth.md) / [Remix Auth](docs/remix-auth.md)

### Frontend Styling

- CSS framework: [Tailwind CSS](docs/tailwind.md) v4 👍
- Variants: [Class Variance Authority (cva)](docs/cva.md) 👍
- Fonts: [Fontsource](docs/fontsource.md) 👍
- UI components: [shadcn/ui](docs/shadcn-ui.md) 👍, [Radix UI](docs/radix-ui.md), Tremor.so UI, Aceternity UI, Ariakit, Ark UI, Catalyst UI Kit, etc
- UI icons: [React Icons](docs/react-icons.md), Tabler Icons, Lucide Icons, Remix Icon, etc
- UI component development: [Storybook](docs/storybook.md) v8
- UI interaction and animation: [Motion One](docs/motion-one.md) / Framer Motion / Pragmatic drag and drop / React Native Skia / Rive

### Backend

- API layer: [GraphQL](docs/graphql.md) 👍
- GraphQL server: [Apollo Server](docs/apollo.md) v4 👍
- GraphQL schema generator: [Pothos GraphQL](docs/graphql-pothos.md) 👍 / [GraphQL Nexus](docs/graphql-nexus.md)
- ORM (Object Relational Mapper): [Drizzle](docs/drizzle.md) 👍, alternative to [Prisma](docs/prisma.md)
- Database / DBMS (Database Management System): PostgreSQL 👍
  - Hosted: Vercel Postgres / Supabase / Xata.io / Neon.tech / Tembo.io
  - Utility: Snaplet
- Key-value store: Redis
  - Hosted: Upstash

### Auth

- Password with email or username
- Email OTP
- Phone OTP
- GitHub Account
- Google Account
- Facebook Account

### Utilities

- Toolchain: Biome
  - Formatter: Prettier
  - Linter: ESLint
  - Performance linter: Million Lint for React
- Containerization: Docker 👍, Docker Compose with Docker Rollout
  - Mac-only: OrbStack
- Data validation: Zod
- Unique ID: nanoid
- Form management: Conform / React Hook Form / Formiz
- Auth utility: Oslo.js, alternative to jsonwebtoken, bcrypt/argon, etc
- Email templating: React Email
- Rich text editor: TipTap, BlockNote, Yjs
- Security scan: Snyk, SonarCloud
- Search utility: Fuse.js v7
- Upgrade packages: Taze
- Find unused stuffs: Knip

### Testing

- Test runner: Vitest
- Functional testing: React Testing Library
- E2E testing: Playwright
- Mock test: Mock Service Worker (MSW)
- GraphQL test: EasyGraphQLTester

### Services

- Repository: GitHub
- Domain and DNS: Cloudflare
- Secret credentials: Doppler
- Frontend deployment: Vercel / Netlify
- Backend deployment: Render.com / Railway.app
- HTTP client: Firecamp / Hoppscotch / Insomnia / Postman / HTTPie
- GraphQL web client: Apollo Studio with Apollo Sandbox
- Analytics: Vercel Analytics / Plausible
- Event tracking: LogSnag
- Error tracking: Sentry
- Email service: Resend / Loops.so / Bento
- File upload and storage: Uploadcare / Uploadthing
- Status monitoring: OpenStatus / BetterStack
- Link shortener: Dub.co
- Background jobs: Trigger.dev
- Notification system: Novu
- Meeting scheduler: Cal.com with Google Calendar
- Realtime and collaboration: Replicache
- BaaS (Backend as a Service): Directus
- Business dashboard and internal tool: Refine / Retool
- Integration: Alloy Automation / Zapier
- Payment gateway:
  - International: Stripe / Lemonsqueezy
  - Indonesia: Xendit / Midtrans

### 3D

- Three.js for 3D models
  - React Three Fiber
- Spline

### CLI

- Ink, React for CLI

### Mobile

- React Native
  - Expo

### Desktop

- Tauri / Neutralinojs

### AI / ML / LLM

- AI SDK: Vercel AI SDK
- OpenAI
- Mistral AI

### Extra

- `@uidotdev/usehooks`
- `date-fns` / `dayjs`
- `remix-typedjson`
- `remix-utils`
- `undici`
- `usehooks-ts`

### Workflow Recommendations

Non-codebase development tools to enhance the workflow, development, and learning process.

- Account credentials: Bitwarden / 1Password
- Communication and community: Telegram / Discord / X
- Business database and MVP builder: Airtable
- Project/product management: Linear
- Launcher: Raycast (macOS)

## Credits

Originally created by [@mhaidarhanif](https://github.com/mhaidarhanif) in 2024, from the 🐾 Allnimal group (🐻 Bearmentor, 🐱 Catamyst, 🐶 Dogokit)

- [🐾 Allnimal](https://allnimal.com)
  - [🐻 Bearmentor](https://bearmentor.com)
  - [🐱 Catamyst](https://catamyst.com)
  - [🐶 Dogokit](https://dogokit.allnimal.com)

2024 ©️ 🐶 Dogokit
