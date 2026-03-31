import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createFacility,
  deleteFacility,
  getFacilityById,
  getFacilities,
  updateFacility,
} from "./api";

export const useFacilities = () => {
  return useQuery({
    queryKey: ["facilities"],
    queryFn: getFacilities,
  });
};

export const useDeleteFacility = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteFacility,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};

export const useFacilityById = (id: number) => {
  return useQuery({
    queryKey: ["facilities", id],
    queryFn: () => getFacilityById(id),
    enabled: !!id,
  });
};

export const useCreateFacility = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createFacility,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};

export const useUpdateFacility = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: FormData }) =>
      updateFacility(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["facilities"] });
    },
  });
};
