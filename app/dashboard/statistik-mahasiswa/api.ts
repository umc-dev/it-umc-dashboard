import { api } from "@/lib/api";
import {
  StatisticStudentResponse,
  PaginatedStatisticStudentResponse,
} from "./types";

export const getStatisticStudents = async (): Promise<PaginatedStatisticStudentResponse> => {
  const res = await api.get("/statistic-student");
  return res.data;
};

export const getStatisticStudentByYear = async (
  year: number
): Promise<StatisticStudentResponse> => {
  const res = await api.get(`/statistic-student/${year}`);
  return res.data.data;
};

export const createStatisticStudent = async (
  data: {
    year: number;
    enteredStudents: number;
    graduatedStudents: number;
  }
): Promise<StatisticStudentResponse> => {
  const res = await api.post("/statistic-student", data);
  return res.data.data;
};

export const updateStatisticStudent = async (
  year: number,
  data: {
    year?: number;
    enteredStudents?: number;
    graduatedStudents?: number;
  }
): Promise<StatisticStudentResponse> => {
  const res = await api.put(`/statistic-student/${year}`, data);
  return res.data.data;
};

export const deleteStatisticStudent = async (
  year: number
): Promise<StatisticStudentResponse> => {
  const res = await api.delete(`/statistic-student/${year}`);
  return res.data;
};