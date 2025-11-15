'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { dosens, type Dosen } from '@/lib/data'
import { FormHeader } from '@/components/FormHeader'
import { FormButtons } from '@/components/FormButtons'
import { ImageUpload } from '@/components/ImageUpload'

const inputClassName =
  'w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors'

export function FormUpdateDosen() {
  const router = useRouter()
  const params = useParams()
  const id = Number(params.id)
  const dosen = dosens.find((d) => d.id === id)

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<Dosen>>(
    dosen || {
      nama: '',
      spesialis: '',
      link_pengabdian: '',
      link_penelitian: '',
      link_pengajaran: '',
      avatar: '',
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, avatar: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/dashboard/dosen')
  }

  if (!dosen) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Dosen tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8 px-4 sm:px-6">
      <FormHeader title="Ubah Dosen" description="Ubah data dosen yang ada" />

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
        <ImageUpload label="Foto Dosen" value={formData.avatar || ''} onChange={handleImageChange} preview={true} />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Nama Dosen <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama || ''}
            onChange={handleChange}
            placeholder="Masukkan nama dosen"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Spesialis <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="spesialis"
            value={formData.spesialis || ''}
            onChange={handleChange}
            placeholder="Masukkan spesialisasi"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Link Pengabdian</label>
          <input
            type="url"
            name="link_pengabdian"
            value={formData.link_pengabdian || ''}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Link Penelitian</label>
          <input
            type="url"
            name="link_penelitian"
            value={formData.link_penelitian || ''}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">Link Pengajaran</label>
          <input
            type="url"
            name="link_pengajaran"
            value={formData.link_pengajaran || ''}
            onChange={handleChange}
            placeholder="https://..."
            className={inputClassName}
          />
        </div>

        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  )
}
