"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import {
  useStatisticStudentById,
  useUpdateStatisticStudent,
} from "@/app/dashboard/statistik-mahasiswa/queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStatisticStudentSchema } from "@/app/dashboard/statistik-mahasiswa/validator";
import { UpdateStatisticStudentDto } from "@/app/dashboard/statistik-mahasiswa/types";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditStatistikMahasiswa() {
  const router = useRouter();
  const params = useParams();
  const id = params.year as string; // parameter folder is [year] but it holds the record's UUID string ID

  const updateStatisticStudent = useUpdateStatisticStudent();

  const { data: statisticStudent, isLoading } = useStatisticStudentById(id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateStatisticStudentDto>({
    resolver: zodResolver(UpdateStatisticStudentSchema),
  });

  useEffect(() => {
    if (statisticStudent) {
      reset({
        prodi: statisticStudent.prodi,
        year: statisticStudent.year,
        enteredStudents: statisticStudent.enteredStudents,
        graduatedStudents: statisticStudent.graduatedStudents,
      });
    }
  }, [statisticStudent, reset]);

  const onSubmit = async (data: UpdateStatisticStudentDto) => {
    try {
      await updateStatisticStudent.mutateAsync({
        id,
        data,
      });

      toast.success("Statistik berhasil diperbarui!", {
        description: `Tahun ${data.year || (statisticStudent ? statisticStudent.year : "")}`,
      });

      router.push("/dashboard/statistik-mahasiswa");
    } catch (err: unknown) {
      let message = "Gagal memperbarui statistik.";

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

  if (!statisticStudent) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Statistik tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-6">
      <FormHeader
        title="Ubah Statistik"
        description="Ubah data statistik mahasiswa yang ada"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6"
      >
        {/* PRODI */}
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

        <FormButtons isLoading={updateStatisticStudent.isPending} />
      </form>
    </div>
  );
}