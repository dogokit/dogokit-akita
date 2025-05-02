# React Router

React Router is the most popular routing library and framework for React.

Links:

- [React Router v7](https://reactrouter.com)
- [React Router v7 Docs/Home](https://reactrouter.com/home)
- [`sergiodxa/react-router-color-scheme-example`](https://github.com/sergiodxa/react-router-color-scheme-example): React Router + Color Scheme Example
- [Remix v2](https://remix.run)
- [Remix Utils v8](https://sergiodxa.github.io/remix-utils)

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
