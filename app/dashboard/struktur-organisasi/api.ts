import { api } from "@/lib/api";
import { StrukturOrganisasiResponse } from "./types";
import axios from "axios";

export const getStrukturOrganisasi = async (prodi?: 'S1' | 'D3'): Promise<StrukturOrganisasiResponse | null> => {
  try {
    const res = await api.get("/organizational-structure", {
      params: prodi ? { prodi } : {},
    });
    return res.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const createStrukturOrganisasi = async (data: FormData): Promise<StrukturOrganisasiResponse> => {
  const res = await api.post("/organizational-structure", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const updateStrukturOrganisasi = async (data: FormData, prodi?: 'S1' | 'D3'): Promise<StrukturOrganisasiResponse> => {
  const res = await api.put(`/organizational-structure`, data, {
    params: prodi ? { prodi } : {},
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const deleteStrukturOrganisasi = async (prodi?: 'S1' | 'D3'): Promise<void> => {
  const res = await api.delete(`/organizational-structure`, {
    params: prodi ? { prodi } : {},
  });
  return res.data;
};
