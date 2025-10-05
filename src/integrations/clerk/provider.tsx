import { ClerkProvider } from "@clerk/clerk-react";
import { shadcn as clerkShadcnTheme } from "@clerk/themes";
import { envClient } from "@/env";

export default function AppClerkProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      afterSignOutUrl="/"
      appearance={{
        baseTheme: clerkShadcnTheme,
        signIn: {
          baseTheme: clerkShadcnTheme,
        },
      }}
      publishableKey={envClient.VITE_CLERK_PUBLISHABLE_KEY}
    >
      {children}
    </ClerkProvider>
  );
}
