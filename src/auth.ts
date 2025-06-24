import { betterAuth } from "better-auth";
import { reactStartCookies } from "better-auth/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./db/schema";
import { EnvVar } from "./environmentVariables";

export const auth = betterAuth({
  socialProviders: {
    google: {
      clientId: EnvVar.GOOGLE_CLIENT_ID,
      clientSecret: EnvVar.GOOGLE_CLIENT_SECRET,
    },
    discord: {
      clientId: EnvVar.DISCORD_CLIENT_ID,
      clientSecret: EnvVar.DISCORD_CLIENT_SECRET,
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  // plugins: [reactStartCookies()],
});
