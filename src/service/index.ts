import { and, eq } from "drizzle-orm";
import { auth } from "../auth";
import { db } from "../db";
import {
  character,
  characterInsertSchema,
  alliance,
  allianceInsertSchema,
} from "../db/schema";
import { nanoid } from "nanoid";
import { createServerFn } from "@tanstack/solid-start";
import { getHeaders, setResponseStatus } from "@tanstack/solid-start/server";

export const getAlliances = createServerFn().handler(async () => {
  const headers = getHeaders();
  const session = await auth.api.getSession({
    // @ts-expect-error
    headers: headers,
  });

  if (!session?.session) {
    setResponseStatus(401);
    return;
  }

  return await db
    .select()
    .from(alliance)
    .where(eq(alliance.userId, session?.user.id!));
});

export const getCharacters = createServerFn().handler(async () => {
  const headers = getHeaders();
  const session = await auth.api.getSession({
    // @ts-expect-error
    headers: headers,
  });

  if (!session?.session) {
    setResponseStatus(401);
    return;
  }

  return await db
    .select()
    .from(character)
    .where(eq(character.userId, session?.user.id!));
});
export const getCharacter = createServerFn()
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const headers = getHeaders();
    const session = await auth.api.getSession({
      // @ts-expect-error
      headers: headers,
    });

    if (!session?.session) {
      setResponseStatus(401);
      return;
    }

    return await db.query.character.findFirst({
      where: and(
        eq(character.id, ctx.data),
        eq(character.userId, session?.user.id!)
      ),
    });
  });

export const getAlliance = createServerFn()
  .validator((data: string) => data)
  .handler(async (ctx) => {
    const headers = getHeaders();
    const session = await auth.api.getSession({
      // @ts-expect-error
      headers: headers,
    });

    if (!session?.session) {
      setResponseStatus(401);
      return;
    }

    return await db.query.alliance.findFirst({
      where: and(
        eq(alliance.id, ctx.data),
        eq(alliance.userId, session?.user.id!)
      ),
    });
  });

const addAllianceSchema = allianceInsertSchema.pick({
  name: true,
});

export const addAlliance = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return addAllianceSchema.parse(data);
  })
  .handler(async (ctx) => {
    const headers = getHeaders();
    const session = await auth.api.getSession({
      // @ts-expect-error
      headers: headers,
    });

    if (!session?.session) {
      setResponseStatus(401);
      return;
    }

    const allianceToAdd = allianceInsertSchema.parse({
      id: nanoid(),
      userId: session?.user.id!,
      name: ctx.data.name,
    });

    await db.insert(alliance).values(allianceToAdd);

    return allianceToAdd;
  });
const addCharacterSchema = characterInsertSchema.pick({
  name: true,
  combatPower: true,
});

export const addCharacter = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return addCharacterSchema.parse(data);
  })
  .handler(async (ctx) => {
    const headers = getHeaders();
    const session = await auth.api.getSession({
      // @ts-expect-error
      headers: headers,
    });

    if (!session?.session) {
      setResponseStatus(401);
      return;
    }

    const characterToAdd = characterInsertSchema.parse({
      id: nanoid(),
      userId: session?.user.id!,
      name: ctx.data.name,
      combatPower: ctx.data.combatPower,
    });
    await db.insert(character).values(characterToAdd);

    return characterToAdd;
  });

// export const deleteAlliance = action(async (formData: FormData) => {
//   const event = getRequestEvent();
//   const session = await auth.api.getSession({
//     headers: event?.request.headers!,
//   });

//   if (!session?.session) {
//     return json(undefined, {
//       status: 401,
//     });
//   }

//   const allianceId = formData.get("id") as string;

//   await db
//     .delete(alliance)
//     .where(
//       and(eq(alliance.id, allianceId), eq(alliance.userId, session?.user.id!))
//     );
// }, "deleteAlliance");

// export const addCharacter = action(async (formData: FormData) => {
//   const event = getRequestEvent();
//   const session = await auth.api.getSession({
//     headers: event?.request.headers!,
//   });

//   if (!session?.session) {
//     return json(undefined, {
//       status: 401,
//     });
//   }

//   const characterToAdd = characterInsertSchema.parse({
//     id: nanoid(),
//     userId: session?.user.id!,
//     name: formData.get("name") as string,
//     combatPower: formData.get("combatPower") as string,
//   });
//   await db.insert(character).values(characterToAdd);
// }, "addCharacter");

// export const deleteCharacter = action(async (formData: FormData) => {
//   const event = getRequestEvent();
//   const session = await auth.api.getSession({
//     headers: event?.request.headers!,
//   });

//   if (!session?.session) {
//     return json(undefined, {
//       status: 401,
//     });
//   }

//   const characterId = formData.get("id") as string;

//   await db
//     .delete(character)
//     .where(
//       and(
//         eq(character.id, characterId),
//         eq(character.userId, session?.user.id!)
//       )
//     );
// }, "deleteCharacter");
