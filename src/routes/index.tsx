import { createFileRoute, Link } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Link to="/tools/hero-experience-calculator">
        Hero experience calculator
      </Link>
      <Link to="/tools/hero-experience-upgrade-planner">
        Hero experience upgrade planner
      </Link>
    </>
  );
}
