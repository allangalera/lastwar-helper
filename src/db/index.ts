// import { drizzle } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import { EnvVar } from "../environmentVariables";

export const db = drizzle({
  connection: EnvVar.DATABASE_URL,
  schema,
});
