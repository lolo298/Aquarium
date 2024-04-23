//@ts-nocheck
import { signIn } from "@/lib/auth";

export function SignIn({ redirectTo }: { redirectTo?: string }) {
  if (!redirectTo) {
    redirectTo = "/admin";
  }

  async function handleSignIn() {
    "use server";
    console.log(redirectTo);
    await signIn("github", { redirectTo });
  }
  return (
    <form action={handleSignIn}>
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
