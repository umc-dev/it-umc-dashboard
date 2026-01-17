"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { PdfUpload } from "@/components/PdfUpload";
import { useStudyById, useUpdateStudy } from "@/app/dashboard/matakuliah/queries";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateStudySchema } from "@/app/dashboard/matakuliah/validator";
import { UpdateStudyDto } from "@/app/dashboard/matakuliah/types";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

export function FormEditMatakuliah() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const updateStudy = useUpdateStudy();

  const { data: study, isLoading: isLoadingStudy } = useStudyById(id);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdateStudyDto>({
    resolver: zodResolver(UpdateStudySchema),
    defaultValues: {
      source: null,
    },
  });

  useEffect(() => {
    if (study) {
      reset({});
    }
  }, [study, reset]);

  const watchedSource = useWatch({ control, name: "source" });
  const source = useMemo(() => watchedSource, [watchedSource]);

  const onSubmit = async (data: UpdateStudyDto) => {
    try {
      const fd = new FormData();

      if (data.source) {
        fd.append("source", data.source);
      }

      await updateStudy.mutateAsync({
        id,
        data: fd,
      });

      toast.success("Dokumen berhasil diperbarui!");

      router.push("/dashboard/matakuliah");
    } catch (err: unknown) {
      let message = "Gagal memperbarui dokumen.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingStudy) {
    return (
      <p className="text-center py-10 text-muted-foreground">Loading...</p>
    );
  }

  if (!study) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Dokumen tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader
        title="Edit Dokumen Mata Kuliah"
        description="Perbarui dokumen mata kuliah"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        <div>
  <label className="block text-sm font-medium text-foreground mb-2">
    Dokumen Lama
  </label>

  {study.source ? (
    <Link
      href={study.source}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline"
    >
      Lihat Dokumen Saat Ini
    </Link>
  ) : (
    <p className="text-muted-foreground text-sm">
      Belum ada dokumen
    </p>
  )}
</div>


        <PdfUpload
          label="Dokumen PDF Baru"
          value={source ?? null}
          onChange={(value) => setValue("source", value)}
        />

        {errors.source && (
          <p className="text-destructive text-sm">{errors.source.message}</p>
        )}

        <FormButtons isLoading={updateStudy.isPending} />
      </form>
    </div>
  );
}