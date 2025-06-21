import { createAsync, query, useParams } from "@solidjs/router";
import { getRequestEvent, Show } from "solid-js/web";
import { auth } from "~/auth";
import { db } from "~/db";
import { alliance } from "~/db/schema";
import { eq, and } from "drizzle-orm";

const getAlliance = query(async (id: string) => {
  "use server";
  const event = getRequestEvent();
  const session = await auth.api.getSession({
    headers: event?.request.headers!,
  });

  return await db.query.alliance.findFirst({
    where: and(eq(alliance.id, id), eq(alliance.userId, session?.user.id!)),
  });
}, "alliance");

export default function AllianceDetails() {
  const params = useParams();
  const alliance = createAsync(() => getAlliance(params.id));

  return (
    <Show when={alliance()} fallback={<p>Alliance not found</p>}>
      <main>
        <pre>{JSON.stringify(alliance(), null, 4)}</pre>
      </main>
    </Show>
  );
}
