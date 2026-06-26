import { api } from "@/lib/api";
import {
  AchievementResponse,
  CreateAchievementDto,
  PaginatedAchievementResponse,
  UpdateAchievementDto,
} from "./types";

export const getAchievements = async (prodi?: string): Promise<PaginatedAchievementResponse> => {
  const res = await api.get("/achievement", { params: { prodi } });
  return res.data;
};

export const getAchievementById = async (
  id: number,
): Promise<AchievementResponse> => {
  const res = await api.get(`/achievement/${id}`);
  return res.data.data;
};

export const createAchievement = async (
  data: CreateAchievementDto,
): Promise<AchievementResponse> => {
  const res = await api.post("/achievement", data);
  return res.data.data;
};

export const updateAchievement = async (
  id: number,
  data: UpdateAchievementDto,
): Promise<AchievementResponse> => {
  const res = await api.put(`/achievement/${id}`, data);
  return res.data.data;
};

export const deleteAchievement = async (
  id: number,
): Promise<AchievementResponse> => {
  const res = await api.delete(`/achievement/${id}`);
  return res.data;
};
