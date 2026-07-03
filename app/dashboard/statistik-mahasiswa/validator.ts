import { z } from "zod";

export const CreateStatisticStudentSchema = z.object({
  prodi: z.enum(["S1", "D3"], { message: "Prodi wajib dipilih" }),
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
  prodi: z.enum(["S1", "D3"]).optional(),
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