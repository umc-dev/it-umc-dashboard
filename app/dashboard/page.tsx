import type { Metadata } from 'next'
import { DashboardMainContent } from '@/components/dashboard/DashboardMainContent'

export const metadata: Metadata = {
  title: 'Dashboard - Sistem Manajemen Konten',
  description: 'Ringkasan data dan statistik sistem manajemen konten',
}

export default function DashboardPage() {
  return <DashboardMainContent />
}
