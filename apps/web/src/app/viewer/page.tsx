"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Viewer from "./Viewer";
import MindViewer from "./MindViewer";

const client = new QueryClient();

export default function Page() {
  return (
    <QueryClientProvider client={client}>
      {/* <Viewer /> */}
      <MindViewer />
    </QueryClientProvider>
  );
}
