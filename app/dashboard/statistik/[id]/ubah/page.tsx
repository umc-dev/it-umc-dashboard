import type { Metadata } from 'next'
import { FormEditStatistik } from '@/components/dashboard/statistik/FormEditStatistik'

export const metadata: Metadata = {
  title: 'Ubah Statistik - Sistem Manajemen Konten',
  description: 'Edit data statistik mahasiswa di sistem',
}

export default function UbahStatistikPage() {
  return <FormEditStatistik />
}
