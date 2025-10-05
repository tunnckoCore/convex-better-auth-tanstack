import { convexClient } from "@convex-dev/better-auth/client/plugins";
// import {
//   anonymousClient,
//   // emailOTPClient,
//   // magicLinkClient,
//   twoFactorClient,
// } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { envClient } from "@/env";

export const authClient = createAuthClient({
  baseURL: envClient.VITE_APP_URL,
  plugins: [
    // magicLinkClient(),
    // emailOTPClient(),
    // twoFactorClient(),
    // anonymousClient(),
    convexClient(),
  ],
});
