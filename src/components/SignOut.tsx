//@ts-nocheck
import { signOut } from "@/lib/auth";

export function SignOut() {
  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }
  return (
    <form action={handleSignOut}>
      <button type="submit">SignOut</button>
    </form>
  );
}
