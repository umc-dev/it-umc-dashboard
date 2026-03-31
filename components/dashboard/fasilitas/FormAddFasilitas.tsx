"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateFacility } from "@/app/dashboard/fasilitas/queries";
import { CreateFacilityDto } from "@/app/dashboard/fasilitas/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateFacilitySchema } from "@/app/dashboard/fasilitas/validator";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useMemo } from "react";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddFasilitas() {
  const router = useRouter();
  const createFacility = useCreateFacility();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateFacilityDto>({
    resolver: zodResolver(CreateFacilitySchema),
    defaultValues: {
      photo: null,
    },
  });

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: CreateFacilityDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("description", data.description);

      if (!data.photo) {
        toast.error("Foto wajib diupload");
        return;
      }

      fd.append("photo", data.photo);

      await createFacility.mutateAsync(fd);

      toast.success("Fasilitas berhasil dibuat!", {
        description: data.name,
      });

      router.push("/dashboard/fasilitas");
    } catch (error: unknown) {
      let message = "Gagal membuat fasilitas.";

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
        title="Tambah Fasilitas"
        description="Tambahkan data fasilitas baru ke sistem"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        {/* NAMA FASILITAS */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Fasilitas <span className="text-destructive">*</span>
          </label>

          <input
            {...register("name")}
            placeholder="Masukkan nama fasilitas"
            className={inputClassName}
          />

          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Deskripsi <span className="text-destructive">*</span>
          </label>

          <textarea
            {...register("description")}
            placeholder="Masukkan deskripsi"
            className={inputClassName}
            rows={4}
          />

          {errors.description && (
            <p className="text-destructive text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* GAMBAR */}
        <ImageUpload
          label="Foto Fasilitas"
          value={photo}
          onChange={(value) => setValue("photo", value)}
        />

        {errors.photo && (
          <p className="text-destructive text-sm">{errors.photo.message}</p>
        )}

        <FormButtons isLoading={createFacility.isPending} />
      </form>
    </div>
  );
}
