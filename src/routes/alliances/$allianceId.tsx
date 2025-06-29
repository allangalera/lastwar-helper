import { createFileRoute } from "@tanstack/solid-router";
import { getAlliance, getCharacter } from "~/service";

export const Route = createFileRoute("/alliances/$allianceId")({
  component: RouteComponent,
  loader: ({ params: { allianceId } }) => getAlliance({ data: allianceId }),
});

function RouteComponent() {
  const state = Route.useLoaderData();
  return (
    <>
      <pre>{JSON.stringify(state(), null, 2)}</pre>
    </>
  );
}
