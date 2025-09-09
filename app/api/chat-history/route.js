import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Question from "@/lib/models/Question";
import Answer from "@/lib/models/Answer";

// ❌ KHÔNG export default ở file này
// ✅ Phải export hàm GET (hoặc POST...) theo tên

export async function GET() {
  try {
    await connectDB();

    const rows = await Question.aggregate([
      { $addFields: { _thread: { $ifNull: ["$threadId", "$_id"] } } },
      {
        $lookup: {
          from: "answers",
          let: { tid: "$_thread" },
          pipeline: [
            { $match: { $expr: { $eq: ["$threadId", "$$tid"] } } },
            { $project: { createDate: 1 } },
          ],
          as: "answersInThread",
        },
      },
      {
        $group: {
          _id: "$_thread",
          firstQuestion: { $first: "$$ROOT" },
          lastQuestionAt: { $max: "$createDate" },
          maxAnswerAt: { $max: { $max: "$answersInThread.createDate" } },
          countQ: { $sum: 1 },
        },
      },
      { $addFields: { lastActivity: { $max: ["$lastQuestionAt", "$maxAnswerAt"] } } },
      { $sort: { lastActivity: -1 } },
      { $limit: 50 },
      { $project: { _id: 1, title: "$firstQuestion.question", lastActivity: 1, countQ: 1 } },
    ]);

    const items = rows.map((r) => ({
      id: String(r._id),
      name:
        typeof r.title === "string" && r.title.trim()
          ? (r.title.length > 60 ? r.title.slice(0, 57) + "..." : r.title)
          : "(không có tiêu đề)",
      href: `/chat/${String(r._id)}`,
      updatedAt: r.lastActivity ? new Date(r.lastActivity).getTime() : undefined,
    }));

    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/chat-history error:", err);
    return NextResponse.json({ message: "Không lấy được lịch sử" }, { status: 500 });
  }
}
