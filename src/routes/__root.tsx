/// <reference types="vite/client" />
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/solid-router";
import { QueryClientProvider } from "@tanstack/solid-query";
import { MyRouterContext, queryClient } from "~/router";
import appCss from "../styles/app.css?url";
import themeJs from "../lib/theme?url";
import { Shell } from "~/components/shell";

function NotFound() {
  return <p>404 - Not found</p>;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Last War Helper",
      },
    ],
    scripts: [{ src: themeJs }],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return (
    <QueryClientProvider client={queryClient}>
      <Shell>
        <Outlet />
      </Shell>
    </QueryClientProvider>
  );
}
