import { api } from "@/lib/api";
import {
  PaginatedFacilityResponse,
  FacilityResponse,
} from "./types";

export const getFacilities = async (): Promise<PaginatedFacilityResponse> => {
  const res = await api.get("/facilities");
  return res.data;
};

export const deleteFacility = async (
  id: number,
): Promise<FacilityResponse> => {
  const res = await api.delete(`/facilities/${id}`);
  return res.data;
};

export const createFacility = async (
  data: FormData,
): Promise<FacilityResponse> => {
  const res = await api.post("/facilities", data);
  return res.data.data;
};

export const updateFacility = async (
  id: number,
  data: FormData,
): Promise<FacilityResponse> => {
  const res = await api.put(`/facilities/${id}`, data);
  return res.data.data;
};

export const getFacilityById = async (
  id: number,
): Promise<FacilityResponse> => {
  const res = await api.get(`/facilities/${id}`);
  return res.data.data;
};
