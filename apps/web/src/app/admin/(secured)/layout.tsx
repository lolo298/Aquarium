import Navbar from "@/ui/components/Navbar";
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
