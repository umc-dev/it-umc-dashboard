import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createStatisticStudent,
  deleteStatisticStudent,
  getStatisticStudents,
  getStatisticStudentByYear,
  updateStatisticStudent,
} from "./api";

// GET ALL STATISTIC STUDENTS
export const useStatisticStudents = () => {
  return useQuery({
    queryKey: ["statistic-students"],
    queryFn: getStatisticStudents,
  });
};

// GET STATISTIC STUDENT BY YEAR
export const useStatisticStudentByYear = (year: number) => {
  return useQuery({
    queryKey: ["statistic-students", year],
    queryFn: () => getStatisticStudentByYear(year),
    enabled: !!year,
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
      year,
      data,
    }: {
      year: number;
      data: {
        year?: number;
        enteredStudents?: number;
        graduatedStudents?: number;
      };
    }) => updateStatisticStudent(year, data),
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