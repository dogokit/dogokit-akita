<div align="center">
	<h1 align="center">🐶Dogokit Akita</h1>
  <p align="center">
    <span>Full Stack App Development Kit</span>
    <br />
    <a href="https://akita.dogokit.com">🚧 Live Demo</a>
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

1. Language: [TypeScript](docs/typescript.md) + [JavaScript](docs/javascript.md) + [HTML](docs/html.md) + [CSS](docs/css.md)
2. Runtime & Package Manager: [Bun](docs/bun.md)
3. Format and Lint: [Biome](docs/biome.md)
4. Bundler: [Vite](docs/vite.md)
5. Frontend Library: [React](docs/react.md)
6. Frontend Framework: [React Router](docs/react-router.md)
7. Styling: [Tailwind CSS](docs/tailwind.md) + [shadcn/ui](docs/shadcn-ui.md) + [unplugin-icons](docs/unplugin-icons.md) + [Tiptap](docs/tiptap.md)
8. Data Validation: [Zod](docs/zod.md)
9. Form Handling: [Conform](docs/conform.md)
10. Backend API Framework: [Hono](docs/hono.md) + [tRPC](docs/trpc.md) or [oRPC](docs/orpc.md)
11. Auth Library: [Better Auth](docs/better-auth.md)
12. Database ORM & RBAC: [Prisma](docs/prisma.md) + [Permit.io](docs/permit-io.md)
13. Database/DBMS & GUI: [PostgreSQL](docs/postgresql.md) + [TablePlus](docs/tableplus.md)
14. Container: [Docker](docs/docker.md) + [Docker Compose](docs/docker-compose.md) with [OrbStack](docs/orbstack.md) / [Docker Desktop](docs/docker-desktop.md)
15. Email: [Resend](docs/resend.md) + [React Email](docs/react-email.md)
16. File Upload: [Uploadcare](docs/uploadcare.md) or [Cloudflare R2](docs/cloudflare-r2.md)
17. Testing: [Vitest](docs/vitest.md) + [Testing Library](docs/testing-library.md) + [Playwright](docs/playwright.md) + [Storybook](docs/storybook.md) + [MSW](docs/msw.md)
18. Payment: [Polar](docs/polar.md) + [Xendit](docs/xendit.md)
19. Security: [Arcjet](docs/arcjet.md)
20. Image Optimization: [Unpic](docs/unpic.md)
21. Documentation: [Fumadocs](docs/fumadocs.md)

### Development Tools

1. Code Editor: [VS Code](docs/vscode.md) / [NeoVim](docs/neovim.md)
2. Code Review: [CodeRabbit](docs/coderabbit.md)
3. AI Code Editor: [Cursor](docs/cursor.md) / [Windsurf](docs/windsurf.md)
4. AI Model: [GPT by OpenAI](docs/gpt.md) / [Claude by Anthropic](docs/claude.md) / [Gemini by Google](docs/gemini.md) / [Perplexity](docs/perplexity.md)
5. AI Agent: [GitHub Copilot](docs/github-copilot.md) / [Augment Code](docs/augment-code.md) / [Kilo Code](docs/kilo-code.md) / [Roo Code](docs/roocode.md) / [Cline](docs/cline.md) / [Codegen](docs/codegen.md)
6. AI Code Generator: [v0 by Vercel](docs/v0.md) / [Stitch by Google](docs/stitch-google.md)
7. AI Docs: [Context7](docs/context7.md)

### Deployment: PaaS and Services

1. General: [Render](docs/render.md) / [Railway](docs/railway.md) / [Fly.io](docs/flyio.md) / [Cloudflare Workers](docs/cloudflare-workers.md)
2. Frontend: [Vercel](docs/vercel.md) / [Netlify](docs/netlify.md) / [Cloudflare Pages](docs/cloudflare-pages.md)
3. Database: [Prisma Postgres](docs/prisma-postgres.md) / [Neon](docs/neon.md) / [Supabase](docs/supabase.md)
4. Storage: [Cloudflare R2](docs/cloudflare-r2.md) / [Amazon S3](docs/amazon-s3.md)
5. Self-Host: [Coolify](docs/coolify.md) / [Dokku](docs/dokku.md)

### Alternative: Manual Deployment

1. OS: [Debian](docs/debian.md) / [Ubuntu](docs/ubuntu.md)
2. Web Server and Proxy: [Caddy](docs/caddy.md) / [Nginx](docs/nginx.md)
3. SSL/TLS Certificate: [Let's Encrypt](docs/lets-encrypt.md)
4. Automation: [Kamal Deploy](docs/kamal-deploy.md) / [Ansible](docs/ansible.md)
5. Cloud: [Google Cloud](docs/google-cloud.md) / [Amazon Web Services](docs/amazon-web-services.md)
6. VPS: [IONOS](docs/ionos.md) / [Linode](docs/linode.md) / [DigitalOcean](docs/digitalocean.md) / [Amazon Lightsail](docs/amazon-lightsail.md)
7. Bare Metal: [Hetzner](docs/hetzner.md) / [Vultr](docs/vultr.md) / [Scaleway](docs/scaleway.md)

### Alternative: Web Frameworks

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

1. VCS/SCM: [Git](docs/git.md)
2. Runtime: [Node.js](docs/nodejs.md) / [Deno](docs/deno.md)
3. Format and Lint: [Biome](docs/biome.md) + [Ultracite](docs/ultracite.md) / [Prettier](docs/prettier.md) / [ESLint](docs/eslint.md) / [Oxc](docs/oxc.md)
4. Bundler: [Turbopack](docs/turbopack.md)
5. Monorepo: [moonrepo](docs/moonrepo.md) with [Changesets](docs/changesets.md)
6. Release: [autorc](docs/autorc.md)
7. Secrets and Environment Variables: [.env](docs/env.md) / [t3-env](docs/t3-env.md) / [unplugin-environment](docs/unplugin-environment.md)
8. Utility: [es-toolkit](docs/es-toolkit.md)
9. CLI and Prompt: [Term.Ink](docs/term-ink.md) / [Clack](docs/clack.md) / [Commander.js](docs/commanderjs.md) / [oclif](docs/oclif.md) / [Inquirer](docs/inquirer.md)
10. Performance: [Million.js](docs/millionjs.md)
11. Search: [Meilisearch](docs/meilisearch.md) / [Typesense](docs/typesense.md)
12. Process: [Effect](docs/effect.md)
13. Dependency: [Knip](docs/knip.md)
14. Logging: [pino](docs/pino.md)
15. Internationalization (i18n): [Lingui](docs/lingui.md)
16. Accessibility (a11y): [Lighthouse](docs/lighthouse.md)
17. Realtime: [SSE](docs/sse.md) / [Socket.IO](docs/socket-io.md) / [Liveblocks](docs/liveblocks.md) / [InstantDB](docs/instantdb.md) / [Electric](docs/electric.md)
18. Cache and Message Queues: [Redis](docs/redis.md) / [BullMQ](docs/bullmq.md) / In-Memory
19. Mobile: [React Native](docs/react-native.md) with [Expo](docs/expo.md)
20. Storage: Unix File System
21. Mailers: SMTP
22. Documentation: [Nextra](docs/nextra.md)

### Alternative: 3rd Party Services

1. Repo: [GitHub](docs/github.md) / [GitLab](docs/gitlab.md) / [Bitbucket](docs/bitbucket.md)
2. Payment:
   - International: [Polar](docs/polar.md) / [Lemon Squeezy](docs/lemonsqueezy.md) / [Stripe](docs/stripe.md)
   - Indonesia: [Xendit](docs/xendit.md) / [Midtrans](docs/midtrans.md)
3. Analytics: [DataFast](docs/datafast.md) / [PostHog](docs/posthog.md) / [Openpanel.dev](docs/openpanel.md) / [Simple Analytics](docs/simpleanalytics.md) / [Plausible](docs/plausible.md)
4. Service Monitoring: [OpenStatus](docs/openstatus.md) / [BetterStack](docs/betterstack.md)
5. Secrets and Environment Variables: [Infisical](docs/infisical.md) / [Doppler](docs/doppler.md)
6. File Storage/Upload: [Uploadcare](docs/uploadcare.md) / [Cloudinary](docs/cloudinary.md)
7. Avatar: [DiceBear](docs/dicebear.md) / [Gravatar](docs/gravatar.md)
8. Email Transactional: [Amazon SES](docs/amazon-ses.md) / [Resend](docs/resend.md) / [Nodemailer](docs/nodemailer.md) / [Plunk](docs/plunk.md)
9. Email Marketing/Newsletter: [Loops.so](docs/loops.md) / [Bento](docs/bento.md) / [Beehiiv](docs/beehiiv.md)
10. Email Tool: [VerifyRight](docs/verifyright.md)
11. Workflow: [Inngest](docs/inngest.md)
12. APM, Observability, Error Tracking: [Sentry](docs/sentry.md) + [OpenTelemetry](docs/opentelemetry.md)
13. Auth: [WorkOS](docs/workos.md) / [Clerk](docs/clerk.md)
14. Business Intelligence (BI): [Metabase](docs/metabase.md) / [Index.app](docs/index-app.md)
15. Webhook: [Svix](docs/svix.md)
16. Background Jobs: [Quirrel.dev](docs/quirrel-dev.md) / [Trigger.dev](docs/trigger-dev.md)
17. Link/URL Shortener/Management: [Dub.co](docs/dub-co.md)
18. Full-Text Search: [Meilisearch](docs/meilisearch.md)
19. Notification: [Novu](docs/novu.md)
20. Documentation: [Mintlify](docs/mintlify.md)
21. Automation: [n8n](docs/n8n.md)
22. API Key Management: [Unkey](docs/unkey.md)
23. WhatsApp: [Qontak](docs/qontak.md) / [Twilio](docs/twilio.md)

### Alternative: Communication Tools

1. Email: [Gmail](docs/gmail.md) / [Zero Email](docs/zero-email.md) / [HEY](docs/hey.md) / [ProtonMail](docs/protonmail.md)
2. Credentials: [Bitwarden](docs/bitwarden.md) / [Passbolt](docs/passbolt.md) / [LastPass](docs/lastpass.md) / [1Password](docs/1password.md)
3. Dotfiles: [Chezmoi](docs/chezmoi.md) / [Dotbot](docs/dotbot.md)
4. UI/UX Design: [Figma](docs/figma.md)
5. Communication & Community: [Telegram](docs/telegram.md) / [Discord](docs/discord.md) / [X (Twitter)](docs/x.md)
6. CRM: [Attio](docs/attio.md)
7. Business Database & MVP Builder: [Airtable](docs/airtable.md) / [Baserow](docs/baserow.md) / [NocoDB](docs/nocodb.md)
8. Product/Project Management: [Linear](docs/linear.md) / [Plane.so](docs/plane.md) / [Eververse.ai](docs/eververse-ai.md) / [Basecamp](docs/basecamp.md)
9. Docs: [Outline](docs/outline.md) / [Notion](docs/notion.md)
10. Social Media Management: [Buffer](docs/buffer.md) / [Mixpost](docs/mixpost.md) / [Postiz](docs/postiz.md)
11. Blog: [Hashnode](docs/hashnode.md) / [Ghost](docs/ghost.md)
12. Document: [DocuSeal](docs/docuseal.md) / [Papermark](docs/papermark.md)
13. Launcher: [Raycast](docs/raycast.md)
14. Accounting: [Bigcapital](docs/bigcapital.md)

## Guides

- [Workflow](docs/guides/workflow.md)
- [Tech Stack](docs/guides/tech-stack.md)
- [Domain-Driven Design](docs/guides/domain-driven-design.md)
- [UI Design System](docs/guides/ui-design-system.md)
- [UI Component Library](docs/guides/ui-component-library.md)

## Inspirations

Templates:

- [Built At Lightspeed](https://builtatlightspeed.com)
- [Better-T Stack](https://better-t-stack.amanv.dev)
- [T3 Stack](https://create.t3.gg)
- [Next-Forge](https://next-forge.com)
- [LaunchFast](https://launchfa.st)
- [Indiflow](https://indiflow.app)
- [Zero To Shipped](https://zerotoshipped.com)
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
