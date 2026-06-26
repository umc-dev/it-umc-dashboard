import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVisionMission,
  deleteVisionMission,
  getVisionMissionById,
  getVisionMissions,
  updateVisionMission,
} from "./api";
import { UpdateVisionMissionDto } from "./types";

// GET ALL VISION MISSIONS
export const useVisionMissions = (prodi?: string) => {
  return useQuery({
    queryKey: ["vision-missions", prodi],
    queryFn: () => getVisionMissions(prodi),
  });
};

// DELETE VISION MISSION
export const useDeleteVisionMission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteVisionMission,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vision-missions"] });
    },
  });
};

// GET BY ID
export const useVisionMissionById = (id: number) => {
  return useQuery({
    queryKey: ["vision-mission", id],
    queryFn: () => getVisionMissionById(id),
    enabled: !!id,
  });
};

// CREATE
export const useCreateVisionMission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createVisionMission,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vision-missions"] });
    },
  });
};

// UPDATE
export const useUpdateVisionMission = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateVisionMissionDto }) =>
      updateVisionMission(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vision-missions"] });
    },
  });
};