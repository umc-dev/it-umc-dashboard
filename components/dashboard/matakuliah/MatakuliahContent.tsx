'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/DataTable'
import { DeleteAlert } from '@/components/DeleteAlert'
import { mataKuliahs, type MataKuliah } from '@/lib/data'

export function DashboardMataKuliahContent() {
  const router = useRouter()
  const [data, setData] = useState<MataKuliah[]>(mataKuliahs)
  const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; item: MataKuliah | null }>({
    isOpen: false,
    item: null,
  })

  const handleDeleteClick = (item: MataKuliah) => {
    setDeleteAlert({ isOpen: true, item })
  }

  const handleConfirmDelete = () => {
    if (deleteAlert.item) {
      setData(data.filter((mk) => mk.id !== deleteAlert.item!.id))
      setDeleteAlert({ isOpen: false, item: null })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Mata Kuliah</h1>
        <p className="text-muted-foreground mt-2">Kelola daftar mata kuliah per semester</p>
      </div>

      <DataTable
        data={data}
        columns={[
          { key: 'kode', label: 'Kode', sortable: true },
          { key: 'nama', label: 'Nama Mata Kuliah', sortable: true },
          { key: 'semester', label: 'Semester', sortable: true },
          { key: 'sks', label: 'SKS', sortable: true },
          {
            key: 'pilihan',
            label: 'Tipe',
            render: (val) => <span className="text-sm">{val ? 'Pilihan' : 'Wajib'}</span>,
          },
        ]}
        onAdd={() => router.push('/dashboard/matakuliah/tambah')}
        onEdit={(item) => router.push(`/dashboard/matakuliah/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={['kode', 'nama', 'semester', 'sks', 'pilihan']}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Mata Kuliah"
        description="Pastikan anda ingin menghapus mata kuliah ini"
        itemName={deleteAlert.item?.kode || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  )
}
