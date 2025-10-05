import { ConvexQueryClient } from "@convex-dev/react-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { envClient } from "@/env";

const convex = new ConvexReactClient(envClient.VITE_CONVEX_URL, {
  expectAuth: true,
});
const convexQueryClient = new ConvexQueryClient(convex);

export default function AppConvexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProvider client={convexQueryClient.convexClient}>
      {children}
    </ConvexProvider>
  );
}

// ("use client");

// import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";
// import { ConvexReactClient } from "convex/react";
// import type { ReactNode } from "react";
// import { authClient } from "@/lib/auth-client";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!, {
//   // Optionally pause queries until the user is authenticated
//   // expectAuth: true,
// });

// export function ConvexClientProvider({ children }: { children: ReactNode }) {
//   return (
//     <ConvexBetterAuthProvider authClient={authClient} client={convex}>
//       {children}
//     </ConvexBetterAuthProvider>
//   );
// }
