import { api } from "@/lib/api";
import { Accreditation, PaginatedAccreditationResponse } from "./types";

export const getAccreditations = async (params?: {
  category?: string;
  prodi?: string;
  search?: string;
}): Promise<PaginatedAccreditationResponse> => {
  const res = await api.get("/accreditations", { params });
  return res.data;
};

export const getAccreditationById = async (id: string): Promise<Accreditation> => {
  const res = await api.get(`/accreditations/${id}`);
  return res.data.data;
};

export const createAccreditation = async (data: FormData): Promise<Accreditation> => {
  const res = await api.post("/accreditations", data);
  return res.data.data;
};

export const updateAccreditation = async (
  id: string,
  data: FormData
): Promise<Accreditation> => {
  const res = await api.put(`/accreditations/${id}`, data);
  return res.data.data;
};

export const deleteAccreditation = async (id: string): Promise<Accreditation> => {
  const res = await api.delete(`/accreditations/${id}`);
  return res.data;
};
