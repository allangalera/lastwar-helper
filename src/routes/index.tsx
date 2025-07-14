import { createFileRoute, Link } from "@tanstack/solid-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Link to="/tools/hero-experience">Hero experience calculator</Link>
    </>
  );
}
