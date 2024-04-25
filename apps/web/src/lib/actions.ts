"use server";
import { signIn, signOut } from "./auth";

export async function handleSignOut() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export async function handleSignIn(redirectTo?: string) {
  "use server";
  if (!redirectTo) {
    redirectTo = "/admin";
  }
  await signIn("github", { redirectTo });
}
