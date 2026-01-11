"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  statistikMahasiswas,
  beritas,
  dosens,
  kategoris,
  mataKuliahs,
  type StatistikMahasiswa,
} from "@/lib/data";

// Custom Tooltip Component
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: StatistikMahasiswa;
  }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "var(--color-card)",
          border: "1px solid var(--color-border)",
          borderRadius: "0.5rem",
          padding: "0.75rem",
        }}
      >
        <p
          style={{
            color: "var(--color-foreground)",
            fontWeight: "600",
            marginBottom: "0.5rem",
          }}
        >
          Tahun {label}
        </p>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <p
            style={{
              color: "var(--color-muted-foreground)",
              fontSize: "0.875rem",
            }}
          >
            Mahasiswa Masuk:{" "}
            <span style={{ color: "#10b981", fontWeight: "500" }}>
              {formatNumber(dataPoint.masuk)}
            </span>
          </p>
          <p
            style={{
              color: "var(--color-muted-foreground)",
              fontSize: "0.875rem",
            }}
          >
            Mahasiswa Keluar:{" "}
            <span style={{ color: "#ef4444", fontWeight: "500" }}>
              {formatNumber(dataPoint.keluar)}
            </span>
          </p>
          <p
            style={{
              color: "var(--color-foreground)",
              fontSize: "0.875rem",
              fontWeight: "600",
              marginTop: "0.25rem",
            }}
          >
            Total:{" "}
            <span style={{ color: "var(--color-chart-1)" }}>
              {formatNumber(dataPoint.total)}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const formatNumber = (value: number) => value.toLocaleString("id-ID");

export function DashboardMainContent() {
  const stats = useMemo(
    () => [
      { label: "Total Dosen", value: dosens.length, color: "bg-chart-1" },
      { label: "Total Berita", value: beritas.length, color: "bg-chart-2" },
      {
        label: "Total Mata Kuliah",
        value: mataKuliahs.length,
        color: "bg-chart-3",
      },
      { label: "Total Kategori", value: kategoris.length, color: "bg-chart-4" },
      {
        label: "Total Mahasiswa",
        value: statistikMahasiswas[statistikMahasiswas.length - 1].total,
        color: "bg-chart-5",
      },
    ],
    []
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-lg p-4 sm:p-6 text-center hover:shadow-md transition-shadow"
          >
            <p className="text-xs sm:text-sm font-medium text-muted-foreground mb-2">
              {stat.label}
            </p>
            <p className="text-2xl sm:text-4xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
            Statistik Mahasiswa per Tahun
          </h2>
          <div className="overflow-x-auto">
            <ResponsiveContainer width="100%" height={300} minWidth={300}>
              <BarChart data={statistikMahasiswas}>
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

        <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
            Distribusi Mata Kuliah
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((sem) => {
              const count = mataKuliahs.filter(
                (mk) => mk.semester === sem
              ).length;
              const percentage = (count / mataKuliahs.length) * 100;
              return (
                <div key={sem}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs sm:text-sm font-medium text-foreground">
                      Semester {sem}
                    </span>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {count}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
          Berita Terbaru
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {beritas.slice(0, 3).map((berita) => (
            <div
              key={berita.id}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-foreground line-clamp-2">
                {berita.judul}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2 line-clamp-3">
                {berita.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
