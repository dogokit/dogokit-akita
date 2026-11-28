<div align="center">
	<h1 align="center">🐶Dogokit Akita</h1>
  <p align="center">
    <span>Full Stack App Development Kit</span>
    <br />
    <a href="https://allnimal.com/dogokit/akita">Docs</a>
    <span> · <span>
    <a href="#tech-stack">Tech Stack</a>
    <span> · <span>
    <a href="docs/guides/start.md">Getting Started</a>
  </p>
</div>

> [!NOTE]
> This repo is docs only. It is a curated list of tools, stack choices, and guides.
>
> Example implementations will be tagged `akita-1` and so on, kept apart from this repo.

## Goal

🐶Dogokit Akita is an opinionated full stack app kit.
It mostly uses JavaScript and TypeScript, with Bun, a SQL database, and more.
Use it as a guide to build web apps that scale well.

- Default frontend web with React and Tailwind CSS
- Optional frontend web alternatives
- Optional full-stack web frameworks
- Optional backend API
- Optional database ORM
- Optional mobile

## Benefits

- Build a website or web app fast, with pre-built modules
- Use rich UI components and templates
- Customize the tech stack and defaults, without 3rd party services
- Deploy anywhere, with no vendor lock-in
- Develop with a better AI workflow
- Show what the JavaScript developer experience (DX) can do, as an alternative to PHP with Laravel, Ruby with Rails, or Python with Django

## Features

### Primary

- Frontend: UI/UX, web, mobile
- Backend: API, logic
- Database: store data
- Security: protect data
- Auth: sign up/in/out, role
- Storage: upload/download files
- Payments: get paid
- Analytics: track usage
- Notifications: email, push

### Details

#### UI/UX

- Landing Page That Converts
  - Call to Action (CTA)
- Responsive UI Design and Components
  - Lightweight Animation
  - WYSIWYG Editor (what you see is what you get)
  - Theme and Dark Mode
  - Optimistic UI: show a change before the server confirms it
  - Command Palette/Bar
  - Keyboard Shortcuts
- Accessibility (a11y)
- Internationalization (i18n) and Localization (l10n)

#### App Features

- Web Analytics
- SEO (Search Engine Optimization) and Meta Tags
- SSR (Server-Side Rendering)
- Form Handling on Client and Server
- Pagination on Client and Server
- User and Admin Dashboard/Panel
- Assets Management with File/Image Upload on Cloudflare R2
- Email Templates, Notifications, Marketing, and Verification
- Payment Gateway with Billing, Subscriptions, and Invoices
- Blog and Release Notes
- Error Monitoring with Sentry
- Timezone and Date/Time Picker
- Code Generator/Scaffolder

#### Accounts and Access

- User Management: register, log in, onboard, edit profile, invite users, log out
- Authentication (AuthN): confirm who the user is
- Authorization (AuthZ): confirm what the user may do
- Social Login with OAuth
- Organization and Team Management
- Role-Based Access Control (RBAC): access by role, such as admin or member
- Attribute-Based Access Control (ABAC): access by user, resource, or context, such as team or time
- Relationship-Based Access Control (ReBAC): access by a link to a resource, such as owner, editor, or viewer of a document

#### Engineering

- Type-Safe CRUD (Create, Read, Update, Delete)
- Environment Variables for Local, Staging, and Production
- Deployment with Docker and Docker Compose
- Database and ORM: read and write data through typed code
- Migrations and Backups: change the schema safely and restore data when needed
- Cron and Automation: run repeatable tasks on a schedule, such as daily reports or cleanup
- Queue and Background Jobs: run long tasks outside the request, with workers and retries
- Webhooks: send or receive HTTP calls when an event happens, such as a paid invoice
- Idempotency: make a repeated request or retry do the work only once
- Rate Limiting: cap how many requests a user or IP can send
- Caching: keep hot data close to make reads fast
- Feature Flags: turn features on or off without a new deploy
- Observability: logs, metrics, and traces to see what the app does
- Health Checks: tell the host or load balancer that the app is up
- Audit Logs: record who did what and when

#### AI

- AI Workflow Rules
- AI Management and Agent Configuration
- AI Harness
- AI Skills
- AI Orchestration

## Tech Stack

### Core Stack

The main defaults.

- General: TypeScript, Bun, Docker
- Frontend: React, Tailwind CSS
- Backend: Hono, tRPC
- Database: SQL, ORM
- Mobile: React Native with Expo, Uniwind

### Default Application Stack

- Language: [TypeScript](stacks/typescript.md) + [JavaScript](stacks/javascript.md) + [HTML](stacks/html.md) + [CSS](stacks/css.md)
- Runtime & Package Manager: [Bun](stacks/bun.md)
- Toolchain: [Vite+](stacks/vite-plus.md), one `vp` CLI and one `vite.config.ts`
- Format and Lint: [Oxfmt](stacks/oxfmt.md) + [Oxlint](stacks/oxc.md), through Vite+
- Bundler: [Vite](stacks/vite.md)
- Frontend Library: [React](stacks/react.md)
- Styling: [Tailwind CSS](stacks/tailwind.md) + [shadcn/ui](stacks/shadcn-ui.md) + [UI SDK](stacks/ui-sdk.md) + [unplugin-icons](stacks/unplugin-icons.md) + [Tiptap](stacks/tiptap.md)
- Data Validation: [Zod](stacks/zod.md)
- Form Handling: [Conform](stacks/conform.md)
- Backend API Framework: [Hono](stacks/hono.md) + [tRPC](stacks/trpc.md) or [oRPC](stacks/orpc.md)
- Database (DBMS): [PostgreSQL](stacks/postgresql.md)
- Database Clients: [psql](stacks/postgresql.md) / [TablePlus](stacks/tableplus.md)
- Database ORM: [Prisma](stacks/prisma.md)
- Auth and RBAC: [Better Auth](stacks/better-auth.md) / [Permit.io](stacks/permit-io.md) / [ZenStack](stacks/zenstack.md)
- Container: [Docker](stacks/docker.md) + [Docker Compose](stacks/docker-compose.md) with [OrbStack](stacks/orbstack.md) / [Colima](stacks/colima.md) / [Kiri](stacks/kiri.md) / [Docker Desktop](stacks/docker-desktop.md)
- Email: [Resend](stacks/resend.md) + [React Email](stacks/react-email.md)
- File Upload: [Uploadcare](stacks/uploadcare.md) or [Cloudflare R2](stacks/cloudflare-r2.md)
- Testing: [Vitest](stacks/vitest.md) + [Testing Library](stacks/testing-library.md) + [Playwright](stacks/playwright.md) + [Storybook](stacks/storybook.md) + [MSW](stacks/msw.md)
- Payment: [Polar](stacks/polar.md)
- Security: [Arcjet](stacks/arcjet.md)
- Image Optimization: [Unpic](stacks/unpic.md)
- Documentation: [Fumadocs](stacks/fumadocs.md)

### Development Tools

- Terminal: [Ghostty](stacks/ghostty.md) / [Rex](stacks/rex.md)
- Secrets and Environment Variables: [Infisical](stacks/infisical.md) / [Doppler](stacks/doppler.md)
- Code Editor / Integrated Development Environment (IDE): [Cursor](stacks/cursor.md) / [Zed](stacks/zed.md) / [NeoVim](stacks/neovim.md)
- Agentic Development Environments (ADE): [Orca](stacks/orca.md) / [T3 Code](stacks/t3-code.md) / [Paseo](https://paseo.sh) / [Amp Code](stacks/ampcode.md) / [Herdr](stacks/herdr.md) / [Delta](stacks/delta.md)

### AI Workflows

- AI Model: [Claude by Anthropic](stacks/claude.md) / [GPT by OpenAI](stacks/gpt.md) / [Gemini by Google](stacks/gemini.md)
- AI Agent Framework: [Mastra](stacks/mastra.md) / [Agent Native](stacks/agent-native.md)
- AI Engineering Workflow: [Matt Pocock skills](stacks/mattpocock.md) / [Addy Osmani agent-skills](stacks/addyosmani.md) / [pstack](stacks/pstack.md)
- AI Design Review: [Elephant-Goldfish Model (EGM)](stacks/egm.md)
- AI Code Review: [Gitar](stacks/gitar.md)
- AI Code Generator: [v0 by Vercel](stacks/v0.md)
- AI Context: [Context7](stacks/context7.md) / [Graphify](stacks/graphify.md)
- AI Database Access: [DBHub](stacks/dbhub.md)
- AI Bots: [Grok Bot](stacks/grok-bot.md)
- AI Misc Tools: [Paradev](stacks/paradev.md)
- AI Computer Use: [agent-desktop](stacks/agent-desktop.md) / [Cua](stacks/cua.md)

### Deployment: PaaS and Services

- General: [Railway](stacks/railway.md) / [Render](stacks/render.md) / [Fly.io](stacks/flyio.md) / [Cloudflare Workers](stacks/cloudflare-workers.md) / [Cloudflare Containers](stacks/cloudflare-containers.md)
- Frontend: [Vercel](stacks/vercel.md) / [Netlify](stacks/netlify.md) / [Cloudflare Pages](stacks/cloudflare-pages.md)
- Database: [Prisma Postgres](stacks/prisma-postgres.md) / [Supabase](stacks/supabase.md) / [Neon](stacks/neon.md)
- Storage: [Cloudflare R2](stacks/cloudflare-r2.md) / [Amazon S3](stacks/amazon-s3.md)
- Self-Host: [Coolify](stacks/coolify.md) / [Dokku](stacks/dokku.md)

### Deployment: Manual Server Deployment

- Cloud: [Amazon Web Services](stacks/amazon-web-services.md) / [Google Cloud](stacks/google-cloud.md)
- VPS: [Amazon Lightsail](stacks/amazon-lightsail.md) / [IONOS](stacks/ionos.md) / [Linode](stacks/linode.md) / [DigitalOcean](stacks/digitalocean.md)
- OS: [Debian](stacks/debian.md) / [Ubuntu](stacks/ubuntu.md)
- Web Server and Proxy: [Caddy](stacks/caddy.md) / [Nginx](stacks/nginx.md)
- SSL/TLS Certificate: [Let's Encrypt](stacks/lets-encrypt.md)
- Automation: [Ansible](stacks/ansible.md) / [Kamal Deploy](stacks/kamal-deploy.md)
- Bare Metal: [Vultr](stacks/vultr.md) / [Scaleway](stacks/scaleway.md) / [Hetzner](stacks/hetzner.md)

### Backend-Only Web Frameworks

- BaaS: [Keel](stacks/keel.md) / [Directus](stacks/directus.md) / [Strapi](stacks/strapi.md) / [Payload](stacks/payload.md) / [PocketBase](stacks/pocketbase.md) / [Supabase](stacks/supabase.md) / [Firebase](stacks/firebase.md)
- [REST API](stacks/rest-api.md): [Hono](stacks/hono.md) with [OpenAPI Swagger](stacks/openapi-swagger.md) generated by [Scalar](stacks/scalar.md)
- [GraphQL](stacks/graphql.md): [Apollo](stacks/apollo.md) / [Pothos](stacks/pothos.md) / [Sofa](stacks/sofa.md)
- JS-Based Fully Featured: [NestJS](stacks/nestjs.md) / [Effect](stacks/effect.md) / [AdonisJS](stacks/adonisjs.md)
- Non-JS: [Fastify](stacks/fastify.md) / [Fiber](stacks/fiber.md) / [Echo](stacks/echo.md)

### Frontend-Included Web Frameworks

- Frontend Framework: [Next.js](stacks/nextjs.md)
- Frontend Library Only: [Vue.js](stacks/vuejs.md) / [Angular](stacks/angular.md) / [SolidJS](stacks/solidjs.md) / [Effect UI](stacks/effect-ui.md)
- Frontend Meta Framework: [Nuxt](stacks/nuxt.md) / [SolidStart](stacks/solidstart.md) / [SvelteKit](stacks/sveltekit.md)
- JS-Based Full Stack: [Remix](stacks/remix.md) / [RedwoodJS](stacks/redwoodjs.md)
- Non-JS Full Stack: [Laravel](stacks/laravel.md) / [Rails](stacks/rails.md) / [Django](stacks/django.md)

### Optional: Workflow and Features

- VCS/SCM: [Git](stacks/git.md)
- Runtime: [Node.js](stacks/nodejs.md) / [Deno](stacks/deno.md)
- Format and Lint: [Oxc/Oxlint](stacks/oxc.md) / [Ultracite](stacks/ultracite.md) / [Prettier](stacks/prettier.md) / [Biome](stacks/biome.md)
- Bundler: [Turbopack](stacks/turbopack.md)
- Monorepo: [moonrepo](stacks/moonrepo.md) with [Changesets](stacks/changesets.md)
- Release: [autorc](stacks/autorc.md)
- Secrets and Environment Variables: [.env](stacks/env.md) / [t3-env](stacks/t3-env.md) / [unplugin-environment](stacks/unplugin-environment.md)
- Utility: [es-toolkit](stacks/es-toolkit.md)
- CLI and Prompt: [Term.Ink](stacks/term-ink.md) / [Clack](stacks/clack.md) / [Commander.js](stacks/commanderjs.md) / [oclif](stacks/oclif.md) / [Inquirer](stacks/inquirer.md)
- Performance: [Million.js](stacks/millionjs.md)
- Search: [Meilisearch](stacks/meilisearch.md) / [Typesense](stacks/typesense.md)
- Process: [Effect](stacks/effect.md)
- Dependency: [Knip](stacks/knip.md)
- Logging: [pino](stacks/pino.md)
- Internationalization (i18n): [Lingui](stacks/lingui.md)
- Accessibility (a11y): [Lighthouse](stacks/lighthouse.md)
- Realtime: [SSE](stacks/sse.md) / [Socket.IO](stacks/socket-io.md) / [Liveblocks](stacks/liveblocks.md) / [InstantDB](stacks/instantdb.md) / [Electric](stacks/electric.md)
- Cache and Message Queues: [Redis](stacks/redis.md) / [KiviDB](stacks/kividb.md) / [BullMQ](stacks/bullmq.md)
- Mobile: [React Native](stacks/react-native.md) with [Expo](stacks/expo.md)
- Storage: Unix File System
- Mailers: SMTP
- Documentation: [Nextra](stacks/nextra.md)
- Package Browser: [npmx](stacks/npmx.md)
- State Machine: [XState](stacks/xstate.md)
- Policy: [Open Policy Agent](stacks/opa.md)
- HTTP Client: [ky](stacks/ky.md) / [Better Fetch](stacks/better-fetch.md)
- Icons: [Kubai Icons](stacks/kubai-icons.md)

### Optional: 3rd Party Services

- Repo: [GitHub](stacks/github.md) / [GitLab](stacks/gitlab.md)
- Database Governance: [Bytebase](stacks/bytebase.md)
- Analytics: [PostHog](stacks/posthog.md) / [Openpanel.dev](stacks/openpanel.md) / [Simple Analytics](stacks/simpleanalytics.md) / [Plausible](stacks/plausible.md)
- Service Monitoring: [OpenStatus](stacks/openstatus.md) / [BetterStack](stacks/betterstack.md)
- File Storage/Upload: [Uploadcare](stacks/uploadcare.md) / [Cloudinary](stacks/cloudinary.md)
- Payment Gateway/MoR: [Polar](stacks/polar.md) / [Stripe](stacks/stripe.md) / [Whop](stacks/whop.md)
- Avatar: [DiceBear](stacks/dicebear.md) / [Gravatar](stacks/gravatar.md)
- Email Transactional: [Amazon SES](stacks/amazon-ses.md) / [Resend](stacks/resend.md) / [PostShiba](stacks/postshiba.md) / [Nodemailer](stacks/nodemailer.md) / [Plunk](stacks/plunk.md)
- Email Marketing/Newsletter: [Loops.so](stacks/loops.md) / [Bento](stacks/bento.md) / [Beehiiv](stacks/beehiiv.md)
- Email Tool: [VerifyRight](stacks/verifyright.md)
- Workflow: [Inngest](stacks/inngest.md)
- APM, Observability, Error Tracking: [Sentry](stacks/sentry.md) + [OpenTelemetry](stacks/opentelemetry.md)
- Auth: [WorkOS](stacks/workos.md) / [Clerk](stacks/clerk.md)
- Business Intelligence (BI): [Metabase](stacks/metabase.md) / [Index.app](stacks/index-app.md)
- Webhook: [Svix](stacks/svix.md)
- Background Jobs: [Quirrel.dev](stacks/quirrel-dev.md) / [Trigger.dev](stacks/trigger-dev.md)
- Link/URL Shortener/Management: [Dub.co](stacks/dub-co.md)
- Full-Text Search: [Meilisearch](stacks/meilisearch.md)
- Notification: [Novu](stacks/novu.md)
- Documentation: [Mintlify](stacks/mintlify.md)
- Automation: [n8n](stacks/n8n.md)
- API Key Management: [Unkey](stacks/unkey.md)
- WhatsApp: [Qontak](stacks/qontak.md) / [Twilio](stacks/twilio.md)
- CI Runners: [Blacksmith](stacks/blacksmith.md)
- Networking: [Tailscale](stacks/tailscale.md)
- Infrastructure as Code: [SST](stacks/sst.md) / [Encore](stacks/encore.md)

### Optional: Work Apps

- Browser: [Chrome](stacks/chrome.md) / [Yab](stacks/yab.md)
- Email: [Gmail](stacks/gmail.md) / [HEY](stacks/hey.md) / [ProtonMail](stacks/protonmail.md) / [Zero Email](stacks/zero-email.md)
- Credentials: [Bitwarden](stacks/bitwarden.md) / [Passbolt](stacks/passbolt.md) / [LastPass](stacks/lastpass.md) / [1Password](stacks/1password.md)
- Dotfiles: [Chezmoi](stacks/chezmoi.md) / [Dotbot](stacks/dotbot.md)
- UI/UX Design: [Figma](stacks/figma.md)
- Communication & Community: [Telegram](stacks/telegram.md) / [Discord](stacks/discord.md) / [X (Twitter)](stacks/x.md)
- CRM: [Attio](stacks/attio.md)
- Business Database & MVP Builder: [Airtable](stacks/airtable.md) / [Baserow](stacks/baserow.md) / [NocoDB](stacks/nocodb.md)
- Product/Project Management: [Linear](stacks/linear.md) / [Plane.so](stacks/plane.md) / [Eververse.ai](stacks/eververse-ai.md) / [Basecamp](stacks/basecamp.md)
- Docs: [Outline](stacks/outline.md) / [Notion](stacks/notion.md)
- Social Media Management: [Buffer](stacks/buffer.md) / [Mixpost](stacks/mixpost.md) / [Postiz](stacks/postiz.md)
- Blog: [Hashnode](stacks/hashnode.md) / [Ghost](stacks/ghost.md)
- Document: [DocuSeal](stacks/docuseal.md) / [Papermark](stacks/papermark.md)
- Launcher: [Raycast](stacks/raycast.md)
- Accounting: [Bigcapital](stacks/bigcapital.md)
- Diagramming: [Mermaid](stacks/mermaid.md) / [LikeC4](stacks/likec4.md) / [IcePanel](stacks/icepanel.md) / [Eraser](stacks/eraser.md) / [UML](stacks/uml.md)

## Guides

- [Getting Started](docs/guides/start.md)
- [Workflow](docs/guides/workflow.md)
- [Environments](docs/guides/environments.md)
- [Scripts](docs/guides/scripts.md)
- [Steps](docs/guides/steps.md)
- [Tech Stack](stacks/tech-stack.md)
- [System Design](docs/guides/system-design.md)
- [Domain-Driven Design](docs/guides/domain-driven-design.md)
- [Database](docs/guides/database.md)
- [Auth](docs/guides/auth.md)
- [OAuth](docs/guides/oauth.md)
- [Assets](docs/guides/assets.md)
- [Social](docs/guides/social.md)
- [Internationalization](docs/guides/internationalization.md)
- [Brand](docs/guides/brand.md)
- [UI Design System](docs/guides/ui-design-system.md)
- [UI Components](docs/guides/ui-components.md)
- [UI Component Library](docs/guides/ui-component-library.md)
- [AI Agent Skills](.claude/skills/README.md)

## Contribute

Read the [contributing guide](.github/CONTRIBUTING.md) before you open a pull request.
Run `bun run check` first.

## Implementations (TBA)

- [Akita 1](https://akita-1.dogokit.com)
- [Akita 2](https://akita-2.dogokit.com)

## Variants

- [Dogokit Akita](https://github.com/dogokit/dogokit-akita)
- [Dogokit Beagle](https://github.com/dogokit/dogokit-beagle)
- [Dogokit Corgi](https://github.com/dogokit/dogokit-corgi)

## References

- [Inspirations](docs/references/inspirations.md)
- [Credits](docs/references/credits.md)
- [System design](docs/references/system-design.md)
