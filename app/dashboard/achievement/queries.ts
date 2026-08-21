import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAchievement,
  deleteAchievement,
  getAchievementById,
  getAchievements,
  updateAchievement,
} from "./api";
import { UpdateAchievementDto } from "./types";

export const useAchievements = (prodi?: string, category?: string) => {
  return useQuery({
    queryKey: ["achievements", prodi, category],
    queryFn: () => getAchievements(prodi, category),
  });
};

export const useAchievementById = (id: number) => {
  return useQuery({
    queryKey: ["achievements", id],
    queryFn: () => getAchievementById(id),
    enabled: !!id,
  });
};

export const useCreateAchievement = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createAchievement,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};

export const useUpdateAchievement = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAchievementDto }) =>
      updateAchievement(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};

export const useDeleteAchievement = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteAchievement,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["achievements"] });
    },
  });
};
