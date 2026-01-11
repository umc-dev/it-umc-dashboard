import { z } from "zod";

export const CreatePartnershipSchema = z
  .object({
    name: z.string().min(1, "Nama mitra wajib diisi"),
    photo: z
      .instanceof(File)
      .nullable()
      .refine((file) => file instanceof File, {
        message: "Logo wajib diupload",
      }),
    startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
    endDate: z.string().min(1, "Tanggal berakhir wajib diisi"),
  })
  .refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "Tanggal berakhir harus setelah atau sama dengan tanggal mulai",
    path: ["endDate"],
  });

export const UpdatePartnershipSchema = z
  .object({
    name: z.string().optional(),
    photo: z.instanceof(File).nullable().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;
      return new Date(data.endDate) >= new Date(data.startDate);
    },
    {
      message: "Tanggal berakhir harus setelah atau sama dengan tanggal mulai",
      path: ["endDate"],
    },
  );