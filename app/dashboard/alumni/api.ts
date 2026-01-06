import { api } from "@/lib/api";
import { AlumniResponse, PaginatedAlumniResponse, CreateAlumniDto, UpdateAlumniDto } from "./types";

// Fetch all alumni with pagination and search
export const getAlumni = async (): Promise<PaginatedAlumniResponse> => {
  const res = await api.get("/alumni");
  return res.data;
};

// Delete alumni by ID
export const deleteAlumni = async (id: string): Promise<AlumniResponse> => {
  const res = await api.delete(`/alumni/${id}`);
  return res.data;
};

// Create new alumni
export const createAlumni = async (data: CreateAlumniDto): Promise<AlumniResponse> => {
  const res = await api.post("/alumni", data);
  return res.data.data;
};

// Update alumni by ID
export const updateAlumni = async (id: string, data: UpdateAlumniDto): Promise<AlumniResponse> => {
  const res = await api.put(`/alumni/${id}`, data);
  return res.data.data;
};

// Fetch alumni by ID
export const getAlumniById = async (id: string): Promise<AlumniResponse> => {
  const res = await api.get(`/alumni/${id}`);
  return res.data.data;
};