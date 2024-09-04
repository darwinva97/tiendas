import { db, userTable, eq } from "@repo/db";
import { lucia } from ".";
import { randomBytes, pbkdf2Sync } from "crypto";
import { z } from "zod";
import { Session } from "lucia";

export const hashPassword = (password: string, salt?: string) => {
  if (!salt) {
    salt = randomBytes(16).toString("hex");
  }

  const passwordHashed = pbkdf2Sync(
    password,
    salt,
    1000,
    64,
    "sha256",
  ).toString("hex");

  return {
    passwordHashed,
    salt,
    result: `${salt}:${passwordHashed}`,
  };
};

export const luciaLogin = async (email: string, password: string) => {
  const users = await db
    .select()
    .from(userTable)
    .where(eq(userTable.email, email))
    .execute();

  const user = users[0];

  if (!user) {
    throw new Error("No existe usuario con ese correo.");
  }

  const [salt, passwordHashedDB] = user.password!.split(":");
  if (!salt || !passwordHashedDB)
    throw new Error("Contraseña encontrada malformada.");

  const { passwordHashed: passwordHashedInput } = hashPassword(password, salt);
  const matchPassword = passwordHashedDB === passwordHashedInput;

  if (!matchPassword) {
    throw new Error("Credenciales incorrectas.");
  }

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);

  return sessionCookie;
};

export const luciaSignupSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["customer", "admin"]).default("customer"),
});

export const luciaSignup = async (data: z.infer<typeof luciaSignupSchema>) => {
  const { result: password } = hashPassword(data.password);

  const newUsers = await db
    .insert(userTable)
    .values({
      ...data,
      password,
    })
    .returning()
    .execute();

  const newUser = newUsers[0];

  if (!newUser) {
    throw new Error("Failed to create user");
  }

  const session = await lucia.createSession(newUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  return sessionCookie;
};

export const luciaLogout = async (session: Session) => {
  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();

  return sessionCookie;
};
