"use client";

import React, { useEffect, useMemo, useState } from "react";
import NavbarMenu from "../components/NavMenu";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

type DailyRow = { date: string; questions: number };
type ModelRow = { name: string; count: number };
type Totals = { questions: number; todayNew: number };

export default function StatisticsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const historyItems = useMemo(
    () => [
      { name: "Sản phẩm A", href: "/san-pham-a" },
      { name: "Tin tức mới nhất", href: "/tin-tuc" },
    ],
    []
  );

  const [range, setRange] = useState<"7d" | "14d" | "30d">("7d");

  const [totals, setTotals] = useState<Totals>({ questions: 0, todayNew: 0 });
  const [daily, setDaily] = useState<DailyRow[]>([]);
  const [byModel, setByModel] = useState<ModelRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(`/api/stats?range=${range}`, { cache: "no-store" });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();

        if (!cancelled) {
          setTotals(data.totals);
          setDaily(data.daily);
          setByModel(data.byModel || []);
        }
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Lỗi tải dữ liệu");
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [range]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c", "#d0ed57"];

  return (
    <>
      <style jsx>{`
        html, body { background: #F6FBF1; color: #111; }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-bg {
          background: linear-gradient(45deg, #8DBCC7, #A4CCD9, #EBFFD8, #38f9d7);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
      `}</style>

      <main className="gradient-bg min-h-screen overflow-x-hidden overflow-y-auto pt-16 text-gray-900">
        <NavbarMenu
          isMenuOpen={isMenuOpen}
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
          onClose={() => setIsMenuOpen(false)}
          historyItems={historyItems}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 pb-16">
          <div className="mb-6 flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Thống Kê Sử Dụng</h1>
              
            </div>
            <Toolbar range={range} setRange={setRange} />
          </div>

          {err && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              Lỗi: {err}
            </div>
          )}

          {loading ? (
            <div className="text-sm text-gray-600">Đang tải dữ liệu…</div>
          ) : (
            <>
              <section className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
  <StatCard label="Tổng câu hỏi" value={totals.questions} />
  <StatCard label="Câu hỏi hôm nay" value={totals.todayNew} />
</section>


              {/* Charts */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Line: số câu hỏi theo ngày */}
                <ChartCard title="Số câu hỏi theo ngày">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={daily}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="questions" name="Câu hỏi" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

                {/* Bar: AI dùng nhiều nhất */}
                <ChartCard title="AI dùng nhiều nhất">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={byModel}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" name="Số lượt" fill="#8884d8" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

                {/* Pie: AI dùng nhiều nhất (tỉ lệ) */}
                <ChartCard title="AI dùng nhiều nhất" className="xl:col-span-2">
                  <div className="h-80 overflow-visible">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 16, right: 24, bottom: 40, left: 24 }}>
                        <Pie
                          data={byModel}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="45%"
                          outerRadius={110}
                          labelLine={false}
                          label={(entry: any) =>
                            `${entry.name ?? ""} ${(((entry.percent ?? 0) * 100).toFixed(0))}%`
                          }
                        >
                          {byModel.map((_: any, i: number) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={32} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}

function Toolbar({
  range, setRange,
}: {
  range: "7d" | "14d" | "30d";
  setRange: (v: "7d" | "14d" | "30d") => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur border rounded-2xl shadow p-2">
      <Select
        label="Khoảng thời gian"
        value={range}
        onChange={(e) => setRange(e.target.value as "7d" | "14d" | "30d")}
        options={[
          { value: "7d", label: "7 ngày" },
          { value: "14d", label: "14 ngày" },
          { value: "30d", label: "30 ngày" },
        ]}
      />
      <button className="ml-1 px-3 py-2 text-sm rounded-xl bg-gray-900 text-white hover:opacity-90 active:scale-[.98]">
        Áp dụng
      </button>
    </div>
  );
}

function Select({
  label, value, onChange, options,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-gray-600 whitespace-nowrap">{label}</span>
      <select className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50" value={value} onChange={onChange}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl md:text-3xl font-bold mt-1">{value}</div>
    </div>
  );
}

function ChartCard({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-white rounded-2xl shadow p-4 ${className ?? ""}`}>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">{title}</h2>
        <div className="text-xs text-gray-400">from DB</div>
      </div>
      {children}
    </div>
  );
}
