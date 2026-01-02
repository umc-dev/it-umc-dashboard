"use client";

import type React from "react";
import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import {
  usePartnershipById,
  useUpdatePartnership,
} from "@/app/dashboard/kerja-sama/queries";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePartnershipSchema } from "@/app/dashboard/kerja-sama/validator";
import { UpdatePartnershipDto } from "@/app/dashboard/kerja-sama/types";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditKerjaSama() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const updatePartnership = useUpdatePartnership();

  const { data: partnership, isLoading: isLoadingPartnership } =
    usePartnershipById(id);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(UpdatePartnershipSchema),
  });

  useEffect(() => {
    if (partnership) {
      reset({
        name: partnership.name,
        startDate: partnership.startDate.split("T")[0], // Format to YYYY-MM-DD
        endDate: partnership.endDate.split("T")[0],
      });
    }
  }, [partnership, reset]);

  // Ambil nilai pakai useWatch
  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: UpdatePartnershipDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name || "");
      fd.append("startDate", data.startDate || "");
      fd.append("endDate", data.endDate || "");

      if (data.photo) {
        fd.append("photo", data.photo);
      }

      await updatePartnership.mutateAsync({
        id,
        data: fd,
      });

      toast.success("Kerja sama berhasil diperbarui!", {
        description: data.name,
      });

      router.push("/dashboard/kerja-sama");
    } catch (err: unknown) {
      let message = "Gagal memperbarui kerja sama.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingPartnership) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (!partnership) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Kerja sama tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader
        title="Edit Kerja Sama"
        description="Perbarui data kerja sama"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        {/* NAMA MITRA */}
        <div>
          <label>Nama Mitra</label>
          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama mitra"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* TANGGAL MULAI */}
        <div>
          <label>Tanggal Mulai</label>
          <input
            type="date"
            {...register("startDate")}
            className={inputClassName}
          />
          {errors.startDate && (
            <p className="text-destructive text-sm">
              {errors.startDate.message}
            </p>
          )}
        </div>

        {/* TANGGAL BERAKHIR */}
        <div>
          <label>Tanggal Berakhir</label>
          <input
            type="date"
            {...register("endDate")}
            className={inputClassName}
          />
          {errors.endDate && (
            <p className="text-destructive text-sm">{errors.endDate.message}</p>
          )}
        </div>

        {/* PHOTO */}
        <div>
          <label>Logo Lama</label>

          {/* Logo lama */}
          {partnership.photo && (
            <Image
              src={partnership.photo}
              alt="Logo lama"
              width={200}
              height={120}
              className="rounded mb-3"
              unoptimized
            />
          )}

          <ImageUpload
            label="Logo Mitra"
            value={photo ?? null}
            onChange={(value) => setValue("photo", value)}
          />

          {errors.photo && (
            <p className="text-destructive text-sm">{errors.photo.message}</p>
          )}
        </div>

        <FormButtons isLoading={updatePartnership.isPending} />
      </form>
    </div>
  );
}