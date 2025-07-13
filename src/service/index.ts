// import { and, eq } from "drizzle-orm";
// import { auth } from "../lib/auth/auth";
// import { db } from "../lib/db";
// // import {
// //   character,
// //   characterInsertSchema,
// //   alliance,
// //   allianceInsertSchema,
// // } from "../lib/db/schema";
// import {
//   createMiddleware,
//   createServerFn,
//   useServerFn,
// } from "@tanstack/solid-start";
// import { getHeaders } from "@tanstack/solid-start/server";
// import { queryOptions } from "@tanstack/solid-query";
// import { getSession } from "~/lib/auth/client";

// const authMiddleware = createMiddleware({ type: "function" }).server(
//   async ({ next }) => {
//     const { data } = await getSession({
//       fetchOptions: {
//         headers: getHeaders() as HeadersInit,
//       },
//     });

//     return await next({
//       context: {
//         user: {
//           id: data?.user.id,
//           name: data?.user.name,
//         },
//       },
//     });
//   }
// );

// export const getAlliancesQueryOptions = queryOptions({
//   queryKey: ["getAlliances"],
//   queryFn: () => useServerFn(getAlliances),
// });

// export const getAlliances = createServerFn()
//   .middleware([authMiddleware])
//   .handler(async ({ context }) => {
//     return await db
//       .select()
//       .from(alliance)
//       .where(eq(alliance.userId, context?.user.id!));
//   });
// export const getCharactersQueryOptions = queryOptions({
//   queryKey: ["getCharacters"],
//   queryFn: () => getCharacters(),
// });

// export const getCharacters = createServerFn()
//   .middleware([authMiddleware])
//   .handler(async ({ context }) => {
//     return await db
//       .select()
//       .from(character)
//       .where(eq(character.userId, context?.user.id!));
//   });
// export const getCharacter = createServerFn()
//   .middleware([authMiddleware])
//   .validator((data: string) => data)
//   .handler(async ({ data, context }) => {
//     return await db.query.character.findFirst({
//       where: and(
//         eq(character.id, data),
//         eq(character.userId, context.user.id!)
//       ),
//     });
//   });

// export const getAlliance = createServerFn()
//   .middleware([authMiddleware])
//   .validator((data: string) => data)
//   .handler(async ({ data, context }) => {
//     return await db.query.alliance.findFirst({
//       where: and(eq(alliance.id, data), eq(alliance.userId, context?.user.id!)),
//     });
//   });

// const addAllianceSchema = allianceInsertSchema.pick({
//   name: true,
// });

// export const addAlliance = createServerFn({ method: "POST" })
//   .middleware([authMiddleware])
//   .validator((data: unknown) => {
//     return addAllianceSchema.parse(data);
//   })
//   .handler(async ({ data, context }) => {
//     const allianceToAdd = allianceInsertSchema.parse({
//       userId: context?.user.id!,
//       name: data.name,
//     });

//     await db.insert(alliance).values(allianceToAdd);

//     return allianceToAdd;
//   });

// const deleteAllianceSchema = allianceInsertSchema.pick({
//   id: true,
// });

// export const deleteAlliance = createServerFn({ method: "POST" })
//   .middleware([authMiddleware])
//   .validator((data: unknown) => {
//     return deleteAllianceSchema.parse(data);
//   })
//   .handler(async ({ data, context }) => {
//     await db
//       .delete(alliance)
//       .where(
//         and(eq(alliance.id, data.id!), eq(alliance.userId, context?.user.id!))
//       );
//   });

// const addCharacterSchema = characterInsertSchema.pick({
//   name: true,
//   combatPower: true,
// });

// export const addCharacter = createServerFn({ method: "POST" })
//   .middleware([authMiddleware])
//   .validator((data: unknown) => {
//     return addCharacterSchema.parse(data);
//   })
//   .handler(async ({ data, context }) => {
//     const characterToAdd = characterInsertSchema.parse({
//       userId: context?.user.id!,
//       name: data.name,
//       combatPower: data.combatPower,
//     });
//     await db.insert(character).values(characterToAdd);

//     return characterToAdd;
//   });

// const deleteCharacterSchema = characterInsertSchema.pick({
//   id: true,
// });

// export const deleteCharacter = createServerFn({ method: "POST" })
//   .middleware([authMiddleware])
//   .validator((data: unknown) => {
//     return deleteCharacterSchema.parse(data);
//   })
//   .handler(async ({ data, context }) => {
//     await db
//       .delete(character)
//       .where(
//         and(eq(character.id, data.id!), eq(character.userId, context?.user.id!))
//       );
//   });
