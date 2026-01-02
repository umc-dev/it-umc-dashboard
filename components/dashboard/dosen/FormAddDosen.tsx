"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateDosen } from "@/app/dashboard/dosen/queries";
import { CreateDosenDto } from "@/app/dashboard/dosen/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateDosenSchema } from "@/app/dashboard/dosen/validator";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useMemo } from "react";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddDosen() {
  const router = useRouter();
  const createDosen = useCreateDosen();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateDosenDto>({
    resolver: zodResolver(CreateDosenSchema),
    defaultValues: {
      photo: null,
    },
  });

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

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