//@ts-nocheck
import { Button } from "../components/button";
import { handleSignIn } from "@/lib/actions";

export function SignIn({ redirectTo }: { redirectTo?: string }) {
  return (
    <form action={handleSignIn.bind(null, redirectTo)}>
      <Button type="submit">Signin with GitHub</Button>
    </form>
  );
}
