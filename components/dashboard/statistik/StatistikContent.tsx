/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { DataTable } from '@/components/DataTable'
import { DeleteAlert } from '@/components/DeleteAlert'
import { statistikMahasiswas, type StatistikMahasiswa } from '@/lib/data'

const formatNumber = (value: number) => value.toLocaleString('id-ID')

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload[0]) {
    const data = payload[0].payload
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg p-3 backdrop-blur-sm">
        <p className="font-semibold text-foreground">{data.tahun}</p>
        <p className="text-sm text-muted-foreground">
          Total Mahasiswa: <span className="font-medium text-primary">{formatNumber(data.total)}</span>
        </p>
      </div>
    )
  }
  return null
}

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

      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Pertumbuhan Mahasiswa</h2>
        <div className="overflow-x-auto">
          <ResponsiveContainer width="100%" height={320} minWidth={300}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              barCategoryGap="20%"
            >
              <CartesianGrid strokeDasharray="4 4" stroke="var(--color-border)" opacity={0.6} />
              <XAxis dataKey="tahun" stroke="var(--color-muted-foreground)" fontSize={14} tickMargin={8} />
              <YAxis stroke="var(--color-muted-foreground)" fontSize={14} tickFormatter={formatNumber} tickMargin={8} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} wrapperStyle={{ zIndex: 10 }} animationDuration={300} animationEasing="ease-out" />
              <Bar dataKey="total" radius={[12, 12, 0, 0]} animationDuration={800}>
                {data.map((entry, index) => (
                    <Cell key={index} fill="var(--primary)" />                ))}
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