import { sql, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  pgTable,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

export const USER_TABLE_NAME = "user";
export const userTable = pgTable(USER_TABLE_NAME, {
  id: text("id")
    .default(sql`gen_random_uuid()`)
    .notNull()
    .primaryKey(),

  name: text("name"),
  email: text("email").unique(),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

export const SESSION_TABLE_NAME = "session";
export const sessionTable = pgTable(SESSION_TABLE_NAME, {
  id: text("id").notNull().primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type User = InferSelectModel<typeof userTable>;
export type NewUser = InferInsertModel<typeof userTable>;
