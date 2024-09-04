import { luciaLogin } from "@repo/auth";
import { cookies } from "next/headers";
import { z } from "zod";
import { redirect } from "next/navigation";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function Page() {
  const loginUser = async function (formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");
    const schemaResult = loginSchema.safeParse({ email, password });

    if (!schemaResult.success) {
      console.log(schemaResult.error);
      return;
    }

    const data = schemaResult.data;

    const sessionCookie = await luciaLogin(data.email, data.password);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
    return redirect("/");
  };
  return (
    <div>
      <h1>Login 3</h1>
      <form action={loginUser}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Submit</button>
      </form>

      <Link href="/signup">Create an account</Link>
    </div>
  );
}
