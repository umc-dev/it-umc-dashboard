"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useVisionMissionById, useUpdateVisionMission } from "@/app/dashboard/visi-misi/queries";
import { UpdateVisionMissionDto } from "@/app/dashboard/visi-misi/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateVisionMissionSchema } from "@/app/dashboard/visi-misi/validator";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditVisiMisi() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const { data: visionMission, isLoading } = useVisionMissionById(id);
  const updateVisionMission = useUpdateVisionMission();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateVisionMissionDto>({
    resolver: zodResolver(UpdateVisionMissionSchema),
  });

  useEffect(() => {
    if (visionMission) {
      reset({
        prodi: visionMission.prodi,
        vision: visionMission.vision,
        mission: visionMission.mission,
      });
    }
  }, [visionMission, reset]);

  const onSubmit = async (data: UpdateVisionMissionDto) => {
    try {
      await updateVisionMission.mutateAsync({ id, data });

      toast.success("Visi & Misi berhasil diperbarui!");

      router.push("/dashboard/visi-misi");
    } catch (error: unknown) {
      let message = "Gagal memperbarui visi & misi.";

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

  if (!visionMission) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Data visi & misi tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader
        title="Ubah Visi & Misi"
        description="Perbarui visi dan misi institusi"
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
            Visi
          </label>
          <textarea
            {...register("vision")}
            placeholder="Masukkan visi institusi"
            className={inputClassName + " min-h-[100px]"}
          />
          {errors.vision && (
            <p className="text-destructive text-sm">{errors.vision.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Misi
          </label>
          <textarea
            {...register("mission")}
            placeholder="Masukkan misi institusi"
            className={inputClassName + " min-h-[150px]"}
          />
          {errors.mission && (
            <p className="text-destructive text-sm">{errors.mission.message}</p>
          )}
        </div>

        <FormButtons isLoading={updateVisionMission.isPending} />
      </form>
    </div>
  );
}