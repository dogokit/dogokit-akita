# Steps

> 🚧 WIP

Steps to know, check, or redo.

## Prerequisites

### OS-level

Choose one for each category.

1. Code editor
2. Terminal app
3. Version control
4. JavaScript runtime

### Account-level

Choose one for each category.

1. Email
2. Credential manager
3. Repository
4. Deployment
5. Secrets manager

## Git

Initialize or clone the repo. Preferably with SSH URL.

```sh
git clone git@github.com:dogokit/dogokit-akita.git
```

Ignore some files.

```txt
.gitignore
```

## README

```txt
README.md
```

## LICENSE

```txt
LICENSE
```

## Code of Conduct

```txt
CODE_OF_CONDUCT.md
```

## `package.json`

Check for the dependencies.

Check the scripts for:

- App-related tasks
- `check:*`: Code check commands
- `fix:*`: Code fix commands
- `db:*`: Database-related commands

## Node.js Dependencies with pnpm

```sh
npm install -g pnpm
```

```sh
bun install
```

Can also check the version updates with `taze`:

```sh
bun taze
```

## Prettier

Formatter with various plugins.

```txt
.prettierrc.js
```

## ESLint

Linter with various plugins.

```txt
.eslintrc.cjs
```

Note that ESLint does not support ESM
[configuration](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats)
at this time.

## Stylelint

```txt
.stylelintrc
```

## commitlint

```txt
.commitlintrc
```

## TypeScript

```txt
tsconfig.json
```

## Remix Config

```txt
remix.config.js
```

Also to enable `tailwind` and `postcss`.

## Favicons

Use [Real Favicon Generator](https://realfavicongenerator.net).

Remove the `site.webmanifest` file as in Remix it will be handled dynamically.

Use TinyPNG to compress the images.

Configure in Remix `root.tsx`

## Tailwind CSS & PostCSS

```sh
bun install -D tailwindcss postcss autoprefixer
bun install -D @tailwindcss/typography @tailwindcss/forms tailwindcss-animate
```

```txt
tailwind.config.ts
postcss.config.js
```

## Radix UI

No config necessary.

But if install the packages manually:

```sh
bun install @radix-ui/react-slot
```

## shadcn UI

> Skip this if not prefer to use it.

Automatically setup Tailwind CSS, PostCSS, Radix UI, Class Variance Authority, clsx, Tailwind Merge,
and more.

```sh
pnpx shadcn-ui@latest init
```

But if install the packages manually:

```sh
bun install class-variance-authority clsx tw-merge
```

Then follow the next installation steps. The components are configured in:

```txt
components.json
```

Then can install the UI component as needed:

```sh
pnpx shadcn-ui@latest add component-name
```

## Progress Bar

...

## Icons

shadcn UI install Lucide React icons by default, which can be removed and replaced.

Use Iconify (`@iconify/react`) to get any popular icons via [Icônes](https://icones.js.org).

## Fonts

Use [Fontsource](https://fontsource.org) to install the font locally without using online-required
[Google Fonts](https://fonts.google.com).

```sh
bun install @fontsource-variable/font-name
# or
bun install @fontsource/font-name
```

## Theme Mode

TBA

## Docker

TBA

## Docker Compose

```txt
docker-compose.yml
```

```sh
docker compose up -d
```

## PostgresQL on a Docker container

🚧

## PostgresQL on hosted services

🚧

## Environment Variable

```txt
.env.example
```

For local development:

```txt
.env.local
```

For production copy if needed:

```txt
.env.production
```

## Prisma ORM

```sh
bun db:push
bun db:reset
bun db:generate
bun db:seed
bun db:studio
bun db:docs
```

---

## Extra

Some extra stuffs are below.

## VS Code

- Change workspace color
- Install recommended extensions

## Remix Forge

VS Code extension to generate configurable Remix code.

[Code-Forge-Net/Remix-Forge](https://github.com/Code-Forge-Net/Remix-Forge)

## Remix Dev Tools

[Code-Forge-Net/Remix-Dev-Tools](https://github.com/Code-Forge-Net/Remix-Dev-Tools)
