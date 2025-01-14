# Recipe: Web App

A web app is a software application that runs in a web browser and is accessed through a web browser. It can be accessed on a desktop, laptop, tablet, or mobile device.

- [Features](#features)
- [Tech Stack](#tech-stack)
- [References](#references)

## Features

- Web Pages
  - Home: `/`
  - About: `/about`
  - Contact: `/contact`
  - Sitemap: `/sitemap`
  - Redirects: `/redirects`
  - Legal: `/legal`
    - Privacy Policy: `/legal/privacy`
    - Terms of Service: `/legal/terms`
    - Cookie Policy: `/legal/cookies`
    - Usage Policy: `/legal/usage`
    - Security Policy: `/legal/security`
- Parts
  - Logo
  - Header
  - Hero
  - CTA
  - Footer
    - Sitemap
    - Status Monitor
- Contents
  - Create Item
  - Read Item
  - Update Item
  - Delete Item
  - Search Items
  - Filter Items
  - Sort Items
  - Pagination
- Auth
  - Authentication
    - Register, Login, Logout
    - Password Login & Reset
    - Passwordless Login: Email, OTP, Magic Link
    - Social Login: Google, GitHub, Facebook
    - Single Sign-On (SSO): Login once and gain access to multiple applications without re-authenticating
    - Two-Factor Authentication (2FA)
  - Authorization
    - Access Control: RBAC, ABAC, ACL
    - Session Management
    - API Keys
  - Account Management
    - Email Verification
    - Account Deletion & Recovery
- User Management
  - Profile
    - Avatar
    - Name
    - Bio
    - Social Links
  - Settings
    - Preferences
    - Notifications
    - Privacy
    - Security
    - Billing
- API
  - REST API
  - GraphQL API
  - WebSocket
- Integration
  - Payment
  - Notification
- Docs
  - API Docs
  - Guide
- Publication
  - Newsletter
  - Feedback

## Tech Stack

Tool:

- [TypeScript](../typescript.md)
- [Bun](../bun.md)
- [Vite](../vite.md)

Client, Web:

- [React](../react.md)
- [React Router Framework](../react-router.md)

Styling, UI:

- [Tailwind CSS](../tailwind.md)
- [shadcn/ui](../shadcn-ui.md)
- [Motion](../motion.md)

Form, Data Validation:

- [Conform](../conform.md)
- [Zod](../zod.md)

Server, Database, Auth:

- [Hono](../hono.md)
- [Prisma ORM](../prisma.md)
- [ZenStack](../zenstack.md)
- [PostgreSQL](../postgresql.md)

Analytics, Monitoring, Logging:

- [Seline](../seline.md)
- [Posthog](../posthog.md)
- [Better Stack](../betterstack.md)
- [Sentry](../sentry.md)

Content:

- [Directus](../directus.md)
- [MDX](../mdx.md)

Deployment:

- [Docker](../docker.md)
- [Vercel](../vercel.md)
- [Render](../render.md)

Testing:

- [Vitest](../vitest.md)
- [Playwright](../playwright.md)

Extra:

- [`json-edit-react`](../json.md)

## References

- [UI Components](../guides/ui-components.md)
