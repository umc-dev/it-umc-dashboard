"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { TiptapEditor } from "@/components/TiptapEditor";
import { useCreateStrukturOrganisasi } from "@/app/dashboard/struktur-organisasi/queries";
import { CreateStrukturOrganisasiDto } from "@/app/dashboard/struktur-organisasi/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateStrukturOrganisasiSchema } from "@/app/dashboard/struktur-organisasi/validator";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

export function FormAddStrukturOrganisasi() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultProdi = (searchParams.get("prodi") as "S1" | "D3") || "S1";
  const createStrukturOrganisasi = useCreateStrukturOrganisasi();

  const [image, setImage] = useState<File | null>(null);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateStrukturOrganisasiDto>({
    resolver: zodResolver(CreateStrukturOrganisasiSchema),
    defaultValues: {
      description: "",
      prodi: defaultProdi,
    },
  });

  const watchedDescription = useWatch({ control, name: "description" });
  const description = useMemo(() => watchedDescription, [watchedDescription]);

  const onSubmit = async (data: CreateStrukturOrganisasiDto) => {
    try {
      if (!image) {
        toast.error("Gambar wajib diupload", {
          description: "Harap masukkan gambar struktur organisasi",
        });
        return;
      }

      const fd = new FormData();
      fd.append("description", data.description);
      fd.append("image", image);
      fd.append("prodi", defaultProdi);

      await createStrukturOrganisasi.mutateAsync(fd);

      toast.success("Struktur Organisasi berhasil dibuat!");
      router.push(`/dashboard/struktur-organisasi?prodi=${defaultProdi}`);
    } catch (error: unknown) {
      let message = "Gagal membuat struktur organisasi.";
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
        title={`Tambah Struktur Organisasi (${defaultProdi})`}
        description="Buat bagan struktur organisasi baru"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        {/* GAMBAR */}
        <div>
          <ImageUpload
            label="Gambar Struktur Organisasi *"
            value={image}
            onChange={(value) => setImage(value as File | null)}
          />
        </div>

        {/* DESKRIPSI */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Keterangan Struktur <span className="text-destructive">*</span>
          </label>
          <TiptapEditor
            value={description}
            onValueChange={(value) => setValue("description", value)}
          />
          {errors.description && (
            <p className="text-destructive text-sm">{errors.description.message}</p>
          )}
        </div>

        <FormButtons isLoading={createStrukturOrganisasi.isPending} />
      </form>
    </div>
  );
}
