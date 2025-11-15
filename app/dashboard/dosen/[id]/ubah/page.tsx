import type { Metadata } from 'next'
import { FormEditDosen } from '@/components/dashboard/dosen/FormEditDosen'

export const metadata: Metadata = {
  title: 'Ubah Mata Kuliah - Sistem Manajemen Konten',
  description: 'Edit data mata kuliah di sistem',
}

export default function UbahMataKuliahPage() {
  return <FormEditDosen />
}
