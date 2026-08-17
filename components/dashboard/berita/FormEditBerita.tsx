"use client";

import type React from "react";
import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import { useNewsBySlug, useUpdateNews } from "@/app/dashboard/berita/queries";
import { useCategory } from "@/app/dashboard/kategori/queries";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateNewsSchema } from "@/app/dashboard/berita/validator";
import { UpdateNewsDto } from "@/app/dashboard/berita/types";
import { TiptapEditor } from "@/components/TiptapEditor";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

export function FormEditBerita() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const updateNews = useUpdateNews();

  const { data: news, isLoading: isLoadingNews } = useNewsBySlug(slug);
  const { data: categories, isLoading: isLoadingCategories } = useCategory();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(UpdateNewsSchema),
  });

  useEffect(() => {
    if (news) {
      reset({
        title: news.title,
        content: news.content,
        categoryId: news.categoryId != null ? String(news.categoryId) : "",
      });
    }
  }, [news, reset]);

  // Ambil nilai pakai useWatch
  const watchedThumbnail = useWatch({ control, name: "thumbnail" });
  const watchedContent = useWatch({ control, name: "content" });

  // Bungkus hasilnya dengan useMemo
  const thumbnail = useMemo(() => watchedThumbnail, [watchedThumbnail]);
  const content = useMemo(() => watchedContent, [watchedContent]);

  const onSubmit = async (data: UpdateNewsDto) => {
    try {
      const fd = new FormData();
      fd.append("title", data.title || "");

      fd.append("content", data.content || "");

      fd.append("categoryId", String(data.categoryId ?? ""));

      if (data.thumbnail) {
        fd.append("thumbnail", data.thumbnail);
      }

      await updateNews.mutateAsync({
        slug,
        data: fd,
      });

      toast.success("Berita berhasil diperbarui!", {
        description: data.title,
      });

      router.push("/dashboard/berita");
    } catch (err: unknown) {
      let message = "Gagal memperbarui berita.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingNews) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (!news) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Berita tidak ditemukan</p>
      </div>
    );
  }

  const inputClassName =
    "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader title="Edit Berita" description="Perbarui konten berita" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        {/* TITLE */}
        <div>
          <label>Judul Berita</label>
          <input
            {...register("title")}
            className={inputClassName}
            placeholder="Masukkan judul"
          />
          {errors.title && (
            <p className="text-destructive text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* CONTENT */}
        <div>
          <label>Isi Berita</label>

          <TiptapEditor
            value={content ?? ""}
            onValueChange={(value) => setValue("content", value)}
          />

          {errors.content && (
            <p className="text-destructive text-sm">{errors.content.message}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label>Kategori</label>
          <select {...register("categoryId")} className={inputClassName}>
            <option value="">Pilih kategori...</option>

            {isLoadingCategories ? (
              <option disabled>Loading kategori...</option>
            ) : (
              categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>

          {errors.categoryId && (
            <p className="text-destructive text-sm">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        {/* THUMBNAIL */}
        <div>
          <label>Thumbnail Lama</label>

          {/* Thumbnail lama */}
          {news.thumbnail && (
            <Image
              src={news.thumbnail}
              alt="Thumbnail lama"
              width={200}
              height={120}
              className="rounded mb-3"
              unoptimized
            />
          )}

          <ImageUpload
            label="Thumbnail Berita"
            value={thumbnail ?? null}
            onChange={(value) => setValue("thumbnail", value)}
          />

          {errors.thumbnail && (
            <p className="text-destructive text-sm">
              {errors.thumbnail.message}
            </p>
          )}
        </div>

        <FormButtons isLoading={updateNews.isPending} />
      </form>
    </div>
  );
}
