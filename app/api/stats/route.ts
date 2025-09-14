// app/api/stats/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Question from "@/models/Question";
import Answer from "@/models/Answer";
const TIMEZONE = "Asia/Ho_Chi_Minh";

function startOfDay(d: string | number | Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function addDays(d: string | number | Date, n: number) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
function parseRange(r: string | null) {
  return r === "14d" ? 14 : r === "30d" ? 30 : 7;
}

// dd-MM-YYYY theo local (tránh ISO UTC lệch ngày)
function ddmmyyyyLocal(d: Date) {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${dd}-${mm}-${yy}`;
}

// Làm đẹp tên model
function prettyName(s = "") {
  const raw = s.includes("/") ? s.split("/").slice(-1)[0] : s;
  const spaced = raw.replace(/[-_]+/g, " ").trim();
  return spaced
    .replace(/\bgpt\b/gi, "GPT")
    .replace(/\bgemma\b/gi, "Gemma")
    .replace(/\bgemini\b/gi, "Gemini")
    .replace(/\bmistral\b/gi, "Mistral")
    .replace(/\bclaude\b/gi, "Claude");
}

export async function GET(req: { url: string | URL }) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const range = url.searchParams.get("range");
    const days = parseRange(range);

    const today = startOfDay(new Date()); // 00:00 hôm nay (local)
    const from = addDays(today, -(days - 1));
    const until = addDays(today, 1); // 00:00 ngày mai -> bao cả hôm nay

    // Totals (trong khoảng lọc) + hôm nay
    const [questionsInRange, todayNew] = await Promise.all([
      Question.countDocuments({ createDate: { $gte: from, $lt: until } }),
      Question.countDocuments({ createDate: { $gte: today } }),
    ]);

    // Daily: group theo ngày (dd-MM-YYYY) theo timezone VN
    const dailyAgg = await Question.aggregate([
      { $match: { createDate: { $gte: from, $lt: until } } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createDate",
              timezone: TIMEZONE,
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const qMap = new Map(dailyAgg.map((r) => [r._id, r.count]));
    const daily = Array.from({ length: days }, (_, i) => {
      const d = addDays(from, i);
      const k = ddmmyyyyLocal(d); // dd-MM-YYYY
      return { date: k, questions: qMap.get(k) ?? 0 };
    });

    // byModel: đếm answers theo AI trong cùng khoảng lọc
    const byModelAgg = await Answer.aggregate([
      { $match: { createDate: { $gte: from, $lt: until } } },
      { $group: { _id: "$authorModel", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "aimodels",
          localField: "_id",
          foreignField: "_id",
          as: "model",
        },
      },
      { $unwind: { path: "$model", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          count: 1,
          rawName: {
            $ifNull: [
              "$model.displayName",
              { $ifNull: ["$model.modelId", { $toString: "$_id" }] },
            ],
          },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const byModel = byModelAgg.map((m) => ({
      name: prettyName(m.rawName),
      count: m.count,
    }));

    return NextResponse.json({
      totals: { questions: questionsInRange, todayNew },
      daily, // [{ date: "07-09-2025", questions: 10 }, ...]
      byModel, // [{ name: "Gemini Flash 1.5", count: 42 }, ...]
    });
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
