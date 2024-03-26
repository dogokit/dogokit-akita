# 🐶Dogokit Akita

🐶Dogokit Akita is a full stack app development kit with React, Remix, GraphQL with Domain-Driven Design. With long term support of adaptability and scalability with various other platforms, through monorepo setup with moonrepo.

> The codename "Akita" comes from a Japanese dog breed of large size, originating from the mountains of northern Japan.

## Introduction

Goals and benefits:

- Build web app as fast as possible with pre-built modules
- Encourage web standards with Remix
- Scale complexity and integration with GraphQL
- Ability to support mobile app development with React Native using Expo
- Highly customizable, 100% of the stack can still be changed

## Tech Stack

These are the things used and recommendations, with more focus on things labeled by the 👍 (thumbs up) emoji.

### General

- Browser: Chromium / Google Chrome / Arc Browser / Brave Browser
- Code editor: VS Code / WebStorm / Neovim / Vim
- Terminal emulator: Warp / Alacritty / Kitty / Rio
- Docs: Markdown
- Markup: HTML
- Styling: CSS
- Programming: JavaScript with TypeScript 👍
- Runtime version manager: proto 👍, alternative to nvm / asdf
- Runtime: Bun 👍, alternative to Node.js
  - Package manager: pnpm 👍, alternative to npm
- Monorepo: moonrepo 👍, alternative to Turborepo

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
- UI components: shadcn/ui 👍, Tremor.so UI, Aceternity UI, Radix UI, Ariakit, Ark UI, etc
- UI icons: React Icons, Tabler Icons, Lucide Icons, Remix Icon, etc
- UI component development: Storybook v8
- UI animation: Motion One / Framer Motion

### Backend

- API layer: GraphQL 👍
- GraphQL server: Apollo Server v4 👍
- GraphQL schema generator: Pothos GraphQL 👍 / GraphQL Nexus
- ORM (Object Relational Mapper): Drizzle 👍, alternative to Prisma
- Database / DBMS (Database Management System): PostgreSQL 👍
  - Hosted: Vercel Postgres / Supabase / Tembo.io / Neon.tech
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

### Extra Recommendations

Non-codebase development tools to enhance the workflow.

- Account credentials: Bitwarden / 1Password
- Communication and community: Telegram / Discord
- Business database and MVP builder: Airtable
- Project/product management: Linear
- Launcher: Raycast (macOS)

## References

- [`epicweb-dev/epic-stack`](https://github.com/epicweb-dev/epic-stack)
- [`dev-xo/stripe-stack`](https://github.com/dev-xo/stripe-stack)

