import type { Metadata } from 'next'
import { FormAddMatakuliah } from '@/components/dashboard/matakuliah/FormAddMatakuliah'

export const metadata: Metadata = {
  title: 'Tambah Mata Kuliah - Sistem Manajemen Konten',
  description: 'Tambahkan mata kuliah baru ke sistem',
}

export default function TambahMataKuliahPage() {
  return <FormAddMatakuliah />
}
