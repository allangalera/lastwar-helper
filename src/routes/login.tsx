import { createFileRoute } from "@tanstack/solid-router";
import { Authentication } from "../components/authentication";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Authentication />
      Hello "/login"!
    </div>
  );
}
