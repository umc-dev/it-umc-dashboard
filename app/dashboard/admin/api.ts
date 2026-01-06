import { api } from "@/lib/api";
import { AdminResponse, PaginatedAdminResponse } from "./types";

export const getAdmins = async (): Promise<PaginatedAdminResponse> => {
  const res = await api.get("/admin");
  return res.data;
};

export const getAdminById = async (id: string): Promise<AdminResponse> => {
  const res = await api.get(`/admin/${id}`);
  return res.data.data;
};

export const createAdmin = async (data: FormData): Promise<AdminResponse> => {
  const res = await api.post("/admin", data);
  return res.data.data;
};

export const updateAdmin = async (id: string, data: FormData): Promise<AdminResponse> => {
  const res = await api.put(`/admin/${id}`, data);
  return res.data.data;
};

export const deleteAdmin = async (id: string): Promise<AdminResponse> => {
  const res = await api.delete(`/admin/${id}`);
  return res.data;
};