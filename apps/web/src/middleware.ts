import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export default auth((req) => {
  if (!req.auth) {
    console.log("redirecting to login");
    return NextResponse.redirect(`${req.nextUrl.origin}/admin/login`);
  }
});
export const config = {
  matcher: ["/(admin(?!/login))"],
};
