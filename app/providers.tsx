"use client";

import { LoadingProvider } from "@/utils/context/showNotification";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <LoadingProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </LoadingProvider>
    </>
  );
};

export default Providers;
