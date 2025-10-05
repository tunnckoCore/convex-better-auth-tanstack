// import { reactStartHandler } from "@convex-dev/better-auth/react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        return manualHandler(request);
      },
      GET: async ({ request }) => {
        return manualHandler(request);
      },
    },
  },
});

function manualHandler(request: Request, opts?: { convexSiteUrl?: string }) {
  const requestUrl = new URL(request.url);
  const convexSiteUrl = opts?.convexSiteUrl ?? process.env.VITE_CONVEX_SITE_URL;
  if (!convexSiteUrl) {
    throw new Error("VITE_CONVEX_SITE_URL is not set");
  }
  const nextUrl = `${convexSiteUrl}${requestUrl.pathname}${requestUrl.search}`;
  request.headers.set("accept-encoding", "application/json");

  return fetch(nextUrl, {
    method: request.method,
    headers: request.headers,
    body:
      request.method !== "GET" && request.method !== "HEAD"
        ? request.body
        : undefined,
    redirect: "manual",
    // @ts-expect-error - duplex is required for streaming request bodies in modern fetch
    duplex: "half",
  });
}
