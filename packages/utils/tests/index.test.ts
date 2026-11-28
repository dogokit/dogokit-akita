import { expect, test } from "vite-plus/test"

import { greet } from "../src/index.ts"

test("greet", () => {
  expect(greet("Akita")).toBe("Hello, Akita!")
})
