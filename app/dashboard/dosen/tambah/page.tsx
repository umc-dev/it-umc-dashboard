import type { Metadata } from 'next'
import { FormAddDosen } from '@/components/dashboard/dosen/FormAddDosen'

export const metadata: Metadata = {
  title: 'Tambah Dosen - TI Sistem Manajemen Konten',
  description: 'Tambahkan dosen baru ke sistem',
}

export default function TambahDosenPage() {
  return <FormAddDosen />
}
