import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAccreditation,
  deleteAccreditation,
  getAccreditations,
  getAccreditationById,
  updateAccreditation,
} from "./api";

export const useAccreditations = (params?: {
  category?: string;
  prodi?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["accreditations", params],
    queryFn: () => getAccreditations(params),
  });
};

export const useAccreditationById = (id: string) => {
  return useQuery({
    queryKey: ["accreditations", id],
    queryFn: () => getAccreditationById(id),
    enabled: !!id,
  });
};

export const useCreateAccreditation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createAccreditation,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["accreditations"] });
    },
  });
};

export const useUpdateAccreditation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateAccreditation(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["accreditations"] });
    },
  });
};

export const useDeleteAccreditation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteAccreditation,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["accreditations"] });
    },
  });
};
