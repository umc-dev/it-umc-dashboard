'use client'

import type React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { kategoris, admins } from '@/lib/data'
import { FormHeader } from '@/components/FormHeader'
import { FormButtons } from '@/components/FormButtons'
import { ImageUpload } from '@/components/ImageUpload'

const inputClassName =
  'w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors'

export function FormAddBerita() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    judul: '',
    body: '',
    thumbnail: '',
    kategori_id: '',
    admin_id: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (value: string) => {
    setFormData((prev) => ({ ...prev, thumbnail: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push('/dashboard/berita')
  }

  return (
    <div className="max-w-2xl mx-auto py-6 sm:py-8">
      <FormHeader title="Tambah Berita" description="Buat berita baru di sistem" />

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Judul Berita <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            placeholder="Masukkan judul berita"
            required
            className={inputClassName}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Isi Berita <span className="text-destructive">*</span>
          </label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Masukkan isi berita"
            required
            rows={6}
            className={`${inputClassName} resize-none`}
          />
        </div>

        <ImageUpload label="Thumbnail Berita" value={formData.thumbnail} onChange={handleImageChange} preview={true} />

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Kategori <span className="text-destructive">*</span>
          </label>
          <select
            name="kategori_id"
            value={formData.kategori_id}
            onChange={handleChange}
            required
            className={inputClassName}
          >
            <option value="">Pilih Kategori</option>
            {kategoris.map((k) => (
              <option key={k.id} value={k.id}>
                {k.nama}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Admin <span className="text-destructive">*</span>
          </label>
          <select
            name="admin_id"
            value={formData.admin_id}
            onChange={handleChange}
            required
            className={inputClassName}
          >
            <option value="">Pilih Admin</option>
            {admins.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nama}
              </option>
            ))}
          </select>
        </div>

        <FormButtons isLoading={isLoading} />
      </form>
    </div>
  )
}
