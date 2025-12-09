"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavbarMenu from "../components/NavMenu";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LabelList,
} from "recharts";

type Range = "week" | "month" | "year";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#0088FE", "#FFBB28", "#FF8042"];

function getInitialRange(sp: ReturnType<typeof useSearchParams>): Range {
  const rangeParam = sp.get("range");
  if (rangeParam === "week" || rangeParam === "month" || rangeParam === "year") {
    return rangeParam;
  }
  return "week"; 
}

// HÀM MỚI: Gộp dữ liệu ngày thành dữ liệu 12 Tháng
const groupDataByMonth = (dailyData: any[]) => {
  // Tạo khung sẵn cho 12 tháng
  const monthlyStats = Array.from({ length: 12 }, (_, i) => ({
    name: `T${i + 1}`, // Tên hiển thị: T1, T2...
    users: 0,
    aiAnswers: 0,
    monthIndex: i + 1
  }));

  dailyData.forEach(item => {
    // item.date format là "dd-mm-yyyy" -> lấy phần mm
    const monthStr = item.date.split("-")[1]; 
    const monthIndex = parseInt(monthStr, 10) - 1; // Chuyển về index 0-11

    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyStats[monthIndex].users += item.questions;
      monthlyStats[monthIndex].aiAnswers += item.questions;
    }
  });

  return monthlyStats;
};

function StatisticsClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const [range, setRange] = useState<Range>(() => getInitialRange(sp));

  const [data, setData] = useState<any[]>([]);       
  const [pieData, setPieData] = useState<any[]>([]); 
  const [topModels, setTopModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // CẤU HÌNH API PARAM
        let apiRangeParam = "7d"; 
        if (range === "week") apiRangeParam = "7d";
        if (range === "month") apiRangeParam = "30d";
        if (range === "year") apiRangeParam = "year"; // Backend phải xử lý được 'year' -> 365

        const res = await fetch(`/api/stats?range=${apiRangeParam}`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const json = await res.json();

        // 1. Xử lý dữ liệu Line Chart
        if (json.daily && Array.isArray(json.daily)) {
          if (range === "year") {
            // NẾU LÀ NĂM: Gộp theo tháng
            const monthlyData = groupDataByMonth(json.daily);
            setData(monthlyData);
          } else {
            // NẾU LÀ TUẦN/THÁNG: Giữ nguyên theo ngày
            const mappedData = json.daily.map((item: any) => ({
              name: item.date.slice(0, 5), // dd-mm
              users: item.questions,
              aiAnswers: item.questions,
            }));
            setData(mappedData);
          }
        }

        // 2. Xử lý dữ liệu Bar Chart & Pie Chart
        if (json.byModel && Array.isArray(json.byModel)) {
          const mappedModels = json.byModel.map((model: any) => ({
            name: model.name,
            value: model.count
          }));
          
          mappedModels.sort((a: any, b: any) => b.value - a.value);

          setPieData(mappedModels);
          setTopModels(mappedModels.slice(0, 5));
        }

      } catch (error) {
        console.error("Lỗi tải thống kê:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [range]);

  const handleChangeRange = (newRange: Range) => {
    setRange(newRange);
    const params = new URLSearchParams(sp.toString());
    params.set("range", newRange);
    router.push(`statistics?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavbarMenu
        isMenuOpen={false}
        onMenuClick={() => {}}
        onClose={() => {}}
        historyItems={[]}
      />

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Thống kê hệ thống</h1>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => handleChangeRange("week")}
            className={`px-4 py-2 rounded-lg border ${
              range === "week" ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            7 Ngày qua
          </button>
          <button
            onClick={() => handleChangeRange("month")}
            className={`px-4 py-2 rounded-lg border ${
              range === "month" ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            30 Ngày qua
          </button>
          <button
            onClick={() => handleChangeRange("year")}
            className={`px-4 py-2 rounded-lg border ${
              range === "year" ? "bg-blue-600 text-white" : "bg-white hover:bg-gray-100"
            }`}
          >
            Năm (T1 - T12)
          </button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p className="text-gray-500 text-lg animate-pulse">Đang tải dữ liệu thực tế...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* --- HÀNG 1: Biểu đồ đường --- */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">
                {range === "year" ? "Xu hướng theo Tháng" : "Lượt câu hỏi theo thời gian"}
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="users" stroke="#8884d8" name="Câu hỏi" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* --- HÀNG 1: Biểu đồ cột (Top 5) --- */}
            <div className="bg-white p-4 rounded-xl shadow">
              <h2 className="text-lg font-semibold mb-3">
                Top 5 AI được gọi nhiều nhất
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topModels} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tick={{fontSize: 12}} interval={0} />
                  <YAxis allowDecimals={false} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}} 
                    formatter={(value: number) => [`${value} lần`, 'Số lượng gọi']}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Số lượng gọi" fill="#8884d8" barSize={50}>
                    <LabelList dataKey="value" position="top" fill="#666" fontSize={12} />
                    {topModels.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            {/* --- HÀNG 2: Biểu đồ tròn --- */}
            <div className="bg-white p-4 rounded-xl shadow md:col-span-2">
              <h2 className="text-lg font-semibold mb-3">
                Tỉ lệ thị phần các mô hình AI
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    startAngle={90}
                    endAngle={450}
                    labelLine={false} 
                    label={false}
                    outerRadius={160}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} lượt`, `Model: ${name}`]} />
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