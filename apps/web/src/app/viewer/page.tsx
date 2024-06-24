"use client";
import dynamic from "next/dynamic";

const MindViewer = dynamic(() => import("./MindViewer"), { ssr: false });
const Nav = dynamic(() => import("./Nav"), { ssr: false });

export default function Page() {
  return (
    <>
      <MindViewer />
      <Nav />
    </>
  );
}
