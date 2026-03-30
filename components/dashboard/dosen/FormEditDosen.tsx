"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { FormHeader } from "@/components/FormHeader";
import { FormButtons } from "@/components/FormButtons";
import { ImageUpload } from "@/components/ImageUpload";
import {
  useDosenById,
  useUpdateDosen,
} from "@/app/dashboard/dosen/queries";
import { useLectureships } from "@/app/dashboard/lectureships/queries";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateDosenSchema } from "@/app/dashboard/dosen/validator";
import {
  UpdateDosenDto,
  UpdateDosenInputDto,
} from "@/app/dashboard/dosen/types";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";

const inputClassName =
  "w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors";

export function FormEditDosen() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const updateDosen = useUpdateDosen();
  const { data: dosen, isLoading: isLoadingDosen } = useDosenById(id);
  const { data: lectureships } = useLectureships();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<UpdateDosenInputDto, unknown, UpdateDosenDto>({
    resolver: zodResolver(UpdateDosenSchema),
    defaultValues: {
      positions: [],
    },
  });

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "positions",
  });

  useEffect(() => {
    if (dosen) {
      reset({
        nidn: dosen.nidn,
        name: dosen.name,
        expertise: dosen.expertise,
        research: dosen.research,
        teaching: dosen.teaching,
        positions: dosen.positions.map((position) => ({
          lectureshipId: String(position.lectureship.id),
          startDate: position.startDate.slice(0, 10),
          endDate: position.endDate ? position.endDate.slice(0, 10) : "",
        })),
      });

      replace(
        dosen.positions.map((position) => ({
          lectureshipId: String(position.lectureship.id),
          startDate: position.startDate.slice(0, 10),
          endDate: position.endDate ? position.endDate.slice(0, 10) : "",
        })),
      );
    }
  }, [dosen, replace, reset]);

  const watchedPhoto = useWatch({ control, name: "photo" });
  const photo = useMemo(() => watchedPhoto, [watchedPhoto]);

  const onSubmit = async (data: UpdateDosenDto) => {
    try {
      const fd = new FormData();
      if (data.nidn) fd.append("nidn", data.nidn);
      if (data.name) fd.append("name", data.name);
      if (data.expertise) fd.append("expertise", data.expertise);
      if (data.research) fd.append("research", data.research);
      if (data.teaching) fd.append("teaching", data.teaching);
      if (data.photo) fd.append("photo", data.photo);
      if (data.positions) {
        fd.append("positions", JSON.stringify(data.positions));
      }

      await updateDosen.mutateAsync({ id, data: fd });

      toast.success("Dosen berhasil diperbarui!", {
        description: data.name || dosen?.name,
      });

      router.push("/dashboard/dosen");
    } catch (err: unknown) {
      let message = "Gagal memperbarui dosen.";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;
      }

      toast.error("Terjadi kesalahan!", { description: message });
    }
  };

  if (isLoadingDosen) {
    return <p className="text-center py-10 text-muted-foreground">Loading...</p>;
  }

  if (!dosen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Dosen tidak ditemukan</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6">
      <FormHeader title="Edit Dosen" description="Perbarui data dosen" />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-card border border-border rounded-lg p-6 space-y-6"
      >
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            NIDN
          </label>
          <input
            {...register("nidn")}
            className={inputClassName}
            placeholder="Masukkan NIDN dosen"
          />
          {errors.nidn && (
            <p className="text-destructive text-sm">{errors.nidn.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Dosen
          </label>
          <input
            {...register("name")}
            className={inputClassName}
            placeholder="Masukkan nama dosen"
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Spesialisasi
          </label>
          <input
            {...register("expertise")}
            className={inputClassName}
            placeholder="Masukkan spesialisasi"
          />
          {errors.expertise && (
            <p className="text-destructive text-sm">
              {errors.expertise.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Penelitian
          </label>
          <input
            type="url"
            {...register("research")}
            className={inputClassName}
            placeholder="https://..."
          />
          {errors.research && (
            <p className="text-destructive text-sm">
              {errors.research.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Link Pengajaran
          </label>
          <input
            type="url"
            {...register("teaching")}
            className={inputClassName}
            placeholder="https://..."
          />
          {errors.teaching && (
            <p className="text-destructive text-sm">
              {errors.teaching.message}
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-medium text-foreground">
                Riwayat Jabatan
              </h3>
              <p className="text-sm text-muted-foreground">
                Edit seluruh daftar jabatan dan periode dosen.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                append({ lectureshipId: "", startDate: "", endDate: "" })
              }
              className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted"
            >
              Tambah Jabatan
            </button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-border rounded-lg p-4 space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-medium text-foreground">
                    Jabatan #{index + 1}
                  </h4>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-sm text-destructive hover:underline"
                  >
                    Hapus
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Jabatan
                  </label>
                  <select
                    {...register(`positions.${index}.lectureshipId`)}
                    className={inputClassName}
                  >
                    <option value="">-- Pilih Jabatan Dosen --</option>
                    {lectureships?.data?.map((lectureship) => (
                      <option key={lectureship.id} value={lectureship.id}>
                        {lectureship.name}
                      </option>
                    ))}
                  </select>
                  {errors.positions?.[index]?.lectureshipId && (
                    <p className="text-destructive text-sm">
                      {errors.positions[index]?.lectureshipId?.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tanggal Mulai
                    </label>
                    <input
                      type="date"
                      {...register(`positions.${index}.startDate`)}
                      className={inputClassName}
                    />
                    {errors.positions?.[index]?.startDate && (
                      <p className="text-destructive text-sm">
                        {errors.positions[index]?.startDate?.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tanggal Selesai
                    </label>
                    <input
                      type="date"
                      {...register(`positions.${index}.endDate`)}
                      className={inputClassName}
                    />
                    {errors.positions?.[index]?.endDate && (
                      <p className="text-destructive text-sm">
                        {errors.positions[index]?.endDate?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Foto Lama
          </label>

          {dosen.photo && (
            <Image
              src={dosen.photo}
              alt="Foto lama"
              width={200}
              height={120}
              className="rounded mb-3"
              unoptimized
            />
          )}

          <ImageUpload
            label="Foto Dosen"
            value={photo ?? null}
            onChange={(value) => setValue("photo", value)}
          />

          {errors.photo && (
            <p className="text-destructive text-sm">{errors.photo.message}</p>
          )}
        </div>

        <FormButtons isLoading={updateDosen.isPending} />
      </form>
    </div>
  );
}
