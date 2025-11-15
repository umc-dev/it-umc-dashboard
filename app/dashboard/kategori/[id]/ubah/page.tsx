import type { Metadata } from 'next'
import { FormEditKategori } from '@/components/dashboard/kategori/FormEditKategori'

export const metadata: Metadata = {
  title: 'Ubah Kategori - Sistem Manajemen Konten',
  description: 'Edit data kategori di sistem',
}

export default function UbahKategoriPage() {
  return <FormEditKategori />
}
