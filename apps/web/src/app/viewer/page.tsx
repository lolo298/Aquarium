"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MindViewer from "./MindViewer";
import { fishAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

const client = new QueryClient();

export default function Page() {
  const [fish, setFish] = useAtom(fishAtom);

  useEffect(() => {
    setTimeout(() => {
      console.log("fish", fish);
    }, 2000);
  }, [fish]);
  return (
    <QueryClientProvider client={client}>
      {/* <Viewer /> */}
      <MindViewer />
    </QueryClientProvider>
  );
}
