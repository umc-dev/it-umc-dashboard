import type { Metadata } from 'next'
import { DashboardStatistikContent } from '@/components/dashboard/statistik/StatistikContent'

export const metadata: Metadata = {
  title: 'Statistik Mahasiswa - Sistem Manajemen Konten',
  description: 'Kelola data statistik mahasiswa per tahun',
}

export default function StatistikPage() {
  return <DashboardStatistikContent />
}
