import { api } from "@/lib/api";
import { PaginatedVisionMissionResponse, VisionMissionResponse } from "./types";

// GET ALL (paginated, meski biasanya hanya 0-1 data)
export const getVisionMissions = async (): Promise<PaginatedVisionMissionResponse> => {
  const res = await api.get("/vision-mission");
  return res.data;
};

// GET BY ID
export const getVisionMissionById = async (id: number): Promise<VisionMissionResponse> => {
  const res = await api.get(`/vision-mission/${id}`);
  return res.data.data;
};

// CREATE
export const createVisionMission = async (data: { vision: string; mission: string }): Promise<VisionMissionResponse> => {
  const res = await api.post("/vision-mission", data);
  return res.data.data;
};

// UPDATE
export const updateVisionMission = async (
  id: number,
  data: { vision?: string; mission?: string }
): Promise<VisionMissionResponse> => {
  const res = await api.put(`/vision-mission/${id}`, data);
  return res.data.data;
};

// DELETE (opsional, tapi disertakan untuk konsistensi)
export const deleteVisionMission = async (id: number): Promise<VisionMissionResponse> => {
  const res = await api.delete(`/vision-mission/${id}`);
  return res.data;
};