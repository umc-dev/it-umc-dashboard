"use client";

import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useCreateLectureship } from "@/app/dashboard/lectureships/queries";
import { CreateLectureshipSchema } from "@/app/dashboard/lectureships/validator";
import { useForm } from "react-hook-form";
import { CreateLectureshipDto } from "@/app/dashboard/lectureships/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddLectureship() {
  const router = useRouter();
  const createLectureship = useCreateLectureship();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLectureshipDto>({
    resolver: zodResolver(CreateLectureshipSchema),
  });

  const onSubmit = async (data: CreateLectureshipDto) => {
    try {
      await createLectureship.mutateAsync(data);

      toast.success("Jabatan dosen berhasil dibuat!", {
        description: data.name,
      });

      router.push("/dashboard/lectureships");
    } catch (error: unknown) {
      let message = "Gagal membuat jabatan dosen.";

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
        title="Tambah Jabatan Dosen"
        description="Buat jabatan dosen baru"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Jabatan Dosen <span className="text-destructive">*</span>
          </label>

          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama Jabatan Dosen"
          />

          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <FormButtons isLoading={createLectureship.isPending} />
      </form>
    </div>
  );
}
