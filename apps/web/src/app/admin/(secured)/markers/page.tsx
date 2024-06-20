"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataTable from "./DataTable";

function Markers() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DataTable />
      </QueryClientProvider>
    </>
  );
}

export default Markers;
