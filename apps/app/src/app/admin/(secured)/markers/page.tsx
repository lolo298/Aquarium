"use client";

import DataTable from "./DataTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function Markers() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DataTable />
      </QueryClientProvider>
    </>
  );
}

export default Markers;
