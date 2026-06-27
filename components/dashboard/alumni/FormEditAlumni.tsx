"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useAlumniById, useUpdateAlumni } from "@/app/dashboard/alumni/queries";
import {
  UpdateAlumniDto,
  UpdateAlumniInputDto,
} from "@/app/dashboard/alumni/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAlumniSchema } from "@/app/dashboard/alumni/validator";
import { useForm, useWatch } from "react-hook-form";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditAlumni() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const updateAlumni = useUpdateAlumni();
  const { data: alumni, isLoading: isLoadingAlumni } = useAlumniById(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    control,
  } = useForm<UpdateAlumniInputDto, unknown, UpdateAlumniDto>({
    resolver: zodResolver(UpdateAlumniSchema),
  });

  useEffect(() => {
    if (alumni) {
      reset({
        name: alumni.name,
        message: alumni.message,
        year: alumni.year,
        video: alumni.video,
        prodi: alumni.prodi,
      });
    }
  }, [alumni, reset]);

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: UpdateAlumniDto) => {
    try {
      const fd = new FormData();
      if (data.name) fd.append("name", data.name);
      if (data.video) fd.append("video", data.video);
      if (data.message) fd.append("message", data.message);
      if (data.year !== undefined) fd.append("year", String(data.year));
      if (data.prodi) fd.append("prodi", data.prodi);
      if (data.photo) fd.append("photo", data.photo);

      await updateAlumni.mutateAsync({
        id,
        data: fd,
      });

      toast.success("Alumni berhasil diperbarui!", {
        description: data.name || alumni?.name,
      });

      router.push(`/dashboard/alumni?prodi=${data.prodi || alumni?.prodi}`);
    } catch (err: unknown) {
      let message = "Gagal memperbarui alumni.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingAlumni) {
    return <p className="text-center py-10 text-muted-foreground">Loading...</p>;
  }

  if (!alumni) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Alumni tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader title="Edit Alumni" description="Perbarui data alumni" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Alumni
          </label>
          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama alumni"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Program Studi
          </label>
          <select {...register("prodi")} className={inputClassName}>
            <option value="S1">S1 Teknik Informatika</option>
            <option value="D3">D3 Teknik Informatika</option>
          </select>
          {errors.prodi && (
            <p className="text-destructive text-sm">{errors.prodi.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tahun Lulus
          </label>
          <input
            {...register("year")}
            type="number"
            className={inputClassName}
            placeholder="Masukkan tahun lulus"
          />
          {errors.year && (
            <p className="text-destructive text-sm">{errors.year.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Video
          </label>
          <input
            {...register("video")}
            className={inputClassName}
            placeholder="Masukkan link video"
          />
          {errors.video && (
            <p className="text-destructive text-sm">{errors.video.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Pesan/Kesan
          </label>
          <textarea
            {...register("message")}
            rows={5}
            className={inputClassName}
            placeholder="Masukkan pesan/kesan"
          />
          {errors.message && (
            <p className="text-destructive text-sm">{errors.message.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground mb-2">
            Foto Lama
          </label>

          {alumni.photo ? (
            <Image
              src={alumni.photo}
              alt="Foto alumni"
              width={200}
              height={200}
              className="rounded-lg object-cover"
              unoptimized
            />
          ) : (
            <p className="text-sm text-muted-foreground">Belum ada foto.</p>
          )}
        </div>

        <ImageUpload
          label="Foto Alumni Baru"
          value={photo ?? null}
          onChange={(value) => setValue("photo", value)}
        />

        {errors.photo && (
          <p className="text-destructive text-sm">{errors.photo.message}</p>
        )}

        <FormButtons isLoading={updateAlumni.isPending} />
      </form>
    </div>
  );
}
