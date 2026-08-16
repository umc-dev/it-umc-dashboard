import { api } from "@/lib/api";
import { AlumniResponse, PaginatedAlumniResponse } from "./types";

export const getAlumni = async (
  prodi?: "S1" | "D3",
  status?: "pending" | "approved" | "all"
): Promise<PaginatedAlumniResponse> => {
  const params: Record<string, string> = {};
  if (prodi) params.prodi = prodi;
  if (status) params.status = status;

  const res = await api.get("/alumni", { params });
  return res.data;
};

export const deleteAlumni = async (id: string): Promise<AlumniResponse> => {
  const res = await api.delete(`/alumni/${id}`);
  return res.data;
};

export const createAlumni = async (data: FormData): Promise<AlumniResponse> => {
  const res = await api.post("/alumni", data);
  return res.data.data;
};

export const updateAlumni = async (
  id: string,
  data: FormData
): Promise<AlumniResponse> => {
  const res = await api.put(`/alumni/${id}`, data);
  return res.data.data;
};

export const getAlumniById = async (id: string): Promise<AlumniResponse> => {
  const res = await api.get(`/alumni/${id}`);
  return res.data.data;
};

export const approveAlumni = async (
  id: string,
  isApproved: boolean
): Promise<AlumniResponse> => {
  const res = await api.patch(`/alumni/${id}/approve`, { isApproved });
  return res.data.data;
};
