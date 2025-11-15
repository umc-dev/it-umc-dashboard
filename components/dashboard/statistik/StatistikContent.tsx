'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { DataTable } from '@/components/DataTable'
import { DeleteAlert } from '@/components/DeleteAlert'
import { statistikMahasiswas, type StatistikMahasiswa } from '@/lib/data'

const formatNumber = (value: number) => value.toLocaleString('id-ID')

export function DashboardStatistikContent() {
  const router = useRouter()
  const [data, setData] = useState<StatistikMahasiswa[]>(statistikMahasiswas)
  const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; item: StatistikMahasiswa | null }>({
    isOpen: false,
    item: null,
  })

  const handleDeleteClick = (item: StatistikMahasiswa) => {
    setDeleteAlert({ isOpen: true, item })
  }

  const handleConfirmDelete = () => {
    if (deleteAlert.item) {
      setData(data.filter((s) => s.id !== deleteAlert.item!.id))
      setDeleteAlert({ isOpen: false, item: null })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Statistik Mahasiswa</h1>
        <p className="text-muted-foreground mt-2">Pantau pertumbuhan jumlah mahasiswa per tahun</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
          Statistik Mahasiswa per Tahun
        </h2>
        <div className="overflow-x-auto">
          <ResponsiveContainer width="100%" height={300} minWidth={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis
                dataKey="tahun"
                stroke="var(--color-muted-foreground)"
                fontSize={13}
                tickMargin={8}
              />
              <YAxis
                stroke="var(--color-muted-foreground)"
                fontSize={13}
                tickFormatter={formatNumber}
                tickMargin={8}
              />
              <Tooltip
                cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
                contentStyle={{
                  backgroundColor: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  color: 'var(--color-foreground)',
                  padding: '0.75rem',
                }}
                labelStyle={{ 
                  color: 'var(--color-foreground)', 
                  fontWeight: '600',
                  marginBottom: '0.25rem',
                }}
                itemStyle={{
                  color: 'var(--color-muted-foreground)',
                }}
                formatter={(value: number) => [
                  <span key="value" className="font-medium text-chart-1">{formatNumber(value)}</span>,
                  'Total Mahasiswa',
                ]}
                labelFormatter={(label: string) => `${label}`}
              />
              <Bar
                dataKey="total"
                fill="var(--color-chart-1)"
                radius={[8, 8, 0, 0]}
                animationDuration={800}
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.id}`} fill="var(--color-chart-1)" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <DataTable
        data={data}
        columns={[
          { key: 'tahun', label: 'Tahun', sortable: true },
          {
            key: 'total',
            label: 'Total Mahasiswa',
            sortable: true,
            render: (value) => formatNumber(value as number),
          },
        ]}
        onAdd={() => router.push('/dashboard/statistik/tambah')}
        onEdit={(item) => router.push(`/dashboard/statistik/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={['tahun']}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Statistik"
        description="Apakah Anda yakin ingin menghapus data statistik ini? Tindakan ini tidak dapat dibatalkan."
        itemName={`Tahun ${deleteAlert.item?.tahun || ''}`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  )
}