import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Question from "@/lib/models/Question";
import Answer from "@/lib/models/Answer";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { id } = params || {};
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "id không hợp lệ" }, { status: 400 });
    }
    const threadId = new mongoose.Types.ObjectId(id);

    const questions = await Question.find({
      $or: [{ threadId }, { $and: [{ threadId: { $exists: false } }, { _id: threadId }] }],
    })
      .sort({ createDate: 1 })
      .lean();

    const questionIds = questions.map((q) => q._id);
    const answers = await Answer.find({
      $or: [
        { threadId },
        { $and: [{ threadId: { $exists: false } }, { question: { $in: questionIds } }] },
      ],
    })
      .sort({ createDate: 1 })
      .populate({ path: "authorModel", select: "modelId displayName" })
      .lean();

    const combined = [
      ...questions.map((q) => ({
        _t: q.createDate,
        msg: {
          id: String(q._id),
          role: "user",
          content: typeof q.question === "string" && q.question.trim() ? q.question : "(không có nội dung)",
        },
      })),
      ...answers.map((a) => {
        let modelId;
        const am = a?.authorModel;
        if (typeof am === "string") modelId = am;
        else if (am && typeof am === "object") modelId = am.modelId || am._id?.toString();
        return {
          _t: a.createDate,
          msg: {
            id: String(a._id),
            role: "assistant",
            content: typeof a.content === "string" && a.content.trim() ? a.content : "(không có nội dung)",
            modelId,
          },
        };
      }),
    ].sort((x, y) => new Date(x._t).getTime() - new Date(y._t).getTime());

    const messages = combined.map((x) => x.msg);
    return NextResponse.json({ id: String(threadId), messages });
  } catch (err) {
    console.error("GET /api/chat-history/[id] error:", err);
    return NextResponse.json({ message: "Không lấy được đoạn chat" }, { status: 500 });
  }
}
