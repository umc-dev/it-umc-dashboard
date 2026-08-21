"use client";

// import { useAdmins } from "@/app/dashboard/admin/queries";
import { useAlumni } from "@/app/dashboard/alumni/queries";
import { useNews } from "@/app/dashboard/berita/queries";
import { useDosens } from "@/app/dashboard/dosen/queries";
import { useCategory } from "@/app/dashboard/kategori/queries";
import { usePartnerships } from "@/app/dashboard/kerja-sama/queries";
// import { useStudies } from "@/app/dashboard/matakuliah/queries";
import { useStatisticStudents } from "@/app/dashboard/statistik-mahasiswa/queries";
import { StatisticStudentResponse } from "@/app/dashboard/statistik-mahasiswa/types";
import { useMe } from "@/app/login/queries";
import { useMemo } from "react";
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

export function DashboardMainContent() {
  // Fetch data from API
  const { data: admin } = useMe();
  const { data: statisticsData } = useStatisticStudents();
  const { data: newsData } = useNews();
  const { data: dosensData } = useDosens();
  const { data: categoriesData } = useCategory();
  const { data: partnershipsData } = usePartnerships();
  const { data: alumniData } = useAlumni();
  // const { data: studiesData } = useStudies();
  // const { data: adminsData } = useAdmins();

  // Calculate cumulative total students across all years
  const totalStudents = useMemo(() => {
    if (!statisticsData?.data || statisticsData.data.length === 0) return 0;

    // Total = Sum of all students entered - Sum of all students graduated
    const totalEntered = statisticsData.data.reduce(
      (sum, stat) => sum + stat.enteredStudents,
      0,
    );
    const totalGraduated = statisticsData.data.reduce(
      (sum, stat) => sum + stat.graduatedStudents,
      0,
    );

    return totalEntered - totalGraduated;
  }, [statisticsData]);

  // Prepare stats cards
  const stats = useMemo(
    () => [
      {
        label: "Total Dosen",
        value: dosensData?.data?.length || 0,
      },
      {
        label: "Total Berita",
        value: newsData?.data?.length || 0,
      },
      {
        label: "Total Alumni",
        value: alumniData?.data?.length || 0,
      },
      {
        label: "Total Kategori",
        value: categoriesData?.length || 0,
      },
      {
        label: "Total Mahasiswa",
        value: totalStudents,
      },
      {
        label: "Total Kerja Sama",
        value: partnershipsData?.data?.length || 0,
      },
      // {
      //   label: "Total Studi",
      //   value: studiesData?.data?.length || 0,
      // },
      // {
      //   label: "Total Admin",
      //   value: adminsData?.data?.length || 0,
      // },
    ],
    [
      dosensData,
      newsData,
      alumniData,
      categoriesData,
      totalStudents,
      partnershipsData,
      // studiesData,
      // adminsData,
    ],
  );

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

  // Get latest news
  const latestNews = useMemo(() => {
    if (!newsData?.data) return [];
    return newsData.data.slice(0, 3);
  }, [newsData]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
          Selamat Datang di Dashboard, {admin?.name}!
        </h1>
        <p className="text-sm text-muted-foreground">
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
          >
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {stat.label}
            </p>
            <p className="text-4xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Statistics Chart */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Statistik Mahasiswa per Tahun
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

        {/* Categories Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Distribusi Kategori Berita
          </h2>
          <div className="space-y-4">
            {categoriesData?.map((category) => {
              const count =
                newsData?.data?.filter(
                  (news) => news.categoryId === category.id,
                ).length || 0;
              const percentage =
                newsData?.data && newsData.data.length > 0
                  ? (count / newsData.data.length) * 100
                  : 0;
              return (
                <div key={category.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-foreground truncate">
                      {category.name}
                    </span>
                    <span className="text-sm text-muted-foreground ml-2">
                      {count}
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Latest News Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Berita Terbaru
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestNews.map((news) => (
            <div
              key={news.id}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-foreground line-clamp-2 mb-2">
                {news.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {news.content.replace(/<[^>]*>/g, "")}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>{news.category.name}</span>
                <span>
                  {new Date(news.createdAt).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
