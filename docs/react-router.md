# React Router

React Router is the most popular routing library and framework for React.

Links:

- [React Router v7](https://reactrouter.com)
- [React Router v7 Docs/Home](https://reactrouter.com/home)
- [`sergiodxa/react-router-color-scheme-example`](https://github.com/sergiodxa/react-router-color-scheme-example): React Router + Color Scheme Example
- [Remix v2](https://remix.run)
- [Remix Utils v8](https://sergiodxa.github.io/remix-utils)
- [How to Get React Router v7 to Work with AI - React Tips with Brooks Lybrand on YouTube](https://www.youtube.com/watch?v=gkBjxB_3kDs)

## Special Files: Entry Client/Server

If you don't see `entry.client.tsx` or `entry.server.tsx` in your app directory, you're using a default entry. Reveal it with this cli command:

```sh
react-router reveal
```

- [Special Files - React Router](https://reactrouter.com/explanation/special-files#entryclienttsx)

## Remix Utils

This package contains simple utility functions to use with React Router. Below are the notable ones.

- `promiseHash`
- `jsonHash`
- `timeout`
- `cors`
- `csrf`
- `safeRedirect`
- `redirectBack`
- `createTypedCookie`
- `sse`
  - `eventStream`
  - `interval`
  - `useEventSource`
- `rollingCookie`
- `useDelegatedAnchors`
- `useDebounceFetcher` and `useDebounceSubmit`
- `ExistingSearchParams`
- `PrefetchPageAnchors`
- `Honeypot`, `honeypot`, `HoneypotProvider`, `HoneypotInputs`

Priority:

1. Security (`cors`, `csrf`, `safeRedirect`, `redirectBack`, `honeypot`)
2. Data loading (`promiseHash`, `jsonHash`, `timeout`)
3. Session/cookie management (`createTypedCookie`, `rollingCookie`)
4. Real-time (`sse` utilities)
5. Performance/UX (`useDebounceFetcher`, `useDebounceSubmit`, `PrefetchPageAnchors`)

## Auto Color Scheme

To implement auto color scheme and toggle. The app starts using the color scheme of the user's operating system. The user can toggle between light and dark modes using a button, or go back to the system default.

To support this, we use a cookie to store the user's preference, the cookie is typed to have three possible values: `light`, `dark`, and `system`.

If the cookie is not set, or if the value is `system`, we use the `prefers-color-scheme` media query to determine the color scheme. If the value is `light` or `dark`, we use that value instead.

To support this, we override the `dark:` variant on the Tailwind configuration to work with both `.dark` class or `.system` class + media query.

```scss
@custom-variant dark {
  /* This supports the .dark class */
  &:where(.dark *, .dark) {
    @slot;
  }

  /* This supports the .system class + media query */
  &:where(.system *, .system) {
    @media (prefers-color-scheme: dark) {
      @slot;
    }
  }
}
```

This approach doesn't use any JavaScript to determine the color scheme, and doesn't have a flash of uncorrect color scheme on page load because we can read the cookie value on the server side and set the initial class on the HTML element.

And since for the `.system` class we use the `prefers-color-scheme` media query in CSS, the browser will automatically render the correct colors when the page loads, instead of needing to inject an inline script in the `<head>` to read the `window.matchMedia` value and set the class on the HTML element.

Files to check:

- `app/app.css`
- `app/color-scheme-cookie.ts`
- `app/root.tsx`
- `app/routes/home.tsx`
