"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreatePartnership } from "@/app/dashboard/kerja-sama/queries";
import { CreatePartnershipDto } from "@/app/dashboard/kerja-sama/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePartnershipSchema } from "@/app/dashboard/kerja-sama/validator";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useMemo } from "react";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddKerjaSama() {
  const router = useRouter();
  const createPartnership = useCreatePartnership();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreatePartnershipDto>({
    resolver: zodResolver(CreatePartnershipSchema),
    defaultValues: {
      photo: null,
    },
  });

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: CreatePartnershipDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("startDate", data.startDate);
      fd.append("endDate", data.endDate);

      if (!data.photo) {
        toast.error("Logo wajib diupload");
        return;
      }

      fd.append("photo", data.photo);

      await createPartnership.mutateAsync(fd);

      toast.success("Kerja sama berhasil dibuat!", {
        description: data.name,
      });

      router.push("/dashboard/kerja-sama");
    } catch (error: unknown) {
      let message = "Gagal membuat kerja sama.";

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
        title="Tambah Kerja Sama"
        description="Tambahkan data kerja sama baru ke sistem"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        {/* NAMA MITRA */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Mitra <span className="text-destructive">*</span>
          </label>

          <input
            {...register("name")}
            placeholder="Masukkan nama mitra"
            className={inputClassName}
          />

          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* TANGGAL MULAI */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tanggal Mulai <span className="text-destructive">*</span>
          </label>

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
          <label className="block text-sm font-medium text-foreground mb-2">
            Tanggal Berakhir <span className="text-destructive">*</span>
          </label>

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
        <ImageUpload
          label="Logo Mitra"
          value={photo}
          onChange={(value) => setValue("photo", value)}
        />

        {errors.photo && (
          <p className="text-destructive text-sm">{errors.photo.message}</p>
        )}

        <FormButtons isLoading={createPartnership.isPending} />
      </form>
    </div>
  );
}