import { validateRequest } from "../../lib";
import { redirect } from "next/navigation";
import { ActionResult, Form } from "../../components/Form";
import Link from "next/link";
import { luciaSignup, luciaSignupSchema } from "@repo/auth";
import { cookies } from "next/headers";

export default async function Page() {
  const { user } = await validateRequest();
  if (user) {
    return redirect("/");
  }
  return (
    <>
      <h1>Create an account</h1>
      <Form action={signup}>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" />
        <br />
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="email" />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <br />
        <button>Continue</button>
      </Form>
      <Link href="/login">Sign in</Link>
    </>
  );
}

async function signup(_: any, formData: FormData): Promise<ActionResult> {
  "use server";
  const inputData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const resultSafeParse = luciaSignupSchema.safeParse(inputData);

  if (!resultSafeParse.success) {
    return {
      error: resultSafeParse.error.issues[0]!.message,
    };
  }

  const data = resultSafeParse.data;

  try {
    const sessionCookie = await luciaSignup(data);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  } catch (error) {
    console.error(error);
    return { error: (error as string).toString() };
  }

  return redirect("/");
}
