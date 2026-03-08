"use client";

import type React from "react";
import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import {
  useDosenById,
  useUpdateDosen,
} from "@/app/dashboard/dosen/queries";
import { useLectureships } from "@/app/dashboard/lectureships/queries";
import { LectureshipResponse } from "@/app/dashboard/lectureships/types";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateDosenSchema } from "@/app/dashboard/dosen/validator";
import { UpdateDosenDto, UpdateDosenInputDto } from "@/app/dashboard/dosen/types";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditDosen() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const updateDosen = useUpdateDosen();

  const { data: dosen, isLoading: isLoadingDosen } = useDosenById(id);
  const { data: lectureships } = useLectureships();

  // Gunakan z.input<> (tipe sebelum transform) sebagai generic useForm
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdateDosenInputDto, unknown, UpdateDosenDto>({
    resolver: zodResolver(UpdateDosenSchema),
  });

  useEffect(() => {
    if (dosen) {
      reset({
        name: dosen.name,
        expertise: dosen.expertise,
        research: dosen.research,
        teaching: dosen.teaching,
        // Kembalikan ke string karena form field bertipe string (sebelum transform)
        lectureshipId: dosen.lectureship?.id != null ? String(dosen.lectureship.id) : "",
      });
    }
  }, [dosen, reset]);

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  // data sudah bertipe UpdateDosenDto (output setelah transform zod)
  const onSubmit = async (data: UpdateDosenDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name || "");
      fd.append("expertise", data.expertise || "");
      fd.append("research", data.research || "");
      fd.append("teaching", data.teaching || "");

      if (data.photo) {
        fd.append("photo", data.photo);
      }

      if (data.lectureshipId !== undefined && data.lectureshipId !== null) {
        fd.append("lectureshipId", String(data.lectureshipId));
      }

      await updateDosen.mutateAsync({ id, data: fd });

      toast.success("Dosen berhasil diperbarui!", {
        description: data.name,
      });

      router.push("/dashboard/dosen");
    } catch (err: unknown) {
      let message = "Gagal memperbarui dosen.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingDosen) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (!dosen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Dosen tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader title="Edit Dosen" description="Perbarui data dosen" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        {/* NAMA */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Nama Dosen</label>
          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama dosen"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* EXPERTISE */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Spesialisasi</label>
          <input
            {...register("expertise")}
            className={inputClassName}
            placeholder="Masukkan spesialisasi"
          />
          {errors.expertise && (
            <p className="text-destructive text-sm">{errors.expertise.message}</p>
          )}
        </div>

        {/* RESEARCH */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Link Penelitian</label>
          <input
            type="url"
            {...register("research")}
            className={inputClassName}
            placeholder="https://..."
          />
          {errors.research && (
            <p className="text-destructive text-sm">{errors.research.message}</p>
          )}
        </div>

        {/* TEACHING */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Link Pengajaran</label>
          <input
            type="url"
            {...register("teaching")}
            className={inputClassName}
            placeholder="https://..."
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
          <select {...register("lectureshipId")} className={inputClassName}>
            <option value="">-- Pilih Jabatan Dosen  --</option>
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
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Foto Lama</label>

          {dosen.photo && (
            <Image
              src={dosen.photo}
              alt="Foto lama"
              width={200}
              height={120}
              className="rounded mb-3"
              unoptimized
            />
          )}

          <ImageUpload
            label="Foto Dosen"
            value={photo ?? null}
            onChange={(value) => setValue("photo", value)}
          />

          {errors.photo && (
            <p className="text-destructive text-sm">{errors.photo.message}</p>
          )}
        </div>

        <FormButtons isLoading={updateDosen.isPending} />
      </form>
    </div>
  );
}