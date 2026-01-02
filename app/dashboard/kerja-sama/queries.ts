import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPartnership,
  deletePartnership,
  getPartnershipById,
  getPartnerships,
  updatePartnership,
} from "./api";

// GET ALL PARTNERSHIPS
export const usePartnerships = () => {
  return useQuery({
    queryKey: ["partnerships"],
    queryFn: getPartnerships,
  });
};

// DELETE PARTNERSHIP
export const useDeletePartnership = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deletePartnership,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partnerships"] });
    },
  });
};

// GET PARTNERSHIP BY ID
export const usePartnershipById = (id: string) => {
  return useQuery({
    queryKey: ["partnerships", id],
    queryFn: () => getPartnershipById(id),
    enabled: !!id, // Fetch only if ID exists
  });
};

// CREATE PARTNERSHIP
export const useCreatePartnership = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createPartnership,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partnerships"] });
    },
  });
};

// UPDATE PARTNERSHIP
export const useUpdatePartnership = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updatePartnership(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partnerships"] });
    },
  });
};