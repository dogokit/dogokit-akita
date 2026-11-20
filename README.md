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
> This project is **documentation only**. It is a curated reference of tools, stack choices and guides. It contains **no actual implementation** of the features listed below (auth, payments, storage, etc.). Treat the content as notes and recommendations to build from.
>
> Example implementation releases are tagged as `akita-1`, `akita-2`, and so on.

## Goal

🐶Dogokit Akita is a comprehensive and opinionated full stack application development kit. Encompassing JavaScript/TypeScript, Node.js/Deno/Bun, and more. It serves as a versatile reference for constructing robust web applications, that can scale from zero to millions of users.

- Default frontend web with React, React Router, Tailwind CSS.
- Optional full-stack web framework
- Optional backend API and database ORM

## Variants

- [Demo at dogokit.allnimal.com](https://dogokit.allnimal.com)
- [Dogokit Akita](https://github.com/dogokit/dogokit-akita)
- [Dogokit Beagle](https://github.com/dogokit/dogokit-beagle)
- [Dogokit Corgi](https://github.com/dogokit/dogokit-corgi)

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

- Landing Page That Converts
  - Call to Action (CTA)
- Responsive UI Design and Components
  - WYSIWYG Editor
  - Theme and Dark Mode
  - Optimistic UI/UX
  - Lightweight Animation
  - Command Palette/Bar
  - Keyboard Shortcuts
- Web Analytics
- AI Workflow Rules
- AI Management & Agent Configuration
- SEO (Search Engine Optimization) and Meta Tags
- SSR (Server-Side Rendering)
- Type-Safe CRUD (Create, Read, Update, Delete)
- Database and ORM
- Environment Variables for Local, Staging, Production
- Deployment with Docker and Docker Compose
- Authentication (AuthN) and Authorization (AuthZ)
- Auth with OAuth or Social Login
- User Management, Register, Login, Onboarding, Profile, Invite Users, Logout
- Organization and Team Management
- Role and Permission with Role-Based Access Control (RBAC)
- Assets Management with File/Image Upload on Cloudflare R2
- User and Admin Dashboard/Panel
- Form Handling on Client and Server
- Pagination on Client and Server
- Email Templates, Notification, Marketing, Verification
- Payment Gateway Integration with Billing, Subscription, Invoice
- Blog, Release Notes
- Scheduled/Cron Jobs
- Background Jobs/Workers
- Error Monitoring with Sentry
- Timezone and Date/Time Picker
- Internationalization (i18n) and Localization (l10n)
- Accessibility (a11y)
- Code Generator/Scaffolder
- Webhooks
- Community

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
3. Format and Lint: [Biome](stacks/biome.md)
4. Bundler: [Vite](stacks/vite.md)
5. Frontend Library: [React](stacks/react.md)
6. Frontend Framework: [React Router](stacks/react-router.md)
7. Styling: [Tailwind CSS](stacks/tailwind.md) + [shadcn/ui](stacks/shadcn-ui.md) + [unplugin-icons](stacks/unplugin-icons.md) + [Tiptap](stacks/tiptap.md)
8. Data Validation: [Zod](stacks/zod.md)
9. Form Handling: [Conform](stacks/conform.md)
10. Backend API Framework: [Hono](stacks/hono.md) + [tRPC](stacks/trpc.md) or [oRPC](stacks/orpc.md)
11. Auth Library: [Better Auth](stacks/better-auth.md)
12. Database ORM & RBAC: [Prisma](stacks/prisma.md) + [Permit.io](stacks/permit-io.md)
13. Database/DBMS & GUI: [PostgreSQL](stacks/postgresql.md) + [TablePlus](stacks/tableplus.md)
14. Container: [Docker](stacks/docker.md) + [Docker Compose](stacks/docker-compose.md) with [OrbStack](stacks/orbstack.md) / [Docker Desktop](stacks/docker-desktop.md)
15. Email: [Resend](stacks/resend.md) + [React Email](stacks/react-email.md)
16. File Upload: [Uploadcare](stacks/uploadcare.md) or [Cloudflare R2](stacks/cloudflare-r2.md)
17. Testing: [Vitest](stacks/vitest.md) + [Testing Library](stacks/testing-library.md) + [Playwright](stacks/playwright.md) + [Storybook](stacks/storybook.md) + [MSW](stacks/msw.md)
18. Payment: [Polar](stacks/polar.md) + [Xendit](stacks/xendit.md)
19. Security: [Arcjet](stacks/arcjet.md)
20. Image Optimization: [Unpic](stacks/unpic.md)
21. Documentation: [Fumadocs](stacks/fumadocs.md)

### Development Tools

1. Code Editor: [VS Code](stacks/vscode.md) / [NeoVim](stacks/neovim.md)
2. Code Review: [CodeRabbit](stacks/coderabbit.md)
3. AI Code Editor: [Cursor](stacks/cursor.md) / [Windsurf](stacks/windsurf.md)
4. AI Model: [GPT by OpenAI](stacks/gpt.md) / [Claude by Anthropic](stacks/claude.md) / [Gemini by Google](stacks/gemini.md) / [Perplexity](stacks/perplexity.md)
5. AI Agent: [GitHub Copilot](stacks/github-copilot.md) / [Augment Code](stacks/augment-code.md) / [Kilo Code](stacks/kilo-code.md) / [Roo Code](stacks/roocode.md) / [Cline](stacks/cline.md) / [Codegen](stacks/codegen.md)
6. AI Code Generator: [v0 by Vercel](stacks/v0.md) / [Stitch by Google](stacks/stitch-google.md)
7. AI Docs: [Context7](stacks/context7.md)

### Deployment: PaaS and Services

1. General: [Render](stacks/render.md) / [Railway](stacks/railway.md) / [Fly.io](stacks/flyio.md) / [Cloudflare Workers](stacks/cloudflare-workers.md)
2. Frontend: [Vercel](stacks/vercel.md) / [Netlify](stacks/netlify.md) / [Cloudflare Pages](stacks/cloudflare-pages.md)
3. Database: [Prisma Postgres](stacks/prisma-postgres.md) / [Neon](stacks/neon.md) / [Supabase](stacks/supabase.md)
4. Storage: [Cloudflare R2](stacks/cloudflare-r2.md) / [Amazon S3](stacks/amazon-s3.md)
5. Self-Host: [Coolify](stacks/coolify.md) / [Dokku](stacks/dokku.md)

### Alternative: Manual Deployment

1. OS: [Debian](stacks/debian.md) / [Ubuntu](stacks/ubuntu.md)
2. Web Server and Proxy: [Caddy](stacks/caddy.md) / [Nginx](stacks/nginx.md)
3. SSL/TLS Certificate: [Let's Encrypt](stacks/lets-encrypt.md)
4. Automation: [Kamal Deploy](stacks/kamal-deploy.md) / [Ansible](stacks/ansible.md)
5. Cloud: [Google Cloud](stacks/google-cloud.md) / [Amazon Web Services](stacks/amazon-web-services.md)
6. VPS: [IONOS](stacks/ionos.md) / [Linode](stacks/linode.md) / [DigitalOcean](stacks/digitalocean.md) / [Amazon Lightsail](stacks/amazon-lightsail.md)
7. Bare Metal: [Hetzner](stacks/hetzner.md) / [Vultr](stacks/vultr.md) / [Scaleway](stacks/scaleway.md)

### Alternative: Web Frameworks

1. Frontend Framework: [Remix](stacks/remix.md) / [Next.js](stacks/nextjs.md)
2. Frontend Library Only: [Svelte](stacks/svelte.md) / [Vue.js](stacks/vuejs.md) / [Angular](stacks/angular.md) / [SolidJS](stacks/solidjs.md) / [Qwik](stacks/qwik.md)
3. Frontend Meta Framework: [SvelteKit](stacks/sveltekit.md), [Nuxt](stacks/nuxt.md), [SolidStart](stacks/solidstart.md), [Qwik City](stacks/qwik-city.md)
4. Non-JS Full Stack Framework: [Laravel](stacks/laravel.md) / [Rails](stacks/rails.md) / [Django](stacks/django.md)

### Alternative: Separated Backend

1. BaaS: [Keel](stacks/keel.md) / [Directus](stacks/directus.md) / [Strapi](stacks/strapi.md) / [Payload](stacks/payload.md) / [PocketBase](stacks/pocketbase.md) / [Supabase](stacks/supabase.md) / [Firebase](stacks/firebase.md)
2. [REST API](stacks/rest-api.md): [Hono](stacks/hono.md) with [Swagger](stacks/swagger.md) generated by [ZenStack](stacks/zenstack.md) and [Scalar](stacks/scalar.md) for refined UX
3. [GraphQL](stacks/graphql.md): [Apollo](stacks/apollo.md), [Pothos](stacks/pothos.md), [Sofa](stacks/sofa.md)
4. JS-based Fully Featured: [RedwoodJS](stacks/redwoodjs.md) / [AdonisJS](stacks/adonisjs.md)
5. Non-JS Lightweight: [Gin](stacks/gin.md) / [Fiber](stacks/fiber.md) / [Echo](stacks/echo.md)

### Alternative: Workflow and Features

1. VCS/SCM: [Git](stacks/git.md)
2. Runtime: [Node.js](stacks/nodejs.md) / [Deno](stacks/deno.md)
3. Format and Lint: [Biome](stacks/biome.md) + [Ultracite](stacks/ultracite.md) / [Prettier](stacks/prettier.md) / [ESLint](stacks/eslint.md) / [Oxc](stacks/oxc.md)
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
18. Cache and Message Queues: [Redis](stacks/redis.md) / [BullMQ](stacks/bullmq.md) / In-Memory
19. Mobile: [React Native](stacks/react-native.md) with [Expo](stacks/expo.md)
20. Storage: Unix File System
21. Mailers: SMTP
22. Documentation: [Nextra](stacks/nextra.md)

### Alternative: 3rd Party Services

1. Repo: [GitHub](stacks/github.md) / [GitLab](stacks/gitlab.md) / [Bitbucket](stacks/bitbucket.md)
2. Payment:
   - International: [Polar](stacks/polar.md) / [Lemon Squeezy](stacks/lemonsqueezy.md) / [Stripe](stacks/stripe.md)
   - Indonesia: [Xendit](stacks/xendit.md) / [Midtrans](stacks/midtrans.md)
3. Analytics: [DataFast](stacks/datafast.md) / [PostHog](stacks/posthog.md) / [Openpanel.dev](stacks/openpanel.md) / [Simple Analytics](stacks/simpleanalytics.md) / [Plausible](stacks/plausible.md)
4. Service Monitoring: [OpenStatus](stacks/openstatus.md) / [BetterStack](stacks/betterstack.md)
5. Secrets and Environment Variables: [Infisical](stacks/infisical.md) / [Doppler](stacks/doppler.md)
6. File Storage/Upload: [Uploadcare](stacks/uploadcare.md) / [Cloudinary](stacks/cloudinary.md)
7. Avatar: [DiceBear](stacks/dicebear.md) / [Gravatar](stacks/gravatar.md)
8. Email Transactional: [Amazon SES](stacks/amazon-ses.md) / [Resend](stacks/resend.md) / [Nodemailer](stacks/nodemailer.md) / [Plunk](stacks/plunk.md)
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

### Alternative: Communication Tools

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

## Guides

- [Workflow](docs/guides/workflow.md)
- [Tech Stack](docs/guides/tech-stack.md)
- [System Design](docs/guides/system-design.md)
- [Domain-Driven Design](docs/guides/domain-driven-design.md)
- [UI Design System](docs/guides/ui-design-system.md)
- [UI Component Library](docs/guides/ui-component-library.md)

## References

- [Inspirations](docs/references/inspirations.md)
- [Credits](docs/references/credits.md)
