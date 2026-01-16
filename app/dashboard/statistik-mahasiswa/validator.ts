import { z } from "zod";

export const CreateStatisticStudentSchema = z.object({
  year: z
    .number()
    .min(2000, "Tahun minimal 2000"),
  enteredStudents: z
    .number()
    .min(0, "Mahasiswa masuk tidak boleh negatif"),
  graduatedStudents: z
    .number()
    .min(0, "Mahasiswa keluar tidak boleh negatif"),
});

export const UpdateStatisticStudentSchema = z.object({
  year: z.number().min(2000, "Tahun minimal 2000").optional(),
  enteredStudents: z
    .number()
    .min(0, "Mahasiswa masuk tidak boleh negatif")
    .optional(),
  graduatedStudents: z
    .number()
    .min(0, "Mahasiswa keluar tidak boleh negatif")
    .optional(),
});