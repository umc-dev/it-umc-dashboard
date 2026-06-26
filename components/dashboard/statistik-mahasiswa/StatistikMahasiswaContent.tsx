"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { DataTable } from "@/components/DataTable";
import { DeleteAlert } from "@/components/DeleteAlert";
import {
  useStatisticStudents,
  useDeleteStatisticStudent,
} from "@/app/dashboard/statistik-mahasiswa/queries";
import { StatisticStudentResponse } from "@/app/dashboard/statistik-mahasiswa/types";
import { toast } from "sonner";

interface ChartData {
  tahun: number;
  masuk: number;
  keluar: number;
  total: number;
}

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: Array<{
    payload: ChartData;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3">
        <p className="text-foreground font-semibold mb-2">Tahun {label}</p>
        <div className="space-y-1">
          <p className="text-muted-foreground text-sm">
            Mahasiswa Masuk:{" "}
            <span className="text-green-500 font-medium">
              {dataPoint.masuk.toLocaleString("id-ID")}
            </span>
          </p>
          <p className="text-muted-foreground text-sm">
            Mahasiswa Keluar:{" "}
            <span className="text-red-500 font-medium">
              {dataPoint.keluar.toLocaleString("id-ID")}
            </span>
          </p>
          <p className="text-foreground text-sm font-semibold mt-1">
            Total:{" "}
            <span className="text-chart-1">
              {dataPoint.total.toLocaleString("id-ID")}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const formatNumber = (value: number) => value.toLocaleString("id-ID");

export function DashboardStatistikMahasiswaContent() {
  const router = useRouter();
  const [selectedProdi, setSelectedProdi] = useState<"S1" | "D3">("S1");

  const { data: statisticsData, isLoading } = useStatisticStudents(selectedProdi);
  const deleteStatisticStudent = useDeleteStatisticStudent();

  const [deleteAlert, setDeleteAlert] = useState<{
    isOpen: boolean;
    item: StatisticStudentResponse | null;
  }>({
    isOpen: false,
    item: null,
  });

  const handleDeleteClick = (item: StatisticStudentResponse) => {
    setDeleteAlert({ isOpen: true, item });
  };

  const handleConfirmDelete = () => {
    if (!deleteAlert.item) return;

    deleteStatisticStudent.mutate(deleteAlert.item.id, {
      onSuccess: () => {
        setDeleteAlert({ isOpen: false, item: null });

        toast.success("Statistik berhasil dihapus!", {
          description: `Tahun ${deleteAlert.item?.year}`,
        });
      },

      onError: () => {
        toast.error("Gagal menghapus statistik", {
          description: "Terjadi kesalahan pada server",
        });
      },
    });
  };

  // Transform statistics data for chart
  const chartData = useMemo(() => {
    if (!statisticsData?.data) return [];

    // Sort by year ascending
    const sortedData = [...statisticsData.data].sort((a, b) => a.year - b.year);

    let cumulativeTotal = 0;

    return sortedData.map((stat: StatisticStudentResponse) => {
      // Cumulative calculation: previous total + entered - graduated
      cumulativeTotal += stat.enteredStudents - stat.graduatedStudents;

      return {
        tahun: stat.year,
        masuk: stat.enteredStudents,
        keluar: stat.graduatedStudents,
        total: cumulativeTotal, // Total mahasiswa aktif hingga tahun ini
      };
    });
  }, [statisticsData]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Statistik Mahasiswa
          </h1>
          <p className="text-muted-foreground mt-2">
            Pantau pertumbuhan jumlah mahasiswa per tahun
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-lg border bg-muted p-1">
          <button
            onClick={() => setSelectedProdi("S1")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
              selectedProdi === "S1"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            S1 Teknik Informatika
          </button>
          <button
            onClick={() => setSelectedProdi("D3")}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition ${
              selectedProdi === "D3"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            D3 Teknik Informatika
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Loading...</div>
      ) : (
        <>
          <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
              Statistik Mahasiswa per Tahun ({selectedProdi})
            </h2>
            <div className="overflow-x-auto">
              <ResponsiveContainer width="100%" height={300} minWidth={300}>
                <BarChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--color-border)"
                  />
                  <XAxis dataKey="tahun" stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
                  />
                  <Bar
                    dataKey="total"
                    fill="var(--color-chart-1)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <DataTable
            data={statisticsData?.data ?? []}
            columns={[
              { key: "year", label: "Tahun", sortable: true },
              {
                key: "enteredStudents",
                label: "Mahasiswa Masuk",
                sortable: true,
                render: (value) => formatNumber(value as number),
              },
              {
                key: "graduatedStudents",
                label: "Mahasiswa Keluar",
                sortable: true,
                render: (value) => formatNumber(value as number),
              },
              {
                key: "total",
                label: "Total Mahasiswa",
                sortable: true,
                render: (_, item) =>
                  formatNumber(
                    (item as StatisticStudentResponse).enteredStudents +
                      (item as StatisticStudentResponse).graduatedStudents
                  ),
              },
            ]}
            onAdd={() => router.push(`/dashboard/statistik-mahasiswa/tambah?prodi=${selectedProdi}`)}
            onEdit={(item) =>
              router.push(`/dashboard/statistik-mahasiswa/${(item as StatisticStudentResponse).id}/ubah`)
            }
            onDeleteClick={handleDeleteClick}
            searchFields={["year"]}
          />
        </>
      )}

      <DeleteAlert
        isOpen={deleteAlert.isOpen}
        title="Hapus Statistik"
        description="Pastikan anda ingin menghapus data statistik ini"
        itemName={`Tahun ${deleteAlert.item?.year || ""}`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteAlert({ isOpen: false, item: null })}
      />
    </div>
  );
}
