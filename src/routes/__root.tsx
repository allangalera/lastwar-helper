import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/solid-router";

function NotFound() {
  return <p>404 - Not found</p>;
}

export const Route = createRootRoute({
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
  }),
  component: RootComponent,
  notFoundComponent: NotFound,
});

function RootComponent() {
  return <Outlet />;
}
