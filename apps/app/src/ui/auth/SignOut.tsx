//@ts-nocheck
import { Button } from "../components/button";
import { handleSignOut } from "@/lib/actions";

export function SignOut() {
  return (
    <form action={handleSignOut}>
      <Button type="submit">SignOut</Button>
    </form>
  );
}
