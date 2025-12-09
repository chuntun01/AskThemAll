// app/api/stats/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Question from "@/models/Question";
import Answer from "@/models/Answer";

const TIMEZONE = "Asia/Ho_Chi_Minh";

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

// --- PHẦN ĐÃ SỬA ---
function parseRange(r) {
  // Thêm dòng này để hỗ trợ lấy 365 ngày
  if (r === "year" || r === "365d") return 365;
  
  return r === "14d" ? 14 : r === "30d" ? 30 : 7;
}
// -------------------

// dd-MM-YYYY theo local (tránh ISO UTC lệch ngày)
function ddmmyyyyLocal(d) {
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

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const range = url.searchParams.get("range");
    const days = parseRange(range); // Hàm này giờ đã hiểu 'year' -> 365

    const today = startOfDay(new Date()); // 00:00 hôm nay (local)
    // Lấy lùi về quá khứ (days - 1) ngày
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

    // Fill những ngày không có dữ liệu bằng 0
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
      daily, 
      byModel, 
    });
  } catch (err) {
    console.error("GET /api/stats error:", err);
    return NextResponse.json(
      { error: String(err?.message || err) },
      { status: 500 }
    );
  }
}