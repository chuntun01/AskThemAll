// app/api/stats/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Question from "@/models/Question";
import Answer from "@/models/Answer";

function startOfDay(d) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function iso(d) { return d.toISOString().slice(0, 10); }
function parseRange(r) { return r === "14d" ? 14 : r === "30d" ? 30 : 7; }

// Làm đẹp tên model để hiển thị
function prettyName(s = "") {
  const raw = s.includes("/") ? s.split("/").slice(-1)[0] : s; // bỏ tiền tố "google/", "openai/", ...
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

    const url   = new URL(req.url);
    const range = url.searchParams.get("range");
    const days  = parseRange(range);

    // mốc thời gian: always include today
    const today = startOfDay(new Date());   // 00:00 hôm nay
    const from  = addDays(today, -(days - 1));
    const until = addDays(today, 1);        // 00:00 ngày mai => bao trọn hôm nay

    // --- totals (CHỈ trong khoảng lọc) + hôm nay ---
    const [questionsInRange, todayNew] = await Promise.all([
      Question.countDocuments({ createDate: { $gte: from, $lt: until } }),
      Question.countDocuments({ createDate: { $gte: today } }),
    ]);

    // --- daily: số câu hỏi theo ngày trong range (bao cả hôm nay) ---
    const dailyAgg = await Question.aggregate([
      { $match: { createDate: { $gte: from, $lt: until } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createDate" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const qMap = new Map(dailyAgg.map(r => [r._id, r.count]));
    const daily = Array.from({ length: days }, (_, i) => {
      const d = addDays(from, i);
      const k = iso(d);
      return { date: k, questions: qMap.get(k) ?? 0 };
    });

    // --- byModel: đếm câu trả lời theo AI trong range (cho Bar + Pie) ---
    const byModelAgg = await Answer.aggregate([
      { $match: { createDate: { $gte: from, $lt: until } } },
      { $group: { _id: "$authorModel", count: { $sum: 1 } } },
      {
        $lookup: {
          from: "aimodels",           // tên collection của AIModel trong Atlas
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
            $ifNull: ["$model.displayName", { $ifNull: ["$model.modelId", { $toString: "$_id" }] }],
          },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const byModel = byModelAgg.map(m => ({
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
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
