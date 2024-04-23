//@ts-nocheck
import { signIn } from "@/lib/auth";
import { Button } from "./ui/button";
import { handleSignIn } from "@/lib/actions";

export function SignIn({ redirectTo }: { redirectTo?: string }) {
  return (
    <form action={handleSignIn.bind(null, redirectTo)}>
      <Button type="submit">Signin with GitHub</Button>
    </form>
  );
}
