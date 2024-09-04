import { Lucia } from "lucia";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { db, sessionTable, userTable, User } from "@repo/db";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: globalThis.process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    const publicAttributes = attributes as Omit<User, "id"> & { id?: string };
    delete publicAttributes.id;
    return publicAttributes as Omit<User, "id">;
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: User;
  }
}

export * from "./utils";

// const session = await lucia.createSession(userId, {});
// await lucia.validateSession(session.id);
