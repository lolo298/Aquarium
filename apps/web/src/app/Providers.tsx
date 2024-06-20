"use client";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>{children}</Provider>
    </QueryClientProvider>
  );
}

export default Providers;
