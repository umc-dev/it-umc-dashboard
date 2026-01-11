import { api } from "@/lib/api";
import { AdminResponse } from "./types";
import { ApiResponse } from "@/lib/types";

export const getMe = async (): Promise<AdminResponse | null> => {
  try {
    const { data } = await api.get<ApiResponse<AdminResponse>>("/auth/me");
    return data.success ? data.data ?? null : null;
  } catch {
    return null;
  }
};

export const logoutApi = async (): Promise<void> => {
  await api.post("/auth/logout");
};