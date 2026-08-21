"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import {
  useAchievementById,
  useUpdateAchievement,
} from "@/app/dashboard/achievement/queries";
import { UpdateAchievementDto } from "@/app/dashboard/achievement/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateAchievementSchema } from "@/app/dashboard/achievement/validator";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditAchievement() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const updateAchievement = useUpdateAchievement();
  const { data: achievement, isLoading } = useAchievementById(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateAchievementDto>({
    resolver: zodResolver(UpdateAchievementSchema),
  });

  useEffect(() => {
    if (achievement) {
      reset({
        prodi: achievement.prodi,
        category: achievement.category || "AKADEMIK",
        name: achievement.name,
        achievementName: achievement.achievementName,
        link: achievement.link,
        achievedAt: achievement.achievedAt.slice(0, 10),
      });
    }
  }, [achievement, reset]);

  const onSubmit = async (data: UpdateAchievementDto) => {
    try {
      await updateAchievement.mutateAsync({ id, data });

      toast.success("Prestasi berhasil diperbarui!", {
        description: data.achievementName || achievement?.achievementName,
      });

      router.push("/dashboard/achievement");
    } catch (error: unknown) {
      let message = "Gagal memperbarui prestasi.";

      if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", {
        description: message,
      });
    }
  };

  if (isLoading) {
    return <p className="text-center py-10 text-muted-foreground">Loading...</p>;
  }

  if (!achievement) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Prestasi tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Edit Prestasi"
        description="Perbarui data prestasi mahasiswa"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Program Studi
          </label>
          <select
            {...register("prodi")}
            className={inputClassName}
            disabled
          >
            <option value="S1">S1 Teknik Informatika</option>
            <option value="D3">D3 Teknik Informatika</option>
          </select>
          {errors.prodi && (
            <p className="text-destructive text-sm">{errors.prodi.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Kategori Prestasi
          </label>
          <select {...register("category")} className={inputClassName}>
            <option value="AKADEMIK">Akademik</option>
            <option value="NON_AKADEMIK">Non-Akademik</option>
          </select>
          {errors.category && (
            <p className="text-destructive text-sm">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Mahasiswa
          </label>
          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama mahasiswa"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Prestasi
          </label>
          <input
            {...register("achievementName")}
            className={inputClassName}
            placeholder="Masukkan nama prestasi"
          />
          {errors.achievementName && (
            <p className="text-destructive text-sm">
              {errors.achievementName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Sertifikat
          </label>
          <input
            {...register("link")}
            className={inputClassName}
            placeholder="https://..."
          />
          {errors.link && (
            <p className="text-destructive text-sm">{errors.link.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tanggal Prestasi
          </label>
          <input
            type="date"
            {...register("achievedAt")}
            className={inputClassName}
          />
          {errors.achievedAt && (
            <p className="text-destructive text-sm">
              {errors.achievedAt.message}
            </p>
          )}
        </div>

        <FormButtons isLoading={updateAchievement.isPending} />
      </form>
    </div>
  );
}
