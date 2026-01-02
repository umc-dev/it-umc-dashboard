import { api } from "@/lib/api";
import {
  PaginatedPartnershipResponse,
  PartnershipResponse,
} from "./types";

export const getPartnerships = async (): Promise<PaginatedPartnershipResponse> => {
  const res = await api.get("/partnerships");
  return res.data;
};

export const deletePartnership = async (
  id: string,
): Promise<PartnershipResponse> => {
  const res = await api.delete(`/partnerships/${id}`);
  return res.data;
};

export const createPartnership = async (
  data: FormData,
): Promise<PartnershipResponse> => {
  const res = await api.post("/partnerships", data);
  return res.data.data;
};

export const updatePartnership = async (
  id: string,
  data: FormData,
): Promise<PartnershipResponse> => {
  const res = await api.put(`/partnerships/${id}`, data);
  return res.data.data;
};

export const getPartnershipById = async (
  id: string,
): Promise<PartnershipResponse> => {
  const res = await api.get(`partnerships/${id}`);
  return res.data.data;
};