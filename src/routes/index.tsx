import { Title } from "@solidjs/meta";
import { action, createAsync, query, useSubmission } from "@solidjs/router";
import { and, eq } from "drizzle-orm";
import { For, getRequestEvent } from "solid-js/web";
import { auth } from "~/auth";
import { Authentication } from "~/components/authentication";
import { db } from "~/db";
import {
  character,
  characterInsertSchema,
  alliance,
  allianceInsertSchema,
} from "~/db/schema";
import { nanoid } from "nanoid";

const getAlliances = query(async () => {
  "use server";
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event?.request.headers!,
  });

  return await db
    .select()
    .from(alliance)
    .where(eq(alliance.userId, session?.user.id!));
}, "alliances");

const addAlliance = action(async (formData: FormData) => {
  "use server";
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event?.request.headers!,
  });

  const allianceToAdd = allianceInsertSchema.parse({
    id: nanoid(),
    userId: session?.user.id!,
    name: formData.get("name"),
  });

  await db.insert(alliance).values(allianceToAdd);
}, "addAlliance");

const deleteAlliance = action(async (formData: FormData) => {
  "use server";
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event?.request.headers!,
  });

  const allianceId = formData.get("id") as string;

  await db
    .delete(alliance)
    .where(
      and(eq(alliance.id, allianceId), eq(alliance.userId, session?.user.id!))
    );
}, "deleteAlliance");

const getCharacters = query(async () => {
  "use server";
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event?.request.headers!,
  });

  return await db
    .select()
    .from(character)
    .where(eq(character.userId, session?.user.id!));
}, "characters");

const addCharacter = action(async (formData: FormData) => {
  "use server";
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event?.request.headers!,
  });

  const characterToAdd = characterInsertSchema.parse({
    id: nanoid(),
    userId: session?.user.id!,
    name: formData.get("name") as string,
    combatPower: formData.get("combatPower") as string,
  });
  await db.insert(character).values(characterToAdd);
}, "addCharacter");

const deleteCharacter = action(async (formData: FormData) => {
  "use server";
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event?.request.headers!,
  });

  const characterId = formData.get("id") as string;

  await db
    .delete(character)
    .where(
      and(
        eq(character.id, characterId),
        eq(character.userId, session?.user.id!)
      )
    );
}, "deleteCharacter");

export default function Home() {
  const characters = createAsync(() => getCharacters());
  const alliances = createAsync(() => getAlliances());
  const submission = useSubmission(addCharacter);
  return (
    <main>
      <Title>Hello World</Title>
      <Authentication />
      <p>characters</p>
      <form action={addCharacter} method="post">
        <label>
          Name:
          <input name="name" />
        </label>
        <label>
          Combat power:
          <input name="combatPower" />
        </label>
        <button disabled={submission.pending}>
          {submission.pending ? "Adding..." : "Add Character"}
        </button>
      </form>
      <For each={characters()}>
        {(item) => (
          <div>
            {item.name}
            {item.combatPower}
            <div>
              <form action={deleteCharacter} method="post">
                <input name="id" value={item.id} type="hidden" />
                <button>delete</button>
              </form>
            </div>
          </div>
        )}
      </For>
      <p>Alliances</p>
      <form action={addAlliance} method="post">
        <label>
          Name:
          <input name="name" />
        </label>
        <button disabled={submission.pending}>
          {submission.pending ? "Adding..." : "Add Alliance"}
        </button>
      </form>
      <For each={alliances()}>
        {(item) => (
          <div>
            {item.name}
            <div>
              <form action={deleteAlliance} method="post">
                <input name="id" value={item.id} type="hidden" />
                <button>delete</button>
              </form>
            </div>
          </div>
        )}
      </For>
    </main>
  );
}
