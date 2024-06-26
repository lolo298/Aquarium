import dynamic from "next/dynamic";

const Nav = dynamic(() => import("./Nav"), { ssr: false });

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Nav />
    </>
  );
}
