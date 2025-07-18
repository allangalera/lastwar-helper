import { createFileRoute } from "@tanstack/solid-router";
import { HeroExperienceUpgradePlanner } from "~/modules/tool-hero-experience/hero-experience-upgrade-planner";

export const Route = createFileRoute("/tools/hero-experience-upgrade-planner")({
  component: RouteComponent,
  ssr: "data-only",
});

function RouteComponent() {
  return <HeroExperienceUpgradePlanner />;
}
