# 🐶Dogokit Akita

🐶Dogokit Akita is a full stack app development kit with mainly using React, Remix, GraphQL with [Domain-Driven Design](docs/domain-driven-design.md).

Aiming for longer support of adaptability and scalability with various other platforms, through monorepo setup using moonrepo.

Ready to get started? [Read the Setup Guide](guides/setup.md)

Default tech stack:

1. Repo: [moonrepo](docs/moonrepo.md) with [domain-driven design](docs/domain-driven-design.md)
2. Language: [TypeScript](docs/typescript.md)
3. Runtime: [Bun](docs/bun.md)
4. API: [GraphQL](docs/graphql.md) and [Apollo](docs/apollo.md)
5. Framework: [Remix](docs/remix.md) ([Vite](docs/vite.md) & [React Router](docs/react-router.md))
6. UI library: [React](docs/react.md)
7. UI styling: [Tailwind CSS](docs/tailwind.md) with [design system](docs/design-system.md)
8. UI component: [shadcn UI](docs/shadcn-ui.md) [component library](docs/component-library.md)
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
- Highly customizable, 100% of the stack can still be changed

## Tech Stack

Feel free to adjust the tech stack as you need and prefer. These are the complete things that can be used and recommended, with more focus on things labeled by the 👍 (thumbs up) emoji.

### General

- Browser: Chromium / Google Chrome / Arc Browser / Brave Browser
- Code editor: VS Code / WebStorm / Neovim / Vim
- Terminal emulator: Warp / Alacritty / Kitty / Rio
- Docs: Markdown
- Markup: HTML
- Styling: CSS
- Programming: JavaScript with TypeScript 👍
- Runtime version manager: proto 👍, alternative to nvm / asdf
- Runtime: Bun 👍, alternative to Node.js / Deno
  - Package manager: Bun 👍, alternative to npm / yarn / pnpm
- Monorepo: moonrepo 👍, alternative to Turborepo / Nx

### Frontend

- UI library: React v18 👍
  - Optimization: Million.js
- Meta-framework: Remix v2 👍 (React Router v6), alternative to Next.js
  - Bundler: Vite 👍
  - PWA: Vite PWA Plugin for Remix
  - Extension: Remix Forge for VS Code
- GraphQL client: Apollo Client v3 👍
- Auth: Remix Auth / Lucia Auth

### Frontend Styling

- CSS framework: Tailwind CSS v4 👍
- Fonts: Fontsource 👍
- UI components: shadcn/ui 👍, Tremor.so UI, Aceternity UI, Radix UI, Ariakit, Ark UI, Catalyst UI Kit, etc
- UI icons: React Icons, Tabler Icons, Lucide Icons, Remix Icon, etc
- UI component development: Storybook v8
- UI animation: Motion One / Framer Motion

### Backend

- API layer: GraphQL 👍
- GraphQL server: Apollo Server v4 👍
- GraphQL schema generator: Pothos GraphQL 👍 / GraphQL Nexus
- ORM (Object Relational Mapper): Drizzle 👍, alternative to Prisma
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
- Form management: Conform / React Hook Form / Formiz
- Auth utility: Oslo.js, alternative to jsonwebtoken, bcrypt/argon, etc
- Email templating: React Email
- Rich text editor: TipTap
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
- Analytics: Vercel Analytics / Plausible
- Event tracking: LogSnag
- Error tracking: Sentry
- Email service: Resend / Loops.so / Bento
- File upload and storage: Uploadcare / Uploadthing
- GraphQL web client: Apollo Studio with Apollo Sandbox
- Status monitoring: OpenStatus / BetterStack
- Link shortener: Dub.co
- Background jobs: Trigger.dev
- Notification system: Novu
- Meeting scheduler: Cal.com with Google Calendar
- Business dashboard: Retool
- BaaS (Backend as a Service): Directus
- Integration: Alloy Automation / Zapier
- HTTP client: Firecamp / Hoppscotch Postman / Insomnia
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
