"use client";

import type React from "react";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { TiptapEditor } from "@/components/TiptapEditor";
import { useStrukturOrganisasi, useUpdateStrukturOrganisasi } from "@/app/dashboard/struktur-organisasi/queries";
import { UpdateStrukturOrganisasiDto } from "@/app/dashboard/struktur-organisasi/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStrukturOrganisasiSchema } from "@/app/dashboard/struktur-organisasi/validator";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import Image from "next/image";

export function FormEditStrukturOrganisasi() {
  const router = useRouter();
  
  const { data: currentData, isLoading } = useStrukturOrganisasi();
  const updateStrukturOrganisasi = useUpdateStrukturOrganisasi();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateStrukturOrganisasiDto>({
    resolver: zodResolver(UpdateStrukturOrganisasiSchema),
    defaultValues: {
      description: "",
    },
  });

  useEffect(() => {
    if (currentData) {
      reset({
        description: currentData.description,
      });
    }
  }, [currentData, reset]);

  const watchedDescription = useWatch({ control, name: "description" });
  const description = useMemo(() => watchedDescription, [watchedDescription]);

  const onSubmit = async (data: UpdateStrukturOrganisasiDto) => {
    try {
      const fd = new FormData();
      
      if (data.description !== undefined) {
        fd.append("description", data.description);
      }

      if (imageFile) {
        fd.append("image", imageFile);
      }

      await updateStrukturOrganisasi.mutateAsync(fd);

      toast.success("Struktur Organisasi berhasil diperbarui!");
      router.push("/dashboard/struktur-organisasi");
    } catch (error: unknown) {
      let message = "Gagal memperbarui struktur organisasi.";
      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }
      toast.error("Terjadi kesalahan!", {
        description: message,
      });
    }
  };

  if (isLoading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Ubah Struktur Organisasi"
        description="Perbarui konten bagan struktur organisasi"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        {/* THUMBNAIL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Gambar Struktur Saat Ini
          </label>
          
          {currentData?.image && (
            <Image
              src={currentData.image}
              alt="Thumbnail lama"
              width={300}
              height={170}
              className="rounded-lg border border-border mb-4 object-contain bg-muted"
              unoptimized
            />
          )}

          <ImageUpload
            label="Upload Gambar Baru (Opsional)"
            value={imageFile}
            onChange={(value) => setImageFile(value as File | null)}
          />
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Keterangan Struktur <span className="text-destructive">*</span>
          </label>
          <TiptapEditor
            value={description ?? ""}
            onValueChange={(value) => setValue("description", value)}
          />
          {errors.description && (
            <p className="text-destructive text-sm">{errors.description.message}</p>
          )}
        </div>

        <FormButtons isLoading={updateStrukturOrganisasi.isPending} />
      </form>
    </div>
  );
}
