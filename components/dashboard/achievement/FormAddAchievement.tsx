"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useCreateAchievement } from "@/app/dashboard/achievement/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAchievementSchema } from "@/app/dashboard/achievement/validator";
import { CreateAchievementDto } from "@/app/dashboard/achievement/types";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddAchievement() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createAchievement = useCreateAchievement();

  const defaultProdi = (searchParams.get("prodi") as "S1" | "D3") || "S1";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAchievementDto>({
    resolver: zodResolver(CreateAchievementSchema),
    defaultValues: {
      prodi: defaultProdi,
    },
  });

  const onSubmit = async (data: CreateAchievementDto) => {
    try {
      await createAchievement.mutateAsync(data);

      toast.success("Prestasi berhasil dibuat!", {
        description: data.achievementName,
      });

      router.push("/dashboard/achievement");
    } catch (error: unknown) {
      let message = "Gagal membuat prestasi.";

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
        title="Tambah Prestasi"
        description="Tambahkan data prestasi mahasiswa"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Program Studi <span className="text-destructive">*</span>
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
            Nama Mahasiswa <span className="text-destructive">*</span>
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
            Nama Prestasi <span className="text-destructive">*</span>
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
            Link Sertifikat <span className="text-destructive">*</span>
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
            Tanggal Prestasi <span className="text-destructive">*</span>
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

        <FormButtons isLoading={createAchievement.isPending} />
      </form>
    </div>
  );
}
