import { createAsync, query, useParams } from "@solidjs/router";
import { getRequestEvent, Show } from "solid-js/web";
import { auth } from "~/auth";
import { db } from "~/db";
import { character } from "~/db/schema";
import { eq, and } from "drizzle-orm";

const getCharacter = query(async (id: string) => {
  "use server";
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event?.request.headers!,
  });

  return await db.query.character.findFirst({
    where: and(eq(character.id, id), eq(character.userId, session?.user.id!)),
  });
}, "character");

export default function CharacterDetails() {
  const params = useParams();
  const character = createAsync(() => getCharacter(params.id));

  return (
    <Show when={character()} fallback={<p>Character not found</p>}>
      <main>
        <pre>{JSON.stringify(character(), null, 4)}</pre>
      </main>
    </Show>
  );
}
