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
> This project is currently documentation only. It is a curated reference of tools, stack choices and guides. It contains no implementation of the features listed below (auth, payments, storage, etc.). The only code is a minimal example in `index.ts` that shows the project runs. Treat the content as notes and recommendations to build from.
>
> Example implementation releases will be named/tagged as `akita-1`, `akita-2`, and so on, separated from this repo.

## Goal

🐶Dogokit Akita is a comprehensive and opinionated full stack application development kit. Encompassing JavaScript/TypeScript, Node.js/Deno/Bun, and more. It serves as a versatile reference for constructing robust web applications, that can scale from zero to millions of users.

- Default frontend web with React and Tailwind CSS
- Optional full-stack web framework
- Optional backend API
- Optional database ORM

## Benefits

1. Build website or web app quickly, with pre-built modules.
2. Use rich UI components and templates.
3. Customize tech stack, defaults without 3rd party services.
4. Deploy anywhere, no vendor lock-in.
5. Develop with better AI workflow.
6. Demonstrate the JavaScript developer experience (DX) ecosystem capability. As an alternative to existing one such as PHP with Laravel, Ruby with Rails, Python with Django, etc.

## Features

### Primary

1. Frontend: UI/UX, web, mobile
2. Backend: API, logic
3. Database: store data
4. Security: protect data
5. Auth: sign up/in/out, role
6. Storage: upload/download files
7. Payments: get paid
8. Analytics: track usage
9. Notifications: email, push

### Details

#### UI/UX

- Landing Page That Converts
  - Call to Action (CTA)
- Responsive UI Design and Components
  - Lightweight Animation
  - WYSIWYG Editor
  - Theme and Dark Mode
  - Optimistic UI/UX
  - Command Palette/Bar
  - Keyboard Shortcuts

#### Business

- Web Analytics
- SEO (Search Engine Optimization) and Meta Tags
- SSR (Server-Side Rendering)
- Authentication (AuthN) and Authorization (AuthZ)
- Auth with OAuth or Social Login
- User Management, Register, Login, Onboarding, Profile, Invite Users, Logout
- Assets Management with File/Image Upload on Cloudflare R2
- User and Admin Dashboard/Panel
- Form Handling on Client and Server
- Pagination on Client and Server
- Email Templates, Notification, Marketing, Verification
- Payment Gateway Integration with Billing, Subscription, Invoice
- Blog, Release Notes
- Error Monitoring with Sentry
- Timezone and Date/Time Picker
- Code Generator/Scaffolder
- Accessibility (a11y)
- Internationalization (i18n) and Localization (l10n)

#### AI

- AI Workflow Rules
- AI Management & Agent Configuration

#### Role, Access, Permission

- Organization, Team, Users Management
- Role-Based Access Control (RBAC): access by role, such as admin or member
- Attribute-Based Access Control (ABAC): access by attributes of the user, the resource, or the context, such as team, owner, or time
- Relationship-Based Access Control (ReBAC): access by how a user relates to a resource, such as owner, editor, or viewer of a document

#### Engineering

- Type-Safe CRUD (Create, Read, Update, Delete)
- Environment Variables for Local, Staging, Production
- Deployment with Docker and Docker Compose
- Database, ORM, Migration, Backup: change the schema safely and restore data when needed
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

## Tech Stack

### Core Stack

Things that are the primary default.

- General: TypeScript, Bun, Docker
- Frontend: React, Tailwind CSS
- Backend: Hono, tRPC
- Database: SQL, ORM
- Mobile: React Native with Expo, Uniwind

### Default Stack

1. Language: [TypeScript](stacks/typescript.md) + [JavaScript](stacks/javascript.md) + [HTML](stacks/html.md) + [CSS](stacks/css.md)
2. Runtime & Package Manager: [Bun](stacks/bun.md)
3. Format and Lint: [Oxfmt](stacks/oxfmt.md) + [Oxlint](stacks/oxc.md)
4. Bundler: [Vite](stacks/vite.md)
5. Frontend Library: [React](stacks/react.md)
6. Styling: [Tailwind CSS](stacks/tailwind.md) + [shadcn/ui](stacks/shadcn-ui.md) + [UI SDK](stacks/ui-sdk.md) + [unplugin-icons](stacks/unplugin-icons.md) + [Tiptap](stacks/tiptap.md)
7. Data Validation: [Zod](stacks/zod.md)
8. Form Handling: [Conform](stacks/conform.md)
9. Backend API Framework: [Hono](stacks/hono.md) + [tRPC](stacks/trpc.md) or [oRPC](stacks/orpc.md)
10. Database (DBMS): [PostgreSQL](stacks/postgresql.md)
11. Database Clients: [psql](stacks/postgresql.md) [TablePlus](stacks/tableplus.md)
12. Database ORM: [Prisma](stacks/prisma.md)
13. Auth and RBAC: [Better Auth](stacks/better-auth.md) / [Permit.io](stacks/permit-io.md) / [ZenStack](stacks/zenstack.md)
14. Container: [Docker](stacks/docker.md) + [Docker Compose](stacks/docker-compose.md) with [OrbStack](stacks/orbstack.md) / [Colima](stacks/colima.md) / [Kiri](stacks/kiri.md) / [Docker Desktop](stacks/docker-desktop.md)
15. Email: [Resend](stacks/resend.md) + [React Email](stacks/react-email.md)
16. File Upload: [Uploadcare](stacks/uploadcare.md) or [Cloudflare R2](stacks/cloudflare-r2.md)
17. Testing: [Vitest](stacks/vitest.md) + [Testing Library](stacks/testing-library.md) + [Playwright](stacks/playwright.md) + [Storybook](stacks/storybook.md) + [MSW](stacks/msw.md)
18. Payment: [Polar](stacks/polar.md)
19. Security: [Arcjet](stacks/arcjet.md)
20. Image Optimization: [Unpic](stacks/unpic.md)
21. Documentation: [Fumadocs](stacks/fumadocs.md)

### Development Tools

1. Terminal: [Ghostty](stacks/ghostty.md) / [Rex](stacks/rex.md)
2. Code Editor: [Zed](stacks/zed.md) / [NeoVim](stacks/neovim.md)
3. Code Review: [Gitar](stacks/gitar.md)
4. AI Code Editor: [Cursor](stacks/cursor.md)
5. AI Model: [Claude by Anthropic](stacks/claude.md) / [GPT by OpenAI](stacks/gpt.md) / [Gemini by Google](stacks/gemini.md)
6. AI Code Generator: [v0 by Vercel](stacks/v0.md)
7. AI Docs: [Context7](stacks/context7.md)
8. AI Design Review: [Elephant-Goldfish Model (EGM)](stacks/egm.md)
9. AI Engineering Workflow: [Matt Pocock skills](stacks/mattpocock.md) / [Addy Osmani agent-skills](stacks/addyosmani.md) / [pstack](stacks/pstack.md)
10. Agentic Development Environments (ADE): [Orca](stacks/orca.md) / [T3 Code](stacks/t3-code.md) / [Paseo](https://paseo.sh) / [Amp Code](stacks/ampcode.md)
11. Bots: [Grok Bot](stacks/grok-bot.md)
12. Misc: [Graphify](stacks/graphify.md) / [Delta](stacks/delta.md) / [Herdr](stacks/herdr.md) / [Paradev](stacks/paradev.md)

### Deployment: PaaS and Services

1. General: [Railway](stacks/railway.md) / [Render](stacks/render.md) / [Fly.io](stacks/flyio.md) / [Cloudflare Workers](stacks/cloudflare-workers.md) / [Cloudflare Containers](stacks/cloudflare-containers.md)
2. Frontend: [Vercel](stacks/vercel.md) / [Netlify](stacks/netlify.md) / [Cloudflare Pages](stacks/cloudflare-pages.md)
3. Database: [Prisma Postgres](stacks/prisma-postgres.md) / [Supabase](stacks/supabase.md) / [Neon](stacks/neon.md)
4. Storage: [Cloudflare R2](stacks/cloudflare-r2.md) / [Amazon S3](stacks/amazon-s3.md)
5. Self-Host: [Coolify](stacks/coolify.md) / [Dokku](stacks/dokku.md)

### Deployment: Manual Server Deployment

1. Cloud: [Amazon Web Services](stacks/amazon-web-services.md) / [Google Cloud](stacks/google-cloud.md)
2. VPS: [Amazon Lightsail](stacks/amazon-lightsail.md) / [IONOS](stacks/ionos.md) / [Linode](stacks/linode.md) / [DigitalOcean](stacks/digitalocean.md)
3. OS: [Debian](stacks/debian.md) / [Ubuntu](stacks/ubuntu.md)
4. Web Server and Proxy: [Caddy](stacks/caddy.md) / [Nginx](stacks/nginx.md)
5. SSL/TLS Certificate: [Let's Encrypt](stacks/lets-encrypt.md)
6. Automation: [Ansible](stacks/ansible.md) / [Kamal Deploy](stacks/kamal-deploy.md)
7. Bare Metal: [Vultr](stacks/vultr.md) / [Scaleway](stacks/scaleway.md) / [Hetzner](stacks/hetzner.md)

### Backend-Only Web Frameworks

1. BaaS: [Keel](stacks/keel.md) / [Directus](stacks/directus.md) / [Strapi](stacks/strapi.md) / [Payload](stacks/payload.md) / [PocketBase](stacks/pocketbase.md) / [Supabase](stacks/supabase.md) / [Firebase](stacks/firebase.md)
2. [REST API](stacks/rest-api.md): [Hono](stacks/hono.md) with [OpenAPI Swagger](stacks/openapi-swagger.md) generated by [Scalar](stacks/scalar.md)
3. [GraphQL](stacks/graphql.md): [Apollo](stacks/apollo.md) / [Pothos](stacks/pothos.md) / [Sofa](stacks/sofa.md)
4. JS-Based Fully Featured: [NestJS](stacks/nestjs.md) / [Effect](stacks/effect.md) / [AdonisJS](stacks/adonisjs.md)
5. Non-JS: [Fastify](stacks/fastify.md) / [Fiber](stacks/fiber.md) / [Echo](stacks/echo.md)

### Frontend-Included Web Frameworks

1. Frontend Framework: [Next.js](stacks/nextjs.md)
2. Frontend Library Only: [Vue.js](stacks/vuejs.md) / [Angular](stacks/angular.md) / [SolidJS](stacks/solidjs.md) / [Effect UI](stacks/effect-ui.md)
3. Frontend Meta Framework: [Nuxt](stacks/nuxt.md) / [SolidStart](stacks/solidstart.md) / [SvelteKit](stacks/sveltekit.md)
4. JS-Based Full Stack: [Remix](stacks/remix.md) / [RedwoodJS](stacks/redwoodjs.md)
5. Non-JS Full Stack: [Laravel](stacks/laravel.md) / [Rails](stacks/rails.md) / [Django](stacks/django.md)

### Optional: Workflow and Features

1. VCS/SCM: [Git](stacks/git.md)
2. Runtime: [Node.js](stacks/nodejs.md) / [Deno](stacks/deno.md)
3. Format and Lint: [Oxc/Oxlint](stacks/oxc.md) / [Ultracite](stacks/ultracite.md) / [Prettier](stacks/prettier.md) / [Biome](stacks/biome.md)
4. Bundler: [Turbopack](stacks/turbopack.md)
5. Monorepo: [moonrepo](stacks/moonrepo.md) with [Changesets](stacks/changesets.md)
6. Release: [autorc](stacks/autorc.md)
7. Secrets and Environment Variables: [.env](stacks/env.md) / [t3-env](stacks/t3-env.md) / [unplugin-environment](stacks/unplugin-environment.md)
8. Utility: [es-toolkit](stacks/es-toolkit.md)
9. CLI and Prompt: [Term.Ink](stacks/term-ink.md) / [Clack](stacks/clack.md) / [Commander.js](stacks/commanderjs.md) / [oclif](stacks/oclif.md) / [Inquirer](stacks/inquirer.md)
10. Performance: [Million.js](stacks/millionjs.md)
11. Search: [Meilisearch](stacks/meilisearch.md) / [Typesense](stacks/typesense.md)
12. Process: [Effect](stacks/effect.md)
13. Dependency: [Knip](stacks/knip.md)
14. Logging: [pino](stacks/pino.md)
15. Internationalization (i18n): [Lingui](stacks/lingui.md)
16. Accessibility (a11y): [Lighthouse](stacks/lighthouse.md)
17. Realtime: [SSE](stacks/sse.md) / [Socket.IO](stacks/socket-io.md) / [Liveblocks](stacks/liveblocks.md) / [InstantDB](stacks/instantdb.md) / [Electric](stacks/electric.md)
18. Cache and Message Queues: [Redis](stacks/redis.md) / [KiviDB](stacks/kividb.md) / [BullMQ](stacks/bullmq.md)
19. Mobile: [React Native](stacks/react-native.md) with [Expo](stacks/expo.md)
20. Storage: Unix File System
21. Mailers: SMTP
22. Documentation: [Nextra](stacks/nextra.md)
23. Toolchain: [Vite+](stacks/vite-plus.md)
24. Package Browser: [npmx](stacks/npmx.md)
25. State Machine: [XState](stacks/xstate.md)
26. Policy: [Open Policy Agent](stacks/opa.md)
27. HTTP Client: [ky](stacks/ky.md) / [Better Fetch](stacks/better-fetch.md)
28. Icons: [Kubai Icons](stacks/kubai-icons.md)

### Optional: 3rd Party Services

1. Repo: [GitHub](stacks/github.md) / [GitLab](stacks/gitlab.md)
2. Payment: [Polar](stacks/polar.md) / [Stripe](stacks/stripe.md) / [Whop](stacks/whop.md)
3. Analytics: [PostHog](stacks/posthog.md) / [Openpanel.dev](stacks/openpanel.md) / [Simple Analytics](stacks/simpleanalytics.md) / [Plausible](stacks/plausible.md)
4. Service Monitoring: [OpenStatus](stacks/openstatus.md) / [BetterStack](stacks/betterstack.md)
5. Secrets and Environment Variables: [Infisical](stacks/infisical.md) / [Doppler](stacks/doppler.md)
6. File Storage/Upload: [Uploadcare](stacks/uploadcare.md) / [Cloudinary](stacks/cloudinary.md)
7. Avatar: [DiceBear](stacks/dicebear.md) / [Gravatar](stacks/gravatar.md)
8. Email Transactional: [Amazon SES](stacks/amazon-ses.md) / [Resend](stacks/resend.md) / [PostShiba](stacks/postshiba.md) / [Nodemailer](stacks/nodemailer.md) / [Plunk](stacks/plunk.md)
9. Email Marketing/Newsletter: [Loops.so](stacks/loops.md) / [Bento](stacks/bento.md) / [Beehiiv](stacks/beehiiv.md)
10. Email Tool: [VerifyRight](stacks/verifyright.md)
11. Workflow: [Inngest](stacks/inngest.md)
12. APM, Observability, Error Tracking: [Sentry](stacks/sentry.md) + [OpenTelemetry](stacks/opentelemetry.md)
13. Auth: [WorkOS](stacks/workos.md) / [Clerk](stacks/clerk.md)
14. Business Intelligence (BI): [Metabase](stacks/metabase.md) / [Index.app](stacks/index-app.md)
15. Webhook: [Svix](stacks/svix.md)
16. Background Jobs: [Quirrel.dev](stacks/quirrel-dev.md) / [Trigger.dev](stacks/trigger-dev.md)
17. Link/URL Shortener/Management: [Dub.co](stacks/dub-co.md)
18. Full-Text Search: [Meilisearch](stacks/meilisearch.md)
19. Notification: [Novu](stacks/novu.md)
20. Documentation: [Mintlify](stacks/mintlify.md)
21. Automation: [n8n](stacks/n8n.md)
22. API Key Management: [Unkey](stacks/unkey.md)
23. WhatsApp: [Qontak](stacks/qontak.md) / [Twilio](stacks/twilio.md)
24. CI Runners: [Blacksmith](stacks/blacksmith.md)
25. Networking: [Tailscale](stacks/tailscale.md)
26. Infrastructure as Code: [SST](stacks/sst.md) / [Encore](stacks/encore.md)

### Optional: Communication Tools

1. Email: [Gmail](stacks/gmail.md) / [Zero Email](stacks/zero-email.md) / [HEY](stacks/hey.md) / [ProtonMail](stacks/protonmail.md)
2. Credentials: [Bitwarden](stacks/bitwarden.md) / [Passbolt](stacks/passbolt.md) / [LastPass](stacks/lastpass.md) / [1Password](stacks/1password.md)
3. Dotfiles: [Chezmoi](stacks/chezmoi.md) / [Dotbot](stacks/dotbot.md)
4. UI/UX Design: [Figma](stacks/figma.md)
5. Communication & Community: [Telegram](stacks/telegram.md) / [Discord](stacks/discord.md) / [X (Twitter)](stacks/x.md)
6. CRM: [Attio](stacks/attio.md)
7. Business Database & MVP Builder: [Airtable](stacks/airtable.md) / [Baserow](stacks/baserow.md) / [NocoDB](stacks/nocodb.md)
8. Product/Project Management: [Linear](stacks/linear.md) / [Plane.so](stacks/plane.md) / [Eververse.ai](stacks/eververse-ai.md) / [Basecamp](stacks/basecamp.md)
9. Docs: [Outline](stacks/outline.md) / [Notion](stacks/notion.md)
10. Social Media Management: [Buffer](stacks/buffer.md) / [Mixpost](stacks/mixpost.md) / [Postiz](stacks/postiz.md)
11. Blog: [Hashnode](stacks/hashnode.md) / [Ghost](stacks/ghost.md)
12. Document: [DocuSeal](stacks/docuseal.md) / [Papermark](stacks/papermark.md)
13. Launcher: [Raycast](stacks/raycast.md)
14. Accounting: [Bigcapital](stacks/bigcapital.md)
15. Diagramming: [Mermaid](stacks/mermaid.md) / [LikeC4](stacks/likec4.md) / [IcePanel](stacks/icepanel.md) / [Eraser](stacks/eraser.md) / [UML](stacks/uml.md)

## Guides

- [Workflow](docs/guides/workflow.md)
- [Tech Stack](stacks/tech-stack.md)
- [System Design](docs/guides/system-design.md)
- [Domain-Driven Design](docs/guides/domain-driven-design.md)
- [UI Design System](docs/guides/ui-design-system.md)
- [UI Component Library](docs/guides/ui-component-library.md)
- [AI Agent Skills](.claude/skills/README.md)

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
