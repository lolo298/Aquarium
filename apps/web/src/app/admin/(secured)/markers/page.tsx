"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import DataTable from "./DataTable";
import { getQueryClient } from "@/lib/query";

function Markers() {
  const queryClient = getQueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DataTable />
      </QueryClientProvider>
    </>
  );
}

export default Markers;
