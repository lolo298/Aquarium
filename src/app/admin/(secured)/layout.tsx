import { SignOut } from "@/components/SignOut";
import Navbar from "@/components/ui/Navbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/auth";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <div>
      <Navbar session={session!} />
      {children}
    </div>
  );
}

export default Layout;
