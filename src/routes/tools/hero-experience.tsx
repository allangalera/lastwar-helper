import { createFileRoute, redirect } from "@tanstack/solid-router";

export const Route = createFileRoute("/tools/hero-experience")({
  component: RouteComponent,
  loader: () => {
    throw redirect({
      to: "/tools/hero-experience-calculator",
    });
  },
});

function RouteComponent() {
  return <div>Hello "/tools/hero-experience"!</div>;
}
