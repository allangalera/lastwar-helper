import { createFileRoute } from "@tanstack/solid-router";
import { getCharacter } from "~/service";

export const Route = createFileRoute("/characters/$characterId")({
  component: RouteComponent,
  loader: ({ params: { characterId } }) => getCharacter({ data: characterId }),
});

function RouteComponent() {
  const state = Route.useLoaderData();
  return (
    <>
      <pre>{JSON.stringify(state(), null, 2)}</pre>
    </>
  );
}
