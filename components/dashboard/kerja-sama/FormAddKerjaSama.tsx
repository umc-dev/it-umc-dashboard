"use client";

import { useState, useMemo } from "react";
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

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddKerjaSama() {
  const router = useRouter();
  const createPartnership = useCreatePartnership();
  const [docFiles, setDocFiles] = useState<File[]>([]);

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
      if (data.description) fd.append("description", data.description);
      fd.append("startDate", data.startDate);
      fd.append("endDate", data.endDate);

      if (data.photo) {
        fd.append("photo", data.photo);
      }

      if (docFiles.length > 0) {
        docFiles.forEach((file) => {
          fd.append("files", file);
        });
      }

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

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Deskripsi Singkat Kerja Sama
          </label>
          <textarea
            {...register("description")}
            placeholder="Keterangan mengenai scope atau bidang kerjasama"
            rows={3}
            className={inputClassName}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
        </div>

        <ImageUpload
          label="Logo Mitra (Photo)"
          value={photo ?? null}
          onChange={(value) => setValue("photo", value)}
        />

        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Dokumentasi & Bukti Kerjasama (Foto Kegiatan / Berkas Penandatanganan)
          </label>
          <p className="text-xs text-muted-foreground mb-2">
            Unggah foto kegiatan penandatanganan, dokumentasi kegiatan, atau berkas bukti kerjasama (dapat memilih lebih dari 1 file)
          </p>
          <input
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                setDocFiles(Array.from(e.target.files));
              }
            }}
            className={inputClassName}
          />
          {docFiles.length > 0 && (
            <p className="text-xs text-muted-foreground mt-1 font-medium">
              {docFiles.length} file dipilih
            </p>
          )}
        </div>

        <FormButtons isLoading={createPartnership.isPending} />
      </form>
    </div>
  );
}