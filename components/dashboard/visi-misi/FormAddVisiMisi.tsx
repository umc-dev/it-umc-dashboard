"use client";

import { useRouter } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useCreateVisionMission } from "@/app/dashboard/visi-misi/queries";
import { CreateVisionMissionDto } from "@/app/dashboard/visi-misi/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateVisionMissionSchema } from "@/app/dashboard/visi-misi/validator";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddVisiMisi() {
  const router = useRouter();
  const createVisionMission = useCreateVisionMission();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateVisionMissionDto>({
    resolver: zodResolver(CreateVisionMissionSchema),
  });

  const onSubmit = async (data: CreateVisionMissionDto) => {
    try {
      await createVisionMission.mutateAsync(data);

      toast.success("Visi & Misi berhasil dibuat!");

      router.push("/dashboard/visi-misi");
    } catch (error: unknown) {
      let message = "Gagal membuat visi & misi.";

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
        title="Tambah Visi & Misi"
        description="Tambahkan visi dan misi institusi"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Visi <span className="text-destructive">*</span>
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
            Misi <span className="text-destructive">*</span>
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

        <FormButtons isLoading={createVisionMission.isPending} />
      </form>
    </div>
  );
}