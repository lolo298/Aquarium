"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DataTable from "./DataTable";

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
