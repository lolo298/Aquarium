import Navbar from "@/ui/components/Navbar";

async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
