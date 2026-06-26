import { api } from "@/lib/api";
import { StudyResponse, PaginatedStudyResponse } from "./types";

export const getStudies = async (prodi?: string): Promise<PaginatedStudyResponse> => {
  const res = await api.get("/studies", { params: { prodi } });
  return res.data;
};

export const deleteStudy = async (id: number): Promise<StudyResponse> => {
  const res = await api.delete(`/studies/${id}`);
  return res.data;
};

export const createStudy = async (data: FormData): Promise<StudyResponse> => {
  const res = await api.post("/studies", data);
  return res.data;
};

export const updateStudy = async (
  id: number,
  data: FormData,
): Promise<StudyResponse> => {
  const res = await api.put(`/studies/${id}`, data);
  return res.data;
};

export const getStudyById = async (id: number): Promise<StudyResponse> => {
  const res = await api.get(`/studies/${id}`);
  return res.data.data;
};