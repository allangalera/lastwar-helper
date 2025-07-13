import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { EnvVar } from "~/environmentVariables";

const sql = neon(EnvVar.DATABASE_URL);

export const db = drizzle({
  client: sql,
  schema,
});
