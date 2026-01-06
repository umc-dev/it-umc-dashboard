"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useAlumniById, useUpdateAlumni } from "@/app/dashboard/alumni/queries";
import { UpdateAlumniDto } from "@/app/dashboard/alumni/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAlumniSchema } from "@/app/dashboard/alumni/validator";
import { useForm } from "react-hook-form";
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
  } = useForm<UpdateAlumniDto>({
    resolver: zodResolver(UpdateAlumniSchema),
  });

  // Populate form with existing data
  useEffect(() => {
    if (alumni) {
      reset({
        name: alumni.name,
        message: alumni.message,
        year: alumni.year,
        video: alumni.video,
      });
    }
  }, [alumni, reset]);

  const onSubmit = async (data: UpdateAlumniDto) => {
    try {
      await updateAlumni.mutateAsync({
        id,
        data,
      });

      toast.success("Alumni berhasil diperbarui!", {
        description: data.name,
      });

      router.push("/dashboard/alumni");
    } catch (err: unknown) {
      let message = "Gagal memperbarui alumni.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingAlumni) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
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
        {/* NAMA */}
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

        {/* TAHUN LULUS */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tahun Lulus
          </label>
          <input
            {...register("year", { valueAsNumber: true })}
            type="number"
            className={inputClassName}
            placeholder="Masukkan tahun lulus"
          />
          {errors.year && (
            <p className="text-destructive text-sm">{errors.year.message}</p>
          )}
        </div>

        {/* VIDEO */}
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

        {/* MESSAGE */}
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

        <FormButtons isLoading={updateAlumni.isPending} />
      </form>
    </div>
  );
}