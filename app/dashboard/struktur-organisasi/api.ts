import { api } from "@/lib/api";
import { StrukturOrganisasiResponse } from "./types";
import axios from "axios";

export const getStrukturOrganisasi = async (): Promise<StrukturOrganisasiResponse | null> => {
  try {
    const res = await api.get("/organizational-structure");
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

export const updateStrukturOrganisasi = async (data: FormData): Promise<StrukturOrganisasiResponse> => {
  const res = await api.put(`/organizational-structure`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data;
};

export const deleteStrukturOrganisasi = async (): Promise<void> => {
  const res = await api.delete(`/organizational-structure`);
  return res.data;
};
