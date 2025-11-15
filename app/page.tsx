import { Plus } from "lucide-react";

export default function Home() {
  return (
    <div>
      <button
        className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
      >
        <Plus className="w-4 h-4" />
        <span className="hidden sm:inline">Tambah</span>
        <span className="sm:hidden">+</span>
      </button>
    </div>
  );
}
