import { z } from "zod";

const PositionSchema = z
  .object({
    lectureshipId: z
      .string()
      .min(1, "Jabatan dosen wajib dipilih")
      .transform((val) => Number(val)),
    startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
    endDate: z
      .string()
      .optional()
      .nullable()
      .transform((val) => (!val ? null : val)),
  })
  .refine((data) => !data.endDate || data.endDate >= data.startDate, {
    message: "Tanggal selesai harus setelah atau sama dengan tanggal mulai",
    path: ["endDate"],
  });

export const CreateDosenSchema = z.object({
  nidn: z.string().min(1, "NIDN wajib diisi"),
  name: z.string().min(1, "Nama wajib diisi"),
  expertise: z.string().min(1, "Spesialisasi wajib diisi"),
  research: z
    .string()
    .url("Link penelitian harus URL valid")
    .min(1, "Link penelitian wajib diisi"),
  teaching: z
    .string()
    .url("Link pengajaran harus URL valid")
    .min(1, "Link pengajaran wajib diisi"),
  positions: z.array(PositionSchema).default([]),
  photo: z
    .instanceof(File)
    .nullable()
    .refine((file) => file instanceof File, {
      message: "Foto wajib diupload",
    }),
});

export const UpdateDosenSchema = z.object({
  nidn: z.string().min(1, "NIDN wajib diisi").optional(),
  name: z.string().optional(),
  expertise: z.string().optional(),
  research: z.string().url("Link penelitian harus URL valid").optional(),
  teaching: z.string().url("Link pengajaran harus URL valid").optional(),
  positions: z.array(PositionSchema).optional(),
  photo: z.instanceof(File).nullable().optional(),
});
