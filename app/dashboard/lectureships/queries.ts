import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createLectureship,
  deleteLectureship,
  getLectureshipById,
  getLectureships,
  updateLectureship,
} from "./api";
import { UpdateLectureshipDto } from "./types";

// GET ALL LECTURESHIPS
export const useLectureships = () => {
  return useQuery({
    queryKey: ["lectureships"],
    queryFn: getLectureships,
  });
};

// DELETE LECTURESHIP
export const useDeleteLectureship = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteLectureship,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lectureships"] });
    },
  });
};

// GET LECTURESHIP BY ID
export const useLectureshipById = (id: number) => {
  return useQuery({
    queryKey: ["lectureships", id],
    queryFn: () => getLectureshipById(id),
    enabled: !!id,
  });
};

// CREATE LECTURESHIP
export const useCreateLectureship = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createLectureship,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lectureships"] });
    },
  });
};

// UPDATE LECTURESHIP
export const useUpdateLectureship = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateLectureshipDto }) =>
      updateLectureship(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["lectureships"] });
    },
  });
};
