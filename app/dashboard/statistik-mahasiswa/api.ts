import { api } from "@/lib/api";
import {
  StatisticStudentResponse,
  PaginatedStatisticStudentResponse,
} from "./types";

export const getStatisticStudents = async (prodi?: string): Promise<PaginatedStatisticStudentResponse> => {
  const res = await api.get("/statistic-student", { params: { prodi } });
  return res.data;
};

export const getStatisticStudentById = async (
  id: string
): Promise<StatisticStudentResponse> => {
  const res = await api.get(`/statistic-student/${id}`);
  return res.data.data;
};

export const createStatisticStudent = async (
  data: {
    prodi: "S1" | "D3";
    year: number;
    enteredStudents: number;
    graduatedStudents: number;
  }
): Promise<StatisticStudentResponse> => {
  const res = await api.post("/statistic-student", data);
  return res.data.data;
};

export const updateStatisticStudent = async (
  id: string,
  data: {
    prodi?: "S1" | "D3";
    year?: number;
    enteredStudents?: number;
    graduatedStudents?: number;
  }
): Promise<StatisticStudentResponse> => {
  const res = await api.put(`/statistic-student/${id}`, data);
  return res.data.data;
};

export const deleteStatisticStudent = async (
  id: string
): Promise<StatisticStudentResponse> => {
  const res = await api.delete(`/statistic-student/${id}`);
  return res.data;
};