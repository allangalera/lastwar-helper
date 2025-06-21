import * as z from "zod/v4";

import { config } from "dotenv";
import { expand } from "dotenv-expand";

const AppEnv = {
  Local: "local",
  Development: "development",
  Staging: "Staging",
  Production: "production",
} as const;

const defaultEnv = expand(config({ path: ".env" }));

const baseEnvSchema = z.object({
  APP_ENV: z.enum(AppEnv),
});

const BaseEnvResult = baseEnvSchema.safeParse({
  ...defaultEnv.parsed,
  ...process.env,
});
if (BaseEnvResult.error) {
  console.dir(z.prettifyError(BaseEnvResult.error), {
    depth: null,
    colors: true,
  });
  process.exit(1);
}

const BaseEnv = BaseEnvResult.data;

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

const envFile = expand(config({ path: `.env.${BaseEnv.APP_ENV}` }));

const EnvVarResult = envVarSchema.safeParse({
  ...BaseEnv,
  ...envFile.parsed,
  ...process.env,
});

if (EnvVarResult.error) {
  console.dir(z.prettifyError(EnvVarResult.error), {
    depth: null,
    colors: true,
  });
  process.exit(1);
}

export const EnvVar = EnvVarResult.data;
