# Tech Stack Considerations

Feel free to adjust the tech stack as you need and prefer.

These are the complete things that can be used and recommended, with more focus on things labeled by the 👍 (thumbs up) emoji.

## General

- Browser: Chromium / Google Chrome / Arc Browser / Brave Browser
- Code editor: [VS Code](vscode.md) / [Cursor](cursor.md) / WebStorm / Neovim
- Terminal emulator: Kitty / Alacritty / iTerm / Warp / Hyper
- Links: [Markdown](markdown.md)
- Markup: [HTML](html.md)
- Styling: [CSS](css.md)
- Programming: [JavaScript](javascript.md) with [TypeScript](typescript.md) 👍
- Runtime version manager: [proto](proto.md) 👍, alternative to nvm / asdf
- Runtime: [Bun](bun.md) 👍, alternative to [Node.js](nodejs.md) / [Deno](deno.md)
  - Package manager: [Bun](bun.md) 👍, alternative to [npm](npm.md) / [yarn](yarn.md) / [pnpm](pnpm.md)
- Monorepo: [moonrepo](moonrepo.md) 👍, alternative to [Turborepo](turborepo.md) / [Nx](nx.md)

## Frontend

- UI library: [React](react.md) v18/v19 👍
  - Optimization: [Million.js](millionjs.md)
- Meta-framework: [Remix](remix.md) v2 👍 ([React Router](react-router.md) v6), alternative to [Next.js](nextjs.md)
  - Bundler: [Vite](vite.md) 👍
  - PWA: Vite PWA Plugin for Remix
  - Extension: Remix Forge for VS Code
- GraphQL client: [Apollo Client](apollo.md) v3 👍
- Auth: [Remix Auth](remix-auth.md) / [Lucia Auth](lucia-auth.md)

## Frontend Styling

- CSS framework: [Tailwind CSS](tailwind.md) v4 👍
- Fonts: [Fontsource](fontsource.md) 👍
- UI components: [shadcn/ui](shadcn-ui.md) 👍, [Radix UI](radix-ui.md), SyntaxUI, Tremor.so, Aceternity UI, React Aria, Ariakit, Ark UI, Catalyst UI Kit, etc
- UI development: [Storybook](storybook.md) v8
- UI variants: [Class Variance Authority (cva)](cva.md) 👍
- UI [icons](icons.md): React Icons, Lucide, Tabler Icons, Remix Icon, etc
- UI interaction and animation with various [motion library](motion-library.md): Motion One / Framer Motion / React Native Skia / Rive

## Backend

- API layer: [GraphQL](graphql.md) 👍, alternative to [REST API](rest-api.md)
- API server: [Apollo Server](apollo.md) v4 👍
- Schema generator: [Pothos GraphQL](graphql-pothos.md) 👍 / [GraphQL Nexus](graphql-nexus.md)
- ORM (Object Relational Mapper): [Prisma](prisma.md) 👍, alternative to [Drizzle](drizzle.md)
- Database / DBMS (Database Management System): PostgreSQL 👍
  - Hosted: Vercel Postgres / Supabase / Xata.io / Neon.tech / Tembo.io
  - Utility: Snaplet
- Key-value store: Redis
  - Hosted: Upstash

## Auth

- Password with email or username
- Email OTP
- Phone OTP
- GitHub Account
- Google Account
- Facebook Account

## Utilities

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

## Testing

- Test runner: Vitest
- Functional testing: React Testing Library
- E2E testing: Playwright
- Mock test: Mock Service Worker (MSW)
- GraphQL test: EasyGraphQLTester

## Services

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
- File upload and storage: Uploadcare / Uploadthing / Uppy
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
  - International: [Lemon Squeezy](lemonsqueezy.md) / [Stripe](stripe.md)
  - Indonesia: Xendit / Midtrans

## 3D

- Three.js for 3D models
  - React Three Fiber
- Spline

## CLI

- Ink, React for CLI

## Mobile

- React Native
  - Expo

## Desktop

- Tauri / Neutralinojs

## AI / ML / LLM

- AI SDK: Vercel AI SDK
- OpenAI
- Mistral AI

## Extra

- `@uidotdev/usehooks`
- `date-fns` / `dayjs`
- `remix-typedjson`
- `remix-utils`
- `undici`
- `usehooks-ts`
