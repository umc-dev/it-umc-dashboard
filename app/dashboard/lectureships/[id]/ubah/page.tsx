import type { Metadata } from 'next'
import { FormEditLectureship } from '@/components/dashboard/lectureships/FormEditLectureship'

export const metadata: Metadata = {
  title: 'Ubah Jabatan Dosen - Sistem Manajemen Konten',
  description: 'Edit data jabatan dosen di sistem',
}

export default function UbahLectureshipPage() {
  return <FormEditLectureship />
}
