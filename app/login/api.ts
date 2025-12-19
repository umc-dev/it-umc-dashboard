import { api } from "@/lib/api";
import { AdminResponse } from "./types";

export const getMe = async (): Promise<AdminResponse> => {
  const res = await api.get("/auth/me");
  return res.data.data.admin;
};

export const logoutApi = async (): Promise<void> => {
  await api.post("/auth/logout");
};