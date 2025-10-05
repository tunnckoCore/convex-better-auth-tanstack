import { convexClient } from "@convex-dev/better-auth/client/plugins";
// import {
//   anonymousClient,
//   // emailOTPClient,
//   // magicLinkClient,
//   twoFactorClient,
// } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// import { envClient } from "@/env";

const APP_URL =
  process.env.APP_URL ||
  process.env.VITE_APP_URL ||
  import.meta.env.APP_URL ||
  import.meta.env.VITE_APP_URL ||
  "http://localhost:3000";

export const authClient = createAuthClient({
  baseURL: APP_URL,
  plugins: [
    // magicLinkClient(),
    // emailOTPClient(),
    // twoFactorClient(),
    // anonymousClient(),
    convexClient(),
  ],
});
