"use client";

import type React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { useCreateStatisticStudent } from "@/app/dashboard/statistik-mahasiswa/queries";
import { CreateStatisticStudentDto } from "@/app/dashboard/statistik-mahasiswa/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateStatisticStudentSchema } from "@/app/dashboard/statistik-mahasiswa/validator";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormAddStatistikMahasiswa() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createStatisticStudent = useCreateStatisticStudent();

  const defaultProdi = (searchParams.get("prodi") as "S1" | "D3") || "S1";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateStatisticStudentDto>({
    resolver: zodResolver(CreateStatisticStudentSchema),
    defaultValues: {
      prodi: defaultProdi,
      year: new Date().getFullYear(),
      enteredStudents: 0,
      graduatedStudents: 0,
    },
  });

  const onSubmit = async (data: CreateStatisticStudentDto) => {
    try {
      await createStatisticStudent.mutateAsync(data);

      toast.success("Statistik berhasil dibuat!", {
        description: `Tahun ${data.year}`,
      });

      router.push("/dashboard/statistik-mahasiswa");
    } catch (error: unknown) {
      let message = "Gagal membuat statistik.";

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
        title="Tambah Statistik"
        description="Tambahkan data statistik mahasiswa baru"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        {/* PRODI */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Program Studi <span className="text-destructive">*</span>
          </label>
          <select
            {...register("prodi")}
            className={inputClassName}
          >
            <option value="S1">S1 Teknik Informatika</option>
            <option value="D3">D3 Teknik Informatika</option>
          </select>
          {errors.prodi && (
            <p className="text-destructive text-sm">{errors.prodi.message}</p>
          )}
        </div>

        {/* TAHUN */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tahun <span className="text-destructive">*</span>
          </label>

          <input
            type="number"
            {...register("year", { valueAsNumber: true })}
            placeholder="Masukkan tahun"
            min="2000"
            max={new Date().getFullYear() + 10}
            className={inputClassName}
          />

          {errors.year && (
            <p className="text-destructive text-sm">{errors.year.message}</p>
          )}
        </div>

        {/* MAHASISWA MASUK */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Mahasiswa Masuk <span className="text-destructive">*</span>
          </label>

          <input
            type="number"
            {...register("enteredStudents", { valueAsNumber: true })}
            placeholder="Masukkan jumlah mahasiswa masuk"
            min="0"
            className={inputClassName}
          />

          {errors.enteredStudents && (
            <p className="text-destructive text-sm">
              {errors.enteredStudents.message}
            </p>
          )}
        </div>

        {/* MAHASISWA KELUAR */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Mahasiswa Keluar <span className="text-destructive">*</span>
          </label>

          <input
            type="number"
            {...register("graduatedStudents", { valueAsNumber: true })}
            placeholder="Masukkan jumlah mahasiswa keluar"
            min="0"
            className={inputClassName}
          />

          {errors.graduatedStudents && (
            <p className="text-destructive text-sm">
              {errors.graduatedStudents.message}
            </p>
          )}
        </div>

        <FormButtons isLoading={createStatisticStudent.isPending} />
      </form>
    </div>
  );
}