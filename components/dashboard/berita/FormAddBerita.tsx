"use client";

import type React from "react";
import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { TiptapEditor } from "@/components/TiptapEditor";
import { useCreateNews } from "@/app/dashboard/berita/queries";
import { CreateNewsDto } from "@/app/dashboard/berita/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateNewsSchema } from "@/app/dashboard/berita/validator";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useCategory } from "@/app/dashboard/kategori/queries";
import { base64ToFile } from "@/lib/upload";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddBerita() {
  const router = useRouter();
  const createNews = useCreateNews();
  const { data, isLoading } = useCategory();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateNewsDto>({
    resolver: zodResolver(CreateNewsSchema),
  });

  const thumbnail = watch("thumbnail");
  const body = watch("content");

  const onSubmit = async (data: CreateNewsDto) => {
    try {
      const fd = new FormData();
      fd.append("title", data.title);
      fd.append("content", data.content);
      fd.append("categoryId", data.categoryId);

      const file = base64ToFile(data.thumbnail, `${data.title}.png`);
      fd.append("thumbnail", file);

      console.log(fd);

      await createNews.mutateAsync(fd);

      toast.success("Berita berhasil dibuat!", {
        description: data.title,
      });

      router.push("/dashboard/berita");
    } catch (error: unknown) {
      let message = "Gagal membuat berita.";

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
        title="Tambah Berita"
        description="Buat berita baru di sistem"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        {/* JUDUL */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Judul Berita <span className="text-destructive">*</span>
          </label>

          <input
            {...register("title")}
            placeholder="Masukkan judul berita"
            className={inputClassName}
          />

          {errors.title && (
            <p className="text-destructive text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* BODY */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Isi Berita <span className="text-destructive">*</span>
          </label>

          <TiptapEditor
            value={body}
            onValueChange={(value) => setValue("content", value)}
          />

          {errors.content && (
            <p className="text-destructive text-sm">{errors.content.message}</p>
          )}
        </div>

        {/* THUMBNAIL */}
        <ImageUpload
          label="Thumbnail Berita"
          value={thumbnail}
          onChange={(value) => setValue("thumbnail", value)}
          preview={true}
        />

        {errors.thumbnail && (
          <p className="text-destructive text-sm">{errors.thumbnail.message}</p>
        )}

        {/* KATEGORI */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Kategori <span className="text-destructive">*</span>
          </label>

          {isLoading ? (
            // Spinner state
            <div className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg bg-muted animate-pulse text-muted-foreground">
              <div className="h-4 w-4 border-2 border-muted-foreground border-t-transparent rounded-full animate-spin" />
              <span>Memuat kategori...</span>
            </div>
          ) : (
            // Normal select
            <select {...register("categoryId")} className={inputClassName}>
              <option value="">Pilih kategori...</option>

              {data?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}

          {errors.categoryId && (
            <p className="text-destructive text-sm">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <FormButtons isLoading={createNews.isPending} />
      </form>
    </div>
  );
}
