import type { Metadata } from 'next'
import { FormAddStatistikMahasiswa } from '@/components/dashboard/statistik-mahasiswa/FormAddStatistikMahasiswa'

export const metadata: Metadata = {
  title: 'Tambah Statistik - Sistem Manajemen Konten',
  description: 'Tambahkan data statistik mahasiswa baru',
}

export default function TambahStatistikPage() {
  return <FormAddStatistikMahasiswa />
}
