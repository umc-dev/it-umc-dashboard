import type { Metadata } from 'next'
import { FormEditStatistikMahasiswa } from '@/components/dashboard/statistik-mahasiswa/FormEditStatistikMahasiswa'

export const metadata: Metadata = {
  title: 'Ubah Statistik - Sistem Manajemen Konten',
  description: 'Edit data statistik mahasiswa di sistem',
}

export default function UbahStatistikPage() {
  return <FormEditStatistikMahasiswa />
}
