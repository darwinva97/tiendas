import { redirect } from "next/navigation";
import { validateRequest } from "../lib";
import { luciaLogout } from "@repo/auth";
import { ActionResult, Form } from "../components/Form";
import { cookies } from "next/headers";
import { Button } from "@repo/ui/components/ui/button";

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();

  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  const sessionCookie = await luciaLogout(session);

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );

  return redirect("/login");
}

export default async function HomePage() {
  const { user, session } = await validateRequest();
  if (!user || !session) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Hello {user.name}!</h1>

      <Form action={logout}>
        <Button>Sign out</Button>
      </Form>

      <hr />
      <p>User:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>

      <hr />
      <p>Session:</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
