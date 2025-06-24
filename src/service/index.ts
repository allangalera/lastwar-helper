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
import { queryOptions } from "@tanstack/solid-query";

export const getAlliancesQueryOptions = queryOptions({
  queryKey: ["getAlliances"],
  queryFn: () => getAlliances(),
});

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
export const getCharactersQueryOptions = queryOptions({
  queryKey: ["getCharacters"],
  queryFn: () => getCharacters(),
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

const deleteAllianceSchema = allianceInsertSchema.pick({
  id: true,
});

export const deleteAlliance = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return deleteAllianceSchema.parse(data);
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

    await db
      .delete(alliance)
      .where(
        and(
          eq(alliance.id, ctx.data.id),
          eq(alliance.userId, session?.user.id!)
        )
      );
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

const deleteCharacterSchema = characterInsertSchema.pick({
  id: true,
});

export const deleteCharacter = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    return deleteCharacterSchema.parse(data);
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

    await db
      .delete(character)
      .where(
        and(
          eq(character.id, ctx.data.id),
          eq(character.userId, session?.user.id!)
        )
      );
  });
