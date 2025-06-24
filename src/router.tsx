// src/router.tsx
import { createRouter as createTanStackRouter } from "@tanstack/solid-router";
import { routeTree } from "./routeTree.gen";
import { QueryClient } from "@tanstack/solid-query";

export const queryClient = new QueryClient();

export interface MyRouterContext {
  queryClient: typeof queryClient;
}

export function createRouter() {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {
      queryClient,
    },
  });

  return router;
}

declare module "@tanstack/solid-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
