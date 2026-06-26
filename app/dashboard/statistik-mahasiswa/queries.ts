import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStatisticStudent,
  deleteStatisticStudent,
  getStatisticStudents,
  getStatisticStudentById,
  updateStatisticStudent,
} from "./api";

// GET ALL STATISTIC STUDENTS
export const useStatisticStudents = (prodi?: string) => {
  return useQuery({
    queryKey: ["statistic-students", prodi],
    queryFn: () => getStatisticStudents(prodi),
  });
};

// GET STATISTIC STUDENT BY ID
export const useStatisticStudentById = (id: string) => {
  return useQuery({
    queryKey: ["statistic-students", id],
    queryFn: () => getStatisticStudentById(id),
    enabled: !!id,
  });
};

// CREATE STATISTIC STUDENT
export const useCreateStatisticStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createStatisticStudent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["statistic-students"] });
    },
  });
};

// UPDATE STATISTIC STUDENT
export const useUpdateStatisticStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        prodi?: "S1" | "D3";
        year?: number;
        enteredStudents?: number;
        graduatedStudents?: number;
      };
    }) => updateStatisticStudent(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["statistic-students"] });
    },
  });
};

// DELETE STATISTIC STUDENT
export const useDeleteStatisticStudent = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteStatisticStudent,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["statistic-students"] });
    },
  });
};