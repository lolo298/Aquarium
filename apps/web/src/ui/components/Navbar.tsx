import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { SignOut } from "../auth/SignOut";
import type { Session } from "next-auth";

function Navbar({ session }: { session: Session }) {
  return (
    <nav className="flex justify-between p-4">
      <h1>Admin</h1>
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage
            src={session?.user?.image ?? "https://placehold.co/400"}
            alt={session?.user?.name ?? "User avatar"}
          />
          <AvatarFallback>{session?.user?.name}</AvatarFallback>
        </Avatar>
        <SignOut />
      </div>
    </nav>
  );
}

export default Navbar;
