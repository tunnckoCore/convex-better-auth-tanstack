import { ConvexQueryClient } from "@convex-dev/react-query";
import { notifyManager, QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { DefaultCatchBoundary } from "./components/DefaultCatchBoundary";
import { envClient } from "./env";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
  if (typeof document !== "undefined" && typeof window !== "undefined") {
    notifyManager.setScheduler(window.requestAnimationFrame);
  }

  const convexReactClient = new ConvexReactClient(envClient.VITE_CONVEX_URL, {
    unsavedChangesWarning: false,
    // expectAuth: true,
  });
  const convexQueryClient = new ConvexQueryClient(convexReactClient);

  const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
      },
    },
  });
  convexQueryClient.connect(queryClient);

  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    context: {
      queryClient,
      convexClient: convexReactClient,
      convexQueryClient,
    },
    Wrap: ({ children }) => (
      <ConvexProvider client={convexQueryClient.convexClient}>
        {children}
      </ConvexProvider>
    ),
    scrollRestoration: true,
  });
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  });

  return router;
};
