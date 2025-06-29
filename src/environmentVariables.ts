import * as z from "zod/v4";

import { config } from "dotenv";
import { expand } from "dotenv-expand";

const envVarSchema = z.object({
  BETTER_AUTH_URL: z.url(),
  DATABASE_URL: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_DB: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
});

const envFile = expand(config({ path: `.env` }));

const EnvVarResult = envVarSchema.safeParse({
  ...envFile.parsed,
  ...process.env,
});

// if (EnvVarResult.error) {
//   console.dir(z.prettifyError(EnvVarResult.error), {
//     depth: null,
//     colors: true,
//   });
//   process.exit(1);
// }

console.log(EnvVarResult.data);

export const EnvVar = EnvVarResult.data;
