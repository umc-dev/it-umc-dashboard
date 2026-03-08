import type { Metadata } from 'next'
import { FormAddLectureship } from '@/components/dashboard/lectureships/FormAddLectureship'

export const metadata: Metadata = {
  title: 'Tambah Jabatan Dosen - Sistem Manajemen Konten',
  description: 'Tambahkan program studi / jabatan dosen baru ke sistem',
}

export default function TambahLectureshipPage() {
  return <FormAddLectureship />
}
