"use client";

import TableCmp from "./table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Markers() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TableCmp />
      </QueryClientProvider>
    </>
  );
}

export default Markers;
