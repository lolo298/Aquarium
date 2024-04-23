//@ts-nocheck
import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";
import { handleSignOut } from "@/lib/actions";

export function SignOut() {
  return (
    <form action={handleSignOut}>
      <Button type="submit">SignOut</Button>
    </form>
  );
}
