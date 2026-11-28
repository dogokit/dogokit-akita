// Minimal example only. It shows an app that uses a workspace package.
import { greet } from "@dogokit/utils"

const app = document.querySelector("#app")

if (app) app.textContent = greet("Dogokit Akita")
