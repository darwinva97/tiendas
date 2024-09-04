import "dotenv/config";

import { db } from "../index";
import { userTable } from "../schema";
import { hashPassword } from "@repo/auth";

const main = async () => {
  await db.insert(userTable).values([
    {
      name: "John",
      email: "john@example.com",
      password: hashPassword("password").result,
      role: "customer",
    },
    {
      name: "Jane",
      email: "jane@example.com",
      password: hashPassword("password").result,
      role: "customer",
    },
    {
      name: "Admin",
      email: "admin@example.com",
      password: hashPassword("password").result,
      role: "admin",
    },
  ]);
};

main()
  .then(() => console.log("Seeding complete"))
  .catch((error) => console.error("Seeding failed:", error));
