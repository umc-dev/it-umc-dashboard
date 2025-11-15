"use client"

import { AlertCircle } from "lucide-react"

interface DeleteAlertProps {
  isOpen: boolean
  title: string
  description: string
  itemName: string
  isLoading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function DeleteAlert({
  isOpen,
  title,
  description,
  itemName,
  isLoading = false,
  onConfirm,
  onCancel,
}: DeleteAlertProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-card rounded-lg shadow-lg max-w-sm w-full border border-border">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 bg-muted/30">
          <p className="text-sm text-foreground">
            Data <span className="font-semibold text-destructive">&quot;{itemName}&quot;</span> akan dihapus secara permanen.
          </p>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex gap-3">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-border rounded-lg text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {isLoading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </div>
  )
}
