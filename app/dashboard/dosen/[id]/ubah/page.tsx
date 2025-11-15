import type { Metadata } from 'next'
import { FormUpdateDosen } from '@/components/dashboard/dosen/FormUpdateDosen'

export const metadata: Metadata = {
  title: 'Ubah Mata Kuliah - Sistem Manajemen Konten',
  description: 'Edit data mata kuliah di sistem',
}

export default function UbahMataKuliahPage() {
  return <FormUpdateDosen />
}
