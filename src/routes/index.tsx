import { createFileRoute, Link } from "@tanstack/solid-router";
import { Authentication } from "../components/authentication";
import {
  getAlliancesQueryOptions,
  getCharactersQueryOptions,
} from "../service";
import { createMemo, For } from "solid-js";
import { AddAllianceForm } from "~/components/add-alliance-form";
import { AddCharacterForm } from "~/components/add-character-form";
import { useQuery } from "@tanstack/solid-query";
import { AlliancesListItem } from "~/components/alliances-list-item";
import { CharacterListItem } from "~/components/character-list-item";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    await Promise.allSettled([
      context.queryClient.ensureQueryData(getAlliancesQueryOptions),
      context.queryClient.ensureQueryData(getCharactersQueryOptions),
    ]);
  },
});

function Home() {
  const getAlliancesQuery = useQuery(() => getAlliancesQueryOptions);
  const getCharactersQuery = useQuery(() => getCharactersQueryOptions);

  const alliances = createMemo(() => {
    if (getAlliancesQuery.data) {
      return getAlliancesQuery.data;
    } else {
      return [];
    }
  });
  const characters = createMemo(() => {
    if (getCharactersQuery.data) {
      return getCharactersQuery.data;
    } else {
      return [];
    }
  });
  return (
    <>
      <Link to="/">Home</Link>
      <Authentication />
      <p>characters</p>
      <AddCharacterForm />
      <For each={characters()}>
        {(item) => (
          <CharacterListItem
            id={item.id}
            name={item.name!}
            combatPower={item.combatPower!}
          />
        )}
      </For>
      <p>Alliances</p>
      <AddAllianceForm />
      <For each={alliances()}>
        {(item) => <AlliancesListItem id={item.id} name={item.name!} />}
      </For>
    </>
  );
}
