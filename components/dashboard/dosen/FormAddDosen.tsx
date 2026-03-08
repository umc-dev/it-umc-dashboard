"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateDosen } from "@/app/dashboard/dosen/queries";
import { useLectureships } from "@/app/dashboard/lectureships/queries";
import { LectureshipResponse } from "@/app/dashboard/lectureships/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDosenSchema } from "@/app/dashboard/dosen/validator";
import { CreateDosenInputDto, CreateDosenDto } from "@/app/dashboard/dosen/types";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useMemo } from "react";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddDosen() {
  const router = useRouter();
  const createDosen = useCreateDosen();
  const { data: lectureships } = useLectureships();

  // Gunakan z.input<> (tipe sebelum transform) sebagai generic useForm
  // agar zodResolver dapat menginfer tipe dengan benar
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateDosenInputDto, unknown, CreateDosenDto>({
    resolver: zodResolver(CreateDosenSchema),
    defaultValues: {
      photo: null,
    },
  });

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  // data sudah bertipe CreateDosenDto (output setelah transform zod)
  const onSubmit = async (data: CreateDosenDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("expertise", data.expertise);
      fd.append("research", data.research);
      fd.append("teaching", data.teaching);

      if (!data.photo) {
        toast.error("Foto wajib diupload");
        return;
      }

      fd.append("photo", data.photo);

      if (data.lectureshipId !== undefined && data.lectureshipId !== null) {
        fd.append("lectureshipId", String(data.lectureshipId));
      }

      await createDosen.mutateAsync(fd);

      toast.success("Dosen berhasil dibuat!", {
        description: data.name,
      });

      router.push("/dashboard/dosen");
    } catch (error: unknown) {
      let message = "Gagal membuat dosen.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", {
        description: message,
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Tambah Dosen"
        description="Tambahkan data dosen baru ke sistem"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        {/* NAMA */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Dosen <span className="text-destructive">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="Masukkan nama dosen"
            className={inputClassName}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* EXPERTISE */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Spesialisasi <span className="text-destructive">*</span>
          </label>
          <input
            {...register("expertise")}
            placeholder="Masukkan spesialisasi"
            className={inputClassName}
          />
          {errors.expertise && (
            <p className="text-destructive text-sm">{errors.expertise.message}</p>
          )}
        </div>

        {/* RESEARCH */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Penelitian <span className="text-destructive">*</span>
          </label>
          <input
            type="url"
            {...register("research")}
            placeholder="https://..."
            className={inputClassName}
          />
          {errors.research && (
            <p className="text-destructive text-sm">{errors.research.message}</p>
          )}
        </div>

        {/* TEACHING */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Pengajaran <span className="text-destructive">*</span>
          </label>
          <input
            type="url"
            {...register("teaching")}
            placeholder="https://..."
            className={inputClassName}
          />
          {errors.teaching && (
            <p className="text-destructive text-sm">{errors.teaching.message}</p>
          )}
        </div>

        {/* LECTURESHIP */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Jabatan Dosen
          </label>
          <select
            {...register("lectureshipId")}
            className={inputClassName}
          >
            <option value="">-- Pilih Jabatan Dosen --</option>
            {lectureships?.data?.map((ls: LectureshipResponse) => (
              <option key={ls.id} value={ls.id}>
                {ls.name}
              </option>
            ))}
          </select>
          {errors.lectureshipId && (
            <p className="text-destructive text-sm">{errors.lectureshipId.message as string}</p>
          )}
        </div>

        {/* PHOTO */}
        <ImageUpload
          label="Foto Dosen"
          value={photo}
          onChange={(value) => setValue("photo", value)}
        />
        {errors.photo && (
          <p className="text-destructive text-sm">{errors.photo.message}</p>
        )}

        <FormButtons isLoading={createDosen.isPending} />
      </form>
    </div>
  );
}