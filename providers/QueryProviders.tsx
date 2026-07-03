"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

import axios from "axios";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 5, // optional, biar ga refetch terus
            retry: (failureCount, error: unknown) => {
              if (axios.isAxiosError(error)) {
                // Jangan retry kalau 401 (token expired)
                if (error.response?.status === 401) return false;
                // Jangan retry kalau 403 (forbidden)
                if (error.response?.status === 403) return false;
              }
              // Retry max 2x untuk error lain
              return failureCount < 2;
            },
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
