import { api } from "@/lib/api";
import {
  LectureshipResponse,
  PaginatedLectureshipResponse,
  CreateLectureshipDto,
  UpdateLectureshipDto,
} from "./types";

// GET ALL LECTURESHIPS
export const getLectureships = async (): Promise<PaginatedLectureshipResponse> => {
  const res = await api.get("/lectureships");
  return res.data;
};

// GET LECTURESHIP BY ID
export const getLectureshipById = async (id: number): Promise<LectureshipResponse> => {
  const res = await api.get(`/lectureships/${id}`);
  return res.data.data;
};

// CREATE LECTURESHIP
export const createLectureship = async (
  data: CreateLectureshipDto,
): Promise<LectureshipResponse> => {
  const res = await api.post("/lectureships", data);
  return res.data.data;
};

// UPDATE LECTURESHIP
export const updateLectureship = async (
  id: number,
  data: UpdateLectureshipDto,
): Promise<LectureshipResponse> => {
  const res = await api.put(`/lectureships/${id}`, data);
  return res.data.data;
};

// DELETE LECTURESHIP
export const deleteLectureship = async (id: number): Promise<LectureshipResponse> => {
  const res = await api.delete(`/lectureships/${id}`);
  return res.data;
};
