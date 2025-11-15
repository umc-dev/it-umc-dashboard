import type { Metadata } from 'next'
import { FormAddStatistik } from '@/components/dashboard/statistik/FormAddStatistik'

export const metadata: Metadata = {
  title: 'Tambah Statistik - Sistem Manajemen Konten',
  description: 'Tambahkan data statistik mahasiswa baru',
}

export default function TambahStatistikPage() {
  return <FormAddStatistik />
}
