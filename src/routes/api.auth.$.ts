import { reactStartHandler } from "@convex-dev/better-auth/react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        return reactStartHandler(request);
      },
      GET: async ({ request }) => {
        return reactStartHandler(request);
      },
    },
  },
});
