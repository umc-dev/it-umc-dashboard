"use client";

import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import {
  useCategoryBySlug,
  useUpdateCategory,
} from "@/app/dashboard/kategori/queries";
import { UpdateCategoryDto } from "@/app/dashboard/kategori/types";
import { useForm } from "react-hook-form";
import { UpdateCategorySchema } from "@/app/dashboard/kategori/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { useEffect } from "react";

export function FormEditKategori() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const { data, isLoading } = useCategoryBySlug(slug);
  console.log(data);
  const updateCategory = useUpdateCategory();

  // Pake react hook form biar gampang
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateCategoryDto>({
    resolver: zodResolver(UpdateCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  // Set data awal kalo fetch sukses
  useEffect(() => {
    if (data && !isLoading) {
      reset({
        name: data.name,
      });
    }
  }, [data, isLoading, reset]);

  // Function pas submit
  const onSubmit = async (formData: UpdateCategoryDto) => {
    try {
      await updateCategory.mutateAsync({
        slug,
        data: formData,
      });

      toast.success("Kategory berhasil diperbarui!", {
        description: formData.name,
      });

      router.push("/dashboard/kategori");
    } catch (error: unknown) {
      let message = "Gagal membuat kategori.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", {
        description: message,
      });
    }
  };

  if (isLoading) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Kategori tidak ditemukan</p>
      </div>
    );
  }

  const inputClassName =
    "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Ubah Kategori"
        description="Ubah data kategori yang ada"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Kategori <span className="text-destructive">*</span>
          </label>
          <input
            {...register("name")}
            placeholder="Masukan nama category"
            className={inputClassName}
          />

          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>
        <FormButtons isLoading={updateCategory.isPending} />
      </form>
    </div>
  );
}
