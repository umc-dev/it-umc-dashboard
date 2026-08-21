import { FormEditAccreditation } from "@/components/dashboard/accreditation/FormEditAccreditation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ubah Akreditasi - Sistem Manajemen Konten",
  description: "Ubah data sertifikat dan SK akreditasi",
};

export default async function UbahAccreditationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return <FormEditAccreditation id={resolvedParams.id} />;
}
