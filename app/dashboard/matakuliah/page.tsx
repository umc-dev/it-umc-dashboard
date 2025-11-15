import type { Metadata } from 'next'
import { DashboardMataKuliahContent } from '@/components/dashboard/matakuliah/MatakuliahContent'

export const metadata: Metadata = {
  title: 'Manajemen Mata Kuliah - Sistem Manajemen Konten',
  description: 'Kelola daftar mata kuliah per semester',
}

export default function MataKuliahPage() {
  return <DashboardMataKuliahContent />
}
