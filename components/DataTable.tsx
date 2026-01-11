/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronUp,
  ChevronDown,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDeleteClick: (item: T) => void;
  searchFields?: (keyof T)[];
  itemsPerPage?: number;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onAdd,
  onEdit,
  onDeleteClick,
  searchFields = [],
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      if (!searchTerm) return true;
      return searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(searchTerm.toLowerCase()),
      );
    });
  }, [data, searchTerm, searchFields]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const { key, direction } = sortConfig;
    return [...filteredData].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: keyof T) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari data..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
          />
        </div>
        <button
          onClick={onAdd}
          className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah</span>
        </button>
      </div>

      {/* Table */}
      <div className="border border-border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted border-b border-border">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={`px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap ${
                    col.sortable ? "cursor-pointer hover:bg-muted/80" : ""
                  }`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {col.label}
                    {col.sortable && (
                      <div className="flex flex-col gap-0.5">
                        <ChevronUp
                          className={`w-3 h-3 ${
                            sortConfig?.key === col.key &&
                            sortConfig.direction === "asc"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                        <ChevronDown
                          className={`w-3 h-3 ${
                            sortConfig?.key === col.key &&
                            sortConfig.direction === "desc"
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-3 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-foreground"
                  >
                    {col.render
                      ? col.render(item[col.key], item)
                      : String(item[col.key])}
                  </td>
                ))}
                <td className="px-3 sm:px-6 py-4 text-sm">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                      title="Edit"
                      aria-label="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteClick(item)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded transition-colors"
                      title="Hapus"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {paginatedData.length === 0 && (
          <div className="px-6 py-8 text-center text-muted-foreground">
            Tidak ada data
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-muted-foreground">
            Menampilkan {(currentPage - 1) * itemsPerPage + 1} sampai{" "}
            {Math.min(currentPage * itemsPerPage, sortedData.length)} dari{" "}
            {sortedData.length} data
          </p>
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sebelumnya
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const page = currentPage > 3 ? currentPage - 2 + i : i + 1;
                return page <= totalPages ? (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 sm:px-3 py-2 text-sm rounded-lg transition-colors ${
                      page === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "border border-border hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                ) : null;
              })}
            </div>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
