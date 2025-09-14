"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

type Range = "7d" | "14d" | "30d";
type DailyRow = { date: string; questions: number };
type ModelRow = { name: string; count: number };
type Totals = { questions: number; todayNew: number };

const LS_KEY = "stats:prefs";
const CACHE_KEY = (r: string) => `stats:data:${r}`;
const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
];

// ——— helpers ———
const getInitialRange = (sp: URLSearchParams | null): Range => {
  const urlRange = (sp?.get("range") as Range | null) ?? null;
  if (urlRange === "7d" || urlRange === "14d" || urlRange === "30d")
    return urlRange;

  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const saved = parsed?.range as Range | undefined;
      if (saved === "7d" || saved === "14d" || saved === "30d") return saved;
    } catch {}
  }
  return "7d";
};

const shortLabel = (s: string, max = 14) =>
  s?.length > max ? s.slice(0, max - 1) + "…" : s;

// Tooltip tuỳ biến cho Pie (hiện số + %)
function CustomTooltip(props: any) {
  const { active, payload, total } = props as {
    active: boolean;
    payload: any[];
    total: number;
  };
  if (active && payload && payload.length) {
    const p = payload[0];
    const name: string = p?.name ?? p?.payload?.name ?? "";
    const value: number = Number(p?.value ?? 0);
    const pct = total > 0 ? Math.round((value / total) * 1000) / 10 : 0; // 1 số lẻ
    return (
      <div className="bg-white rounded-lg shadow px-3 py-2 text-sm">
        <div className="font-semibold">{name}</div>
        <div>Số lượt: {value}</div>
        <div>Tỉ lệ: {pct}%</div>
      </div>
    );
  }
  return null;
}

export default function StatisticsPage() {
  const router = useRouter();
  const sp = useSearchParams();

  const [range, setRange] = useState<Range>(() => getInitialRange(sp));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const historyItems = useMemo(
    () => [
      { name: "Sản phẩm A", href: "/san-pham-a" },
      { name: "Tin tức mới nhất", href: "/tin-tuc" },
    ],
    []
  );

  const [totals, setTotals] = useState<Totals>({ questions: 0, todayNew: 0 });
  const [daily, setDaily] = useState<DailyRow[]>([]);
  const [byModelRaw, setByModelRaw] = useState<ModelRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  // Đồng bộ URL khi đổi range
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("range") !== range) {
      params.set("range", range);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [range, router]);

  // Lưu lựa chọn
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ range }));
    } catch {}
  }, [range]);

  // Nạp dữ liệu (có cache + abort)
  useEffect(() => {
    let cancelled = false;
    const ctrl = new AbortController();

    async function load() {
      setLoading(true);
      setErr(null);

      // cache trước
      try {
        const cached = sessionStorage.getItem(CACHE_KEY(range));
        if (cached && !cancelled) {
          const data = JSON.parse(cached);
          setTotals(data.totals ?? { questions: 0, todayNew: 0 });
          setDaily(Array.isArray(data.daily) ? data.daily : []);
          setByModelRaw(Array.isArray(data.byModel) ? data.byModel : []);
          setLoading(false);
        }
      } catch {}

      // fetch mới
      try {
        const res = await fetch(`/api/stats?range=${range}`, {
          cache: "no-store",
          signal: ctrl.signal,
        });
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();

        if (!cancelled) {
          setTotals(data.totals ?? { questions: 0, todayNew: 0 });
          setDaily(Array.isArray(data.daily) ? data.daily : []);
          setByModelRaw(Array.isArray(data.byModel) ? data.byModel : []);
          setLoading(false);
        }
        try {
          sessionStorage.setItem(CACHE_KEY(range), JSON.stringify(data));
        } catch {}
      } catch (e: any) {
        if (!cancelled && e?.name !== "AbortError") {
          setErr(e?.message ?? "Lỗi tải dữ liệu");
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [range]);

  // Chuẩn hoá & sort theo count
  const byModel = useMemo<ModelRow[]>(() => {
    const cleaned = (byModelRaw ?? [])
      .filter((x) => x && typeof x.name === "string")
      .map((x) => ({ name: x.name, count: Math.max(0, Number(x.count) || 0) }))
      .filter((x) => x.count > 0);

    cleaned.sort((a, b) => b.count - a.count);
    return cleaned;
  }, [byModelRaw]);

  const totalCount = useMemo(
    () => byModel.reduce((s, x) => s + x.count, 0),
    [byModel]
  );

  return (
    <>
      <style jsx>{`
        html,
        body {
          background: #f6fbf1;
          color: #111;
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .gradient-bg {
          background: linear-gradient(
            45deg,
            #8dbcc7,
            #a4ccd9,
            #ebffd8,
            #38f9d7
          );
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
              <h1 className="text-2xl md:text-3xl font-bold">
                Bảng điều khiển thống kê
              </h1>
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
              {/* Stat cards */}
              <section className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
                <StatCard
                  label="Tổng câu hỏi (theo lọc)"
                  value={totals.questions}
                />
                <StatCard label="Câu hỏi hôm nay" value={totals.todayNew} />
              </section>

              {/* Charts: mỗi chart 1 hàng */}
              <section className="grid grid-cols-1 gap-8">
                {/* Line */}
                <ChartCard title="Số câu hỏi theo ngày">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={daily}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="questions"
                          name="Câu hỏi"
                          stroke="#8884d8"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

                {/* Bar */}
                <ChartCard title="AI dùng nhiều nhất">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={byModel}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          interval={0}
                          tick={{ fontSize: 11 }}
                          tickFormatter={(v: string) => shortLabel(v, 14)}
                          angle={-25}
                          textAnchor="end"
                          height={60}
                        />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="count"
                          name="Số lượt"
                          fill="#8884d8"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </ChartCard>

                {/* Pie */}
                <ChartCard title="AI dùng nhiều nhất (tỉ lệ)">
                  <div className="h-[520px] overflow-visible">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart
                        margin={{ top: 16, right: 24, bottom: 40, left: 24 }}
                      >
                        <Pie
                          data={byModel}
                          dataKey="count"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={170} // to hơn
                          labelLine={false} // tắt label trên lát để không đè
                        >
                          {byModel.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                          ))}
                        </Pie>
                        {/* Tooltip tuỳ biến: số + % */}
                        <Tooltip
                          content={<CustomTooltip total={totalCount} />}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={60}
                          content={({ payload }) => (
                            <ul className="grid grid-cols-4 gap-x-4 gap-y-2 text-sm justify-items-start">
                              {payload?.map((entry, index) => (
                                <li
                                  key={`item-${index}`}
                                  className="flex items-center space-x-2"
                                >
                                  <span
                                    className="inline-block w-3 h-3 rounded-sm"
                                    style={{ backgroundColor: entry.color }}
                                  />
                                  <span>{entry.value}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        />
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
  range,
  setRange,
}: {
  range: Range;
  setRange: (v: Range) => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-white/80 backdrop-blur border rounded-2xl shadow p-2">
      <Select
        label="Khoảng thời gian"
        value={range}
        onChange={(e) => setRange(e.target.value as Range)}
        options={[
          { value: "7d", label: "7 ngày" },
          { value: "14d", label: "14 ngày" },
          { value: "30d", label: "30 ngày" },
        ]}
      />
      <button
        type="button"
        className="ml-1 px-3 py-2 text-sm rounded-xl bg-gray-900 text-white hover:opacity-90 active:scale-[.98]"
        onClick={() => {}}
        aria-label="Áp dụng"
        title="Áp dụng"
      >
        Áp dụng
      </button>
    </div>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <span className="text-gray-600 whitespace-nowrap">{label}</span>
      <select
        className="px-3 py-2 rounded-xl border bg-white hover:bg-gray-50"
        value={value}
        onChange={onChange}
      >
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

function ChartCard({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
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
