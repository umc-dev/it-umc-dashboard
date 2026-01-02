import { api } from "@/lib/api";
import {
  DosenResponse,
  PaginatedDosenResponse,
} from "./types";

export const getDosens = async (): Promise<PaginatedDosenResponse> => {
  const res = await api.get("/dosen");
  return res.data;
};

export const deleteDosen = async (id: string): Promise<DosenResponse> => {
  const res = await api.delete(`/dosen/${id}`);
  return res.data;
};

export const createDosen = async (data: FormData): Promise<DosenResponse> => {
  const res = await api.post("/dosen", data);
  return res.data.data;
};

export const updateDosen = async (
  id: string,
  data: FormData,
): Promise<DosenResponse> => {
  const res = await api.put(`/dosen/${id}`, data);
  return res.data.data;
};

export const getDosenById = async (id: string): Promise<DosenResponse> => {
  const res = await api.get(`/dosen/${id}`);
  return res.data.data;
};