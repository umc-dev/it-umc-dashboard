"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useCreateAlumni } from "@/app/dashboard/alumni/queries";
import {
  CreateAlumniDto,
  CreateAlumniInputDto,
} from "@/app/dashboard/alumni/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAlumniSchema } from "@/app/dashboard/alumni/validator";
import { useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddAlumni() {
  const router = useRouter();
  const createAlumni = useCreateAlumni();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateAlumniInputDto, unknown, CreateAlumniDto>({
    resolver: zodResolver(CreateAlumniSchema),
    defaultValues: {
      year: 2000,
      photo: null,
    },
  });

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: CreateAlumniDto) => {
    try {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("video", data.video);
      fd.append("message", data.message);
      fd.append("year", String(data.year));
      if (data.photo) {
        fd.append("photo", data.photo);
      }

      await createAlumni.mutateAsync(fd);

      toast.success("Alumni berhasil dibuat!", {
        description: data.name,
      });

      router.push("/dashboard/alumni");
    } catch (error: unknown) {
      let message = "Gagal membuat alumni.";

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
        title="Tambah Alumni"
        description="Buat data alumni baru di sistem"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Alumni <span className="text-destructive">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="Masukkan nama alumni"
            className={inputClassName}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tahun Lulus <span className="text-destructive">*</span>
          </label>
          <input
            {...register("year")}
            type="number"
            placeholder="Masukkan tahun lulus"
            className={inputClassName}
          />
          {errors.year && (
            <p className="text-destructive text-sm">{errors.year.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Video <span className="text-destructive">*</span>
          </label>
          <input
            {...register("video")}
            placeholder="Masukkan link video"
            className={inputClassName}
          />
          {errors.video && (
            <p className="text-destructive text-sm">{errors.video.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Pesan/Kesan <span className="text-destructive">*</span>
          </label>
          <textarea
            {...register("message")}
            placeholder="Masukkan pesan/kesan"
            rows={5}
            className={inputClassName}
          />
          {errors.message && (
            <p className="text-destructive text-sm">{errors.message.message}</p>
          )}
        </div>

        <ImageUpload
          label="Foto Alumni"
          value={photo ?? null}
          onChange={(value) => setValue("photo", value)}
        />

        {errors.photo && (
          <p className="text-destructive text-sm">{errors.photo.message}</p>
        )}

        <FormButtons isLoading={createAlumni.isPending} />
      </form>
    </div>
  );
}
