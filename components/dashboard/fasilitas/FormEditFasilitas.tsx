"use client";

import type React from "react";
import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import {
  useFacilityById,
  useUpdateFacility,
} from "@/app/dashboard/fasilitas/queries";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateFacilitySchema } from "@/app/dashboard/fasilitas/validator";
import { UpdateFacilityDto } from "@/app/dashboard/fasilitas/types";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditFasilitas({ id }: { id: string }) {
  const router = useRouter();
  const updateFacility = useUpdateFacility();

  const { data: facility, isLoading: isLoadingFacility } =
    useFacilityById(Number(id));

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(UpdateFacilitySchema),
  });

  useEffect(() => {
    if (facility) {
      reset({
        name: facility.name,
        description: facility.description,
      });
    }
  }, [facility, reset]);

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: UpdateFacilityDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name || "");
      fd.append("description", data.description || "");

      if (data.photo) {
        fd.append("photo", data.photo);
      }

      await updateFacility.mutateAsync({
        id: Number(id),
        data: fd,
      });

      toast.success("Fasilitas berhasil diperbarui!", {
        description: data.name,
      });

      router.push("/dashboard/fasilitas");
    } catch (err: unknown) {
      let message = "Gagal memperbarui fasilitas.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingFacility) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (!facility) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Fasilitas tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader
        title="Edit Fasilitas"
        description="Perbarui data fasilitas"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        {/* NAMA FASILITAS */}
        <div>
          <label>Nama Fasilitas</label>
          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama fasilitas"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message as string}</p>
          )}
        </div>

        {/* DESKRIPSI */}
        <div>
          <label>Deskripsi</label>
          <textarea
            {...register("description")}
            className={inputClassName}
            rows={4}
            placeholder="Masukkan deskripsi"
          />
          {errors.description && (
            <p className="text-destructive text-sm">{errors.description.message as string}</p>
          )}
        </div>

        {/* GAMBAR */}
        <div>
          <label>Foto Lama</label>

          {/* Foto lama */}
          {facility.photo && (
            <Image
              src={facility.photo}
              alt="Foto lama"
              width={200}
              height={120}
              className="rounded mb-3 object-cover"
              unoptimized
            />
          )}

          <ImageUpload
            label="Foto Fasilitas"
            value={photo ?? null}
            onChange={(value) => setValue("photo", value)}
          />

          {errors.photo && (
            <p className="text-destructive text-sm">{errors.photo.message as string}</p>
          )}
        </div>

        <FormButtons isLoading={updateFacility.isPending} />
      </form>
    </div>
  );
}
