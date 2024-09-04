import { drizzle } from "drizzle-orm/postgres-js";
import { DB_URL } from "@repo/config";
import postgres from "postgres";
import * as schema from "./schema";

const queryClient = postgres(DB_URL);

export const db = drizzle(queryClient, {
  schema,
});

export * from "drizzle-orm";

export * from "./schema";
