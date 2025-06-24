import { createFileRoute, Link } from "@tanstack/solid-router";
import { Authentication } from "../components/authentication";
import { getAlliances, getCharacters } from "../service";
import { For } from "solid-js";
import { AddAllianceForm } from "~/components/add-alliance-form";
import { AddCharacterForm } from "~/components/add-character-form";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => {
    const [alliances, characters] = await Promise.all([
      getAlliances(),
      getCharacters(),
    ]);

    return {
      alliances,
      characters,
    };
  },
});

function Home() {
  const state = Route.useLoaderData();

  const alliances = () => state().alliances;
  const characters = () => state().characters;
  return (
    <>
      <Link to="/">Home</Link>
      <Authentication />
      <p>characters</p>
      <AddCharacterForm />
      <For each={characters()}>
        {(item) => (
          <div>
            <a href={`/characters/${item.id}`}>{item.name}</a>
            {item.combatPower}
            <div>
              <form method="post">
                <input name="id" value={item.id} type="hidden" />
                <button>delete</button>
              </form>
            </div>
          </div>
        )}
      </For>
      <p>Alliances</p>
      <AddAllianceForm />
      <For each={alliances()}>
        {(item) => (
          <div>
            <a href={`/alliances/${item.id}`}>{item.name}</a>
            <div>
              <form method="post">
                <input name="id" value={item.id} type="hidden" />
                <button>delete</button>
              </form>
            </div>
          </div>
        )}
      </For>
    </>
  );
}
