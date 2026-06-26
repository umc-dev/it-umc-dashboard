import { api } from "@/lib/api";
import {
  DosenResponse,
  PaginatedDosenResponse,
} from "./types";

export const getDosens = async (prodi?: string): Promise<PaginatedDosenResponse> => {
  const res = await api.get("/dosen", { params: { prodi } });
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

export const createDosenTridharma = async (data: {
  dosenId: string;
  category: "PENGAJARAN" | "PENELITIAN" | "PENGABDIAN";
  title: string;
  year: number;
  description: string;
  link: string;
}): Promise<any> => {
  const res = await api.post("/dosen-tridharma", data);
  return res.data.data;
};

export const updateDosenTridharma = async (
  id: number,
  data: Partial<{
    dosenId: string;
    category: "PENGAJARAN" | "PENELITIAN" | "PENGABDIAN";
    title: string;
    year: number;
    description: string;
    link: string;
  }>,
): Promise<any> => {
  const res = await api.put(`/dosen-tridharma/${id}`, data);
  return res.data.data;
};

export const deleteDosenTridharma = async (id: number): Promise<any> => {
  const res = await api.delete(`/dosen-tridharma/${id}`);
  return res.data;
};