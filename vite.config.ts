import { defineConfig } from "vite-plus"

export default defineConfig({
  fmt: {
    semi: false,
    singleQuote: false,
    jsxSingleQuote: false,
    tabWidth: 2,
    useTabs: false,
    printWidth: 80,
    trailingComma: "all",
    arrowParens: "avoid",
    bracketSameLine: false,
    bracketSpacing: true,
    embeddedLanguageFormatting: "auto",
    endOfLine: "lf",
    htmlWhitespaceSensitivity: "css",
    proseWrap: "always",
    quoteProps: "as-needed",
    singleAttributePerLine: false,
    sortPackageJson: true,
    sortImports: {
      internalPattern: ["^~"],
      groups: [
        "builtin",
        "external",
        "internal",
        ["parent", "sibling", "index"],
        "style",
        "unknown",
      ],
      newlinesBetween: true,
    },
    sortTailwindcss: true,
    overrides: [
      {
        files: ["**/*.md", "**/*.json"],
        options: {
          useTabs: false,
        },
      },
      {
        files: ["**/*.md"],
        options: {
          proseWrap: "preserve",
        },
      },
    ],
    ignorePatterns: [".claude/**"],
  },
  lint: {
    ignorePatterns: [".claude/**"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
    },
  },
})
