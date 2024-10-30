# Hono

Hono (means flame🔥 in Japanese) is a small, simple, and ultrafast web framework built on Web Standards. It works on any JavaScript runtime: Node.js, Deno, Bun, Cloudflare Workers, Fastly Compute, Vercel, Netlify, AWS Lambda, Lambda@Edge, and more.

Fast, but not only fast.

```ts
import { Hono } from "hono";
const app = new Hono();

app.get("/", (c) => c.json({ message: "Hello!" }));

export default app;
```

Read the official [Get Started](https://hono.dev/docs) guide.

References:

- [Hono Examples](https://hono.dev/guides/examples)
- [Hono Best Practices](https://hono.dev/docs/guides/best-practices)
- [Build an HTTP server using Hono and Bun](https://bun.sh/guides/ecosystem/hono)

Recommended packages:

- [`@hono/zod-openapi`: Hono Zod OpenAPI](https://hono.dev/examples/zod-openapi)
  - [`@hono/swagger-ui`: Hono Swagger UI Middleware](https://hono.dev/examples/swagger-ui)
  - [`@scalar/hono-api-reference`: Scalar Hono API Reference Plugin](https://npmjs.com/package/@scalar/hono-api-reference)
  - [`stoker`: Utilities for Hono and @hono/zod-openapi](https://github.com/w3cj/stoker)
