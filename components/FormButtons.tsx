"use client";

import { useRouter } from "next/navigation";

interface FormButtonsProps {
  isLoading?: boolean;
}

export function FormButtons({ isLoading = false }: FormButtonsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-3 pt-6 border-t border-border">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-muted transition-colors font-medium"
      >
        Batal
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
      >
        {isLoading ? "Menyimpan..." : "Simpan"}
      </button>
    </div>
  );
}
