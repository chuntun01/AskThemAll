// app/api/chat-history/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Question from "@/lib/models/Question";
import User from "@/lib/models/User"; // hoặc model/collection bạn lưu role

export const dynamic = "force-dynamic";

type HistoryItem = {
  id: string;
  name: string;
  href: string;
  updatedAt?: number;
};

export async function GET(_req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    // Lấy role từ DB (đừng tin client)
    const dbUser = await User.findOne({ clerkId: userId }).lean(); // tùy field của bạn
    const isAdmin = dbUser?.isAdmin === true;

    // Admin thấy tất cả, member chỉ thấy câu hỏi của mình
    const filter = isAdmin ? {} : { userId };

    const questions = await Question.find(filter)
      .sort({ createDate: -1 })
      .limit(50)
      .lean();

    const threads = new Map<string, { name: string; updatedAt: number }>();

    for (const q of questions) {
      const threadKey = q.threadId ? String(q.threadId) : String(q._id);

      const updatedAtMs = q.createDate ? new Date(q.createDate).getTime() : Date.now();

      const name =
        typeof q.question === "string" && q.question.trim()
          ? q.question.trim().slice(0, 80)
          : "Cuộc trò chuyện";

      const existing = threads.get(threadKey);
      if (!existing || existing.updatedAt < updatedAtMs) {
        threads.set(threadKey, { name, updatedAt: updatedAtMs });
      }
    }

    const items: HistoryItem[] = Array.from(threads.entries())
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
      .map(([id, v]) => ({
        id,
        name: v.name,
        href: `/api/chat-history/${id}`,
        updatedAt: v.updatedAt,
      }));

    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    console.error("GET /api/chat-history error:", err);
    return NextResponse.json(
      { message: "Không lấy được danh sách lịch sử" },
      { status: 500 }
    );
  }
}
