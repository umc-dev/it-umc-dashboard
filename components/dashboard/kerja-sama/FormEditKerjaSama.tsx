"use client";

import { useEffect, useMemo, useState } from "react";
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
import { FileText } from "lucide-react";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditKerjaSama() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const updatePartnership = useUpdatePartnership();
  const [docFiles, setDocFiles] = useState<File[]>([]);

  const { data: partnership, isLoading: isLoadingPartnership } =
    usePartnershipById(id);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdatePartnershipDto>({
    resolver: zodResolver(UpdatePartnershipSchema),
  });

  useEffect(() => {
    if (partnership) {
      reset({
        name: partnership.name,
        description: partnership.description ?? undefined,
        startDate: partnership.startDate ? partnership.startDate.split("T")[0] : "",
        endDate: partnership.endDate ? partnership.endDate.split("T")[0] : "",
      });
    }
  }, [partnership, reset]);

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: UpdatePartnershipDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name || "");
      if (data.description) fd.append("description", data.description);
      fd.append("startDate", data.startDate || "");
      fd.append("endDate", data.endDate || "");

      if (data.photo) {
        fd.append("photo", data.photo);
      }

      if (docFiles.length > 0) {
        docFiles.forEach((file) => {
          fd.append("files", file);
        });
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
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Mitra
          </label>
          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama mitra"
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
            rows={3}
            className={inputClassName}
            placeholder="Keterangan mengenai lingkup kerjasama"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tanggal Mulai
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
              Tanggal Berakhir
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

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Logo Mitra Saat Ini
          </label>
          {partnership.photo ? (
            <Image
              src={partnership.photo}
              alt="Logo mitra"
              width={160}
              height={100}
              className="rounded-lg object-contain bg-muted p-2 border border-border mb-3"
              unoptimized
            />
          ) : (
            <p className="text-sm text-muted-foreground mb-3">Belum ada logo.</p>
          )}

          <ImageUpload
            label="Upload Logo Baru (opsional)"
            value={photo ?? null}
            onChange={(value) => setValue("photo", value)}
          />

          {errors.photo && (
            <p className="text-destructive text-sm">{errors.photo.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Lampiran Berkas MOU/MOA Saat Ini
          </label>
          {partnership.files && partnership.files.length > 0 ? (
            <div className="space-y-1 mb-3">
              {partnership.files.map((file) => (
                <a
                  key={file.id}
                  href={file.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <FileText className="w-4 h-4" />
                  {file.fileName}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground mb-3">Belum ada lampiran berkas.</p>
          )}

          <label className="block text-sm font-medium text-foreground mb-2">
            Tambah Lampiran Berkas Baru (PDF/Dokumen)
          </label>
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
            <p className="text-xs text-muted-foreground mt-1">
              {docFiles.length} file baru dipilih
            </p>
          )}
        </div>

        <FormButtons isLoading={updatePartnership.isPending} />
      </form>
    </div>
  );
}