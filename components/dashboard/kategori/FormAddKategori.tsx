"use client";

import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useCreateCategory } from "@/app/dashboard/kategori/queries";
import { CreateCategorySchema } from "@/app/dashboard/kategori/validator";
import { useForm } from "react-hook-form";
import { CreateCategoryDto } from "@/app/dashboard/kategori/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

export function FormAddKategori() {
  const router = useRouter();
  const createCategory = useCreateCategory();

  // Pake react hook form biar gampang
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCategoryDto>({
    resolver: zodResolver(CreateCategorySchema),
  });

  // Function pas submit
  const onSubmit = async (data: CreateCategoryDto) => {
    try {
      await createCategory.mutateAsync(data);

      toast.success("Kategori berhasil dibuat!", {
        description: data.name,
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

  const inputClassName =
    "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Tambah Kategori"
        description="Buat kategori berita baru"
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
            className={inputClassName}
            placeholder="Masukkan nama kategori"
          />

          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>
        <FormButtons isLoading={createCategory.isPending} />
      </form>
    </div>
  );
}
