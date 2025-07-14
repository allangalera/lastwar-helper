import { createFileRoute } from "@tanstack/solid-router";
import { ToolHeroExperience } from "~/modules/tool-hero-experience/tool-hero-experience";

export const Route = createFileRoute("/tools/hero-experience")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ToolHeroExperience />;
}
