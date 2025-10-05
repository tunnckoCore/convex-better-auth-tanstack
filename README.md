## convex-better-auth-tanstack

Convex with Better-Auth component, on a TanStack Start.

# Getting Started

```
bun install
# populate .env.example and rename
bunx convex dev
bun dev
```

and then navigate to `http://localhost:3000/sign-up`

when submit, it errors with

```
AbortError: This operation was aborted
    at node:internal/deps/undici/undici:13502:13
    ... 9 lines matching cause stack trace ...
    at async file:///home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-plugin-core/dist/esm/dev-server-plugin/plugin.js:64:30 {
  cause: DOMException [AbortError]: This operation was aborted
      at node:internal/deps/undici/undici:13502:13
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async eval (/home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-server-core/src/createStartHandler.ts:458:22)
      at async next (/home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-server-core/src/createStartHandler.ts:476:16)
      at async handleServerRoutes (/home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-server-core/src/createStartHandler.ts:421:15)
      at async eval (/home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-server-core/src/createStartHandler.ts:239:32)
      at async eval (/home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-server-core/src/createStartHandler.ts:165:26)
      at async eval (/home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-server-core/src/createStartHandler.ts:458:22)
      at async next (/home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-server-core/src/createStartHandler.ts:476:16)
      at async startRequestResolver (/home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-server-core/src/createStartHandler.ts:263:17)
      at async file:///home/charlike/code/sept-2025/convex-better-auth-tanstack/node_modules/@tanstack/start-plugin-core/dist/esm/dev-server-plugin/plugin.js:64:30,
  status: 500,
  statusText: undefined,
  headers: undefined,
  data: undefined,
  body: undefined,
  unhandled: true
}


```
