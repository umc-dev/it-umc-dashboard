import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getMe, logoutApi } from "./api";
import type { AdminResponse } from "./types";

export const useMe = () => {
  return useQuery<AdminResponse | null>({
    queryKey: ["me"],
    queryFn: getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.clear(); // Hapus semua cache
      window.location.href = "/login";
    },
  });
};