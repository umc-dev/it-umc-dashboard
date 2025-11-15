'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DataTable } from '@/components/DataTable'
import { DeleteAlert } from '@/components/DeleteAlert'
import { kategoris, type Kategori } from '@/lib/data'

export function DashboardKategoriContent() {
  const router = useRouter()
  const [data, setData] = useState<Kategori[]>(kategoris)
  const [deleteAlert, setDeleteAlert] = useState<{ isOpen: boolean; item: Kategori | null }>({
    isOpen: false,
    item: null,
  })

  const handleDeleteClick = (item: Kategori) => {
    setDeleteAlert({ isOpen: true, item })
  }

  const handleConfirmDelete = () => {
    if (deleteAlert.item) {
      setData(data.filter((k) => k.id !== deleteAlert.item!.id))
      setDeleteAlert({ isOpen: false, item: null })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Manajemen Kategori</h1>
        <p className="text-muted-foreground mt-2">Kelola kategori berita</p>
      </div>

      <DataTable
        data={data}
        columns={[
          { key: 'nama', label: 'Nama', sortable: true },
          { key: 'slug', label: 'Slug', sortable: true },
        ]}
        onAdd={() => router.push('/dashboard/kategori/tambah')}
        onEdit={(item) => router.push(`/dashboard/kategori/${item.id}/ubah`)}
        onDeleteClick={handleDeleteClick}
        searchFields={['nama', 'slug']}
      />

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Kategori"
        description="Pastikan anda ingin menghapus kategori ini"
        itemName={deleteAlert.item?.nama || ''}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  )
}
