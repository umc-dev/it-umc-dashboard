import type { Metadata } from 'next'
import { FormEditMatakuliah } from '@/components/dashboard/matakuliah/FormEditMatakuliah'

export const metadata: Metadata = {
  title: 'Ubah Mata Kuliah - Sistem Manajemen Konten',
  description: 'Edit data mata kuliah di sistem',
}

export default function UbahMataKuliahPage() {
  return <FormEditMatakuliah />
}
