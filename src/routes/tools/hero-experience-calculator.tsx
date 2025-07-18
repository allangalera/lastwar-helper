import { createFileRoute } from "@tanstack/solid-router";
import { HeroExperienceCalculator } from "~/modules/tool-hero-experience/hero-experience-calculator";

export const Route = createFileRoute("/tools/hero-experience-calculator")({
  component: RouteComponent,
});

function RouteComponent() {
  return <HeroExperienceCalculator />;
}
