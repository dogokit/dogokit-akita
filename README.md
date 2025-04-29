<div align="center">
	<h1 align="center">🐶Dogokit Akita</h1>
  <p align="center">
    <span>Full Stack App Development Kit</span>
    <br />
    <a href="https://akita.allnimal.com">🚧 Live Demo</a>
    <span> · <span>
    <a href="#tech-stack">Tech Stack</a>
    <span> · <span>
    <a href="docs/guides/start.md">Getting Started</a>
  </p>
</div>

## Goal

🐶Dogokit Akita is a comprehensive and opinionated full stack application development kit. Encompassing JavaScript/TypeScript, Node.js/Deno/Bun, and more. It serves as a versatile reference for constructing robust web applications, that can scale from zero to millions of users.

- Default frontend web with React, React Router, Tailwind CSS.
- Optional full-stack web framework
- Optional backend API and database ORM

## Benefits

1. Build website or web app quickly, with pre-built modules.
2. Use rich UI components and templates.
3. Customize tech stack, defaults without 3rd party services.
4. Deploy anywhere, no vendor lock-in.
5. Develop with better AI workflow.
6. Demonstrate the JavaScript developer experience (DX) ecosystem capability. As an alternative to existing one such as PHP with Laravel, Ruby with Rails, Python with Django, etc.

## Features

- [x] Landing Page That Converts
- [x] Responsive UI Design and Components
  - [x] WYSIWYG Editor
  - [x] Theme and Dark Mode
  - [ ] Optimistic UI/UX
  - [ ] Lightweight Animation
  - [ ] Command Palette/Bar
  - [ ] Keyboard Shortcuts
- [x] AI Workflow Rules
- [x] Web Analytics
- [x] SEO (Search Engine Optimization) and Meta Tags
- [x] SSR (Server-Side Rendering)
- [x] Type-Safe CRUD (Create, Read, Update, Delete)
- [x] Database and ORM
- [x] Environment Variables for Local, Staging, Production
- [x] Deployment with Docker and Docker Compose
- [x] Authentication (AuthN) and Authorization (AuthZ)
- [ ] Auth with OAuth or Social Login
- [x] User Management, Register, Login, Onboarding, Profile, Invite Users, Logout
- [ ] Organization and Team Management
- [ ] Role and Permission with Role-Based Access Control (RBAC)
- [x] Assets Management with File/Image Upload on Cloudflare R2
- [x] User and Admin Dashboard/Panel
- [x] Form Handling on Client and Server
- [ ] Pagination on Client and Server
- [x] Email Templates, Notification, Marketing, Verification
- [x] Payment Gateway Integration with Billing, Subscription, Invoice
- [ ] Webhooks
- [ ] Blog, Release Notes
- [ ] Scheduled/Cron Jobs
- [ ] Background Jobs/Workers
- [ ] Error Monitoring with Sentry
- [ ] Timezone and Date/Time Picker
- [ ] Internationalization (i18n) and Localization (l10n)
- [ ] Accessibility (a11y)
- [ ] Code Generator/Scaffolder
- [ ] AI Integration
- [ ] Community

## Tech Stack

- [Goal](#goal)
- [Benefits](#benefits)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Guides](#guides)
- [Inspirations](#inspirations)
- [Credits](#credits)

### Core

Things that are the primary default.

- General: TypeScript, Bun
- Frontend: React, Tailwind CSS
- Backend: ORM, SQL Database, Docker

### Default

1. Language: [TypeScript](docs/typescript.md), [JavaScript](docs/javascript.md), [HTML](docs/html.md), [CSS](docs/css.md)
2. Runtime & Package Manager: [Bun](docs/bun.md)
3. Format and Lint: [Biome](docs/biome.md)
4. Bundler: [Vite](docs/vite.md)
5. Frontend Library: [React](docs/react.md)
6. Frontend Framework: [React Router](docs/react-router.md)
7. Styling: [Tailwind CSS](docs/tailwind.md) + [shadcn/ui](docs/shadcn-ui.md) + [unplugin-icons](docs/unplugin-icons.md) + [Tiptap](docs/tiptap.md)
8. Data Validation: [Zod](docs/zod.md)
9. Form Handling: [Conform](docs/conform.md)
10. Backend API Framework: [Hono](docs/hono.md) + [tRPC](docs/trpc.md)
11. Auth Library: [Better Auth](docs/better-auth.md)
12. Database ORM & RBAC: [Prisma](docs/prisma.md) + [Permit.io](docs/permit-io.md)
13. Database/DBMS & GUI: [PostgreSQL](docs/postgresql.md) + [TablePlus](docs/tableplus.md)
14. Container: [Docker](docs/docker.md) + [Docker Compose](docs/docker-compose.md) with [OrbStack](docs/orbstack.md) / [Docker Desktop](docs/docker-desktop.md)
15. Email: [Resend](docs/resend.md) + [React Email](docs/react-email.md)
16. Testing: [Vitest](docs/vitest.md) + [Testing Library](docs/testing-library.md) + [Playwright](docs/playwright.md) + [Storybook](docs/storybook.md) + [MSW](docs/msw.md)
17. Payment: [Polar](docs/polar.md) + [Xendit](docs/xendit.md)

Deployment:

1. Frontend: [Vercel](docs/vercel.md)
2. Backend: [Render](docs/render.md)
3. Database: [Neon](docs/neon.md)

### Optional: Manual Deployment

1. OS: [Debian](docs/debian.md) / [Ubuntu](docs/ubuntu.md)
2. Web Server and Proxy: [Caddy](docs/caddy.md) / [Nginx](docs/nginx.md)
3. SSL/TLS Certificate: [Let's Encrypt](docs/lets-encrypt.md)
4. Self-Host PaaS: [Coolify](docs/coolify.md) / [Dokku](docs/dokku.md)
5. Automation: [Kamal Deploy](docs/kamal-deploy.md) / [Ansible](docs/ansible.md)
6. Cloud: [Google Cloud](docs/google-cloud.md) / [Amazon Web Services](docs/amazon-web-services.md)
7. VPS: [IONOS](docs/ionos.md) / [Linode](docs/linode.md) / [DigitalOcean](docs/digitalocean.md) / [Amazon Lightsail](docs/amazon-lightsail.md)
8. Bare Metal: [Hetzner](docs/hetzner.md) / [Vultr](docs/vultr.md) / [Scaleway](docs/scaleway.md)

### Alternative: Frameworks

1. Frontend Framework: [Remix](docs/remix.md) / [Next.js](docs/nextjs.md)
2. Frontend Library Only: [Svelte](docs/svelte.md) / [Vue.js](docs/vuejs.md) / [Angular](docs/angular.md) / [SolidJS](docs/solidjs.md) / [Qwik](docs/qwik.md)
3. Frontend Meta Framework: [SvelteKit](docs/sveltekit.md), [Nuxt](docs/nuxt.md), [SolidStart](docs/solidstart.md), [Qwik City](docs/qwik-city.md)
4. Non-JS Full Stack Framework: [Laravel](docs/laravel.md) / [Rails](docs/rails.md) / [Django](docs/django.md)

### Alternative: Separated Backend

1. BaaS: [Keel](docs/keel.md) / [Directus](docs/directus.md) / [Strapi](docs/strapi.md) / [Payload](docs/payload.md) / [PocketBase](docs/pocketbase.md) / [Supabase](docs/supabase.md) / [Firebase](docs/firebase.md)
2. [REST API](docs/rest-api.md): [Hono](docs/hono.md) with [Swagger](docs/swagger.md) generated by [ZenStack](docs/zenstack.md) and [Scalar](docs/scalar.md) for refined UX
3. [GraphQL](docs/graphql.md): [Apollo](docs/apollo.md), [Pothos](docs/pothos.md), [Sofa](docs/sofa.md)
4. JS-based Fully Featured: [RedwoodJS](docs/redwoodjs.md) / [AdonisJS](docs/adonisjs.md)
5. Non-JS Lightweight: [Gin](docs/gin.md) / [Fiber](docs/fiber.md) / [Echo](docs/echo.md)

### Alternative: Workflow and Features

1. Runtime: [Node.js](docs/nodejs.md) / [Deno](docs/deno.md)
2. Format and Lint: [Biome](docs/biome.md) + [Ultracite](docs/ultracite.md) / [Prettier](docs/prettier.md) / [ESLint](docs/eslint.md) / [Oxc](docs/oxc.md)
3. Bundler: [Turbopack](docs/turbopack.md)
4. Monorepo: [moonrepo](docs/moonrepo.md) with [Changesets](docs/changesets.md)
5. Release: [autorc](docs/autorc.md)
6. Secrets and Environment Variables: [.env](docs/env.md) / [t3-env](docs/t3-env.md) / [unplugin-environment](docs/unplugin-environment.md)
7. Utility: [es-toolkit](docs/es-toolkit.md)
8. CLI and Prompt: [Term.Ink](docs/term-ink.md) / [Clack](docs/clack.md) / [Commander.js](docs/commanderjs.md) / [oclif](docs/oclif.md) / [Inquirer](docs/inquirer.md)
9. Performance: [Million.js](docs/millionjs.md)
10. Search: [Meilisearch](docs/meilisearch.md) / [Typesense](docs/typesense.md)
11. Process: [Effect](docs/effect.md)
12. Dependency: [Knip](docs/knip.md)
13. Logging: [pino](docs/pino.md)
14. Internationalization (i18n): [Lingui](docs/lingui.md)
15. Accessibility (a11y): [Lighthouse](docs/lighthouse.md)
16. Realtime: [SSE](docs/sse.md) / [Socket.IO](docs/socket-io.md) / [Liveblocks](docs/liveblocks.md) / [InstantDB](docs/instantdb.md) / [Electric](docs/electric.md)
17. Cache and Message Queues: [Redis](docs/redis.md) / [BullMQ](docs/bullmq.md) / In-Memory
18. Mobile: [React Native](docs/react-native.md) with [Expo](docs/expo.md)
19. Storage: Unix File System
20. Mailers: SMTP
21. Documentation: [Nextra](docs/nextra.md)

### Alternative: 3rd Party Services

1. Repo: [Git](docs/git.md) on [GitHub](docs/github.md) / [GitLab](docs/gitlab.md) / [Bitbucket](docs/bitbucket.md)
2. Analytics: [PostHog](docs/posthog.md) / [Openpanel.dev](docs/openpanel.md) / [Simple Analytics](docs/simpleanalytics.md) / [Plausible](docs/plausible.md)
3. Payment:
   - International: [Polar](docs/polar.md) / [Lemon Squeezy](docs/lemonsqueezy.md) / [Stripe](docs/stripe.md)
   - Indonesia: [Xendit](docs/xendit.md) / [Midtrans](docs/midtrans.md)
4. Service Monitoring: [OpenStatus](docs/openstatus.md) / [BetterStack](docs/betterstack.md)
5. Secrets and Environment Variables: [Infisical](docs/infisical.md) / [Doppler](docs/doppler.md)
6. File Storage/Upload: [Uploadcare](docs/uploadcare.md) / [Cloudinary](docs/cloudinary.md)
7. Email Transactional: [Nodemailer](docs/nodemailer.md) / [Plunk](docs/plunk.md) / [Resend](docs/resend.md) / [Amazon SES](docs/amazon-ses.md)
8. Email Marketing/Newsletter: [Loops.so](docs/loops.md) / [Beehiiv](docs/beehiiv.md) / [Bento](docs/bento.md)
9. APM, Observability, Error Tracking: [Sentry](docs/sentry.md) + [OpenTelemetry](docs/opentelemetry.md)
10. Auth: [WorkOS](docs/workos.md) / [Clerk](docs/clerk.md)
11. Business Intelligence (BI): [Metabase](docs/metabase.md) / [Index.app](docs/index-app.md)
12. Webhook: [Svix](docs/svix.md)
13. Background Jobs: [Quirrel.dev](docs/quirrel-dev.md) / [Trigger.dev](docs/trigger-dev.md)
14. Link/URL Shortener/Management: [Dub.co](docs/dub-co.md)
15. Full-Text Search: [Meilisearch](docs/meilisearch.md)
16. Notification: [Novu](docs/novu.md)
17. Documentation: [Mintlify](docs/mintlify.md)
18. Automation: [n8n](docs/n8n.md)
19. API Key Management: [Unkey](docs/unkey.md)

### Alternative: Tools

1. Email: [Gmail](docs/gmail.md) / [Zero Email](docs/zero-email.md) / [HEY](docs/hey.md) / [ProtonMail](docs/protonmail.md)
2. Credentials: [Bitwarden](docs/bitwarden.md) / [Passbolt](docs/passbolt.md) / [LastPass](docs/lastpass.md) / [1Password](docs/1password.md)
3. Dotfiles: [Chezmoi](docs/chezmoi.md) / [Dotbot](docs/dotbot.md)
4. Code Editor: [VS Code](docs/vscode.md) / [NeoVim](docs/neovim.md)
5. AI Tool: [ChatGPT](docs/chatgpt.md) / [Claude](docs/claude.md) / [Perplexity](docs/perplexity.md) / [Galileo AI](docs/galileo-ai.md)
6. AI Code Editor: [GitHub Copilot](docs/github-copilot.md) / [Cursor AI](docs/cursor.md) / [Codeium](docs/codeium.md) / [Supermaven](docs/supermaven.md) / [Tabnine](docs/tabnine.md)
7. AI Code Generator: [v0.dev](docs/v0.md) / [Marblism](docs/marblism.md)
8. UI/UX Design: [Figma](docs/figma.md)
9. Communication & Community: [Telegram](docs/telegram.md) / [Discord](docs/discord.md) / [X (Twitter)](docs/x.md)
10. CRM: [Attio](docs/attio.md)
11. Business Database & MVP Builder: [Airtable](docs/airtable.md) / [Baserow](docs/baserow.md) / [NocoDB](docs/nocodb.md)
12. Project/Product Management: [Linear](docs/linear.md) / [Plane.so](docs/plane.md) / [Eververse](docs/eververse.md) / [Basecamp](docs/basecamp.md)
13. Docs: [Outline](docs/outline.md) / [Notion](docs/notion.md)
14. Social Media Management: [Buffer](docs/buffer.md) / [Mixpost](docs/mixpost.md) / [Postiz](docs/postiz.md)
15. Blog: [Hashnode](docs/hashnode.md) / [Ghost](docs/ghost.md)
16. Document: [DocuSeal](docs/docuseal.md) / [Papermark](docs/papermark.md)
17. Launcher: [Raycast](docs/raycast.md)
18. Accounting: [Bigcapital](docs/bigcapital.md)

## Guides

- [Workflow](docs/guides/workflow.md)
- [Tech Stack](docs/guides/tech-stack.md)
- [Domain-Driven Design](docs/guides/domain-driven-design.md)
- [UI Design System](docs/guides/ui-design-system.md)
- [UI Component Library](docs/guides/ui-component-library.md)

## Inspirations

Templates:

- [Next-Forge](https://next-forge.com)
- [LaunchFast](https://launchfa.st)
- [Indiflow](https://indiflow.app)
- [Zero To Shipped](https://zerotoshipped.com)
- [T3 Stack](https://create.t3.gg)
- [Built At Lightspeed](https://builtatlightspeed.com)
- [`midday-ai/v1`](https://github.com/midday-ai/v1)
- [`ixahmedxi/orbitkit`](https://github.com/ixahmedxi/orbitkit)

Frameworks:

- [Laravel](https://laravel.com)
- [Ruby on Rails](https://rubyonrails.org)
- [RedwoodJS](https://redwoodjs.com)
- [AdonisJS](https://adonisjs.com)
- [Blitz.js](https://blitzjs.com)

Demos:

- [`lmsqueezy/nextjs-billing`](https://github.com/lmsqueezy/nextjs-billing)
- [`shadcn-ui/taxonomy`](https://github.com/shadcn-ui/taxonomy)

Directory:

- [OpenAlternative](https://openalternative.co): Open Source Alternatives to Popular Software
- [OpenSourceAlternative.to](https://opensourcealternative.to): Open Source Alternatives to Proprietary Software
- [Best of JS](https://bestofjs.org)

## Credits

The codename ["Akita" comes from a Japanese dog breed](https://britannica.com/animal/Akita-dog) of large size, originating from the mountains of northern Japan.

Originally created by [🦁Haidar](https://github.com/mhaidarhanif)

- [🐾Allnimal](https://allnimal.com)
- [🐻Bearmentor](https://bearmentor.com)
- [🐱Catamyst](https://catamyst.com)
- [🐶Dogokit](https://dogokit.allnimal.com)
- [🐘Elephanity](https://elephanity.allnimal.com)
