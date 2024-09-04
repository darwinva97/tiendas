import { defineConfig } from "drizzle-kit";
import { DB_URL } from "@repo/config";

export default defineConfig({
  schema: "./src/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  migrations: {
    // prefix: "supabase",
  },
  dbCredentials: {
    url: DB_URL,
  },
  verbose: true,
  strict: true,
});
