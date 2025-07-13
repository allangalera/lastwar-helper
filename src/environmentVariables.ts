import * as z from "zod/v4";

import { config } from "dotenv";
import { expand } from "dotenv-expand";

const envVarSchema = z.object({
  DATABASE_URL: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
});

const envFile = expand(config({ path: `.env` }));

export const EnvVar = envVarSchema.parse({
  ...envFile.parsed,
  ...process.env,
});
