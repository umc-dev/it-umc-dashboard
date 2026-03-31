"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import {
  useLectureshipById,
  useUpdateLectureship,
} from "@/app/dashboard/lectureships/queries";
import { UpdateLectureshipSchema } from "@/app/dashboard/lectureships/validator";
import { useForm } from "react-hook-form";
import { UpdateLectureshipDto } from "@/app/dashboard/lectureships/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditLectureship() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const updateLectureship = useUpdateLectureship();

  const { data: lectureship, isLoading } = useLectureshipById(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateLectureshipDto>({
    resolver: zodResolver(UpdateLectureshipSchema),
  });

  useEffect(() => {
    if (lectureship) {
      reset({
        name: lectureship.name,
      });
    }
  }, [lectureship, reset]);

  const onSubmit = async (data: UpdateLectureshipDto) => {
    try {
      await updateLectureship.mutateAsync({ id, data });

      toast.success("Lectureship berhasil diperbarui!", {
        description: data.name,
      });

      router.push("/dashboard/lectureships");
    } catch (err: unknown) {
      let message = "Gagal memperbarui jabatan dosen.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoading) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (!lectureship) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Jabatan dosen tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Edit Jabatan Dosen"
        description="Perbarui data jabatan dosen"
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
            placeholder="Masukkan nama jabatan dosen"
          />

          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <FormButtons isLoading={updateLectureship.isPending} />
      </form>
    </div>
  );
}
