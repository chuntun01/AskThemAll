"use client";

import React, {useEffect, useMemo, useState, Suspense} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import NavbarMenu from "../components/NavMenu";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Range = "today" | "week" | "month" | "year" | "all";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f"];

function getInitialRange(sp: ReturnType<typeof useSearchParams>): Range {
  const rangeParam = sp.get("range");
  if (
    rangeParam === "today" ||
    rangeParam === "week" ||
    rangeParam === "month" ||
    rangeParam === "year" ||
    rangeParam === "all"
  ) {
    return rangeParam;
  }
  return "month";
}

function StatisticsClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const [range, setRange] = useState<Range>(() => getInitialRange(sp));

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Giả lập gọi API thống kê
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        {name: "Jan", users: 400, aiAnswers: 240, accuracy: 85},
        {name: "Feb", users: 300, aiAnswers: 139, accuracy: 78},
        {name: "Mar", users: 200, aiAnswers: 980, accuracy: 90},
        {name: "Apr", users: 278, aiAnswers: 390, accuracy: 88},
        {name: "May", users: 189, aiAnswers: 480, accuracy: 92},
      ];
      setData(mockData);
      setLoading(false);
    }, 500);
  }, [range]);

  const pieData = useMemo(
    () => [
      {name: "ChatGPT", value: 40},
      {name: "Claude", value: 25},
      {name: "Gemini", value: 20},
      {name: "Mistral", value: 10},
      {name: "Khác", value: 5},
    ],
    []
  );

  const handleChangeRange = (newRange: Range) => {
    setRange(newRange);
    const params = new URLSearchParams(sp.toString());
    params.set("range", newRange);
    router.push(`/statistics?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarMenu
        isMenuOpen={false}
        onMenuClick={function (): void {
          throw new Error("Function not implemented.");
        }}
        onClose={function (): void {
          throw new Error("Function not implemented.");
        }}
        historyItems={[]}
      />

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Thống kê hệ thống</h1>

        {/* Bộ lọc thời gian */}
        <div className="flex gap-2 mb-6">
          {["today", "week", "month", "year", "all"].map((r) => (
            <button
              key={r}
              onClick={() => handleChangeRange(r as Range)}
              className={`px-4 py-2 rounded-lg border ${
                range === r
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {r === "today"
                ? "Hôm nay"
                : r === "week"
                ? "Tuần"
                : r === "month"
                ? "Tháng"
                : r === "year"
                ? "Năm"
                : "Tất cả"}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-500">Đang tải dữ liệu...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Biểu đồ đường */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">
                Lượt người dùng & câu trả lời AI
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" />
                  <Line type="monotone" dataKey="aiAnswers" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Biểu đồ cột */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">
                Độ chính xác trung bình (%)
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="accuracy" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Biểu đồ tròn */}
            <div className="bg-white p-4 rounded-xl shadow md:col-span-2">
              <h2 className="text-lg font-semibold mb-3">
                Tỉ lệ sử dụng mô hình AI
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function StatisticsPage() {
  return (
    <Suspense
      fallback={<div className="p-8 text-gray-600">Đang tải trang...</div>}
    >
      <StatisticsClient />
    </Suspense>
  );
}
