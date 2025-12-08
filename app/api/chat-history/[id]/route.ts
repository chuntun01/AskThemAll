// app/api/chat-history/[id]/route.ts

import {NextRequest, NextResponse} from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Question from "@/lib/models/Question";
import Answer from "@/lib/models/Answer";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  {params}: {params: Promise<{id: string}>}
) {
  try {
    await connectDB();

    // 🔥 Next 15: phải await params
    const {id: rawId} = await params;

    if (!rawId || !mongoose.Types.ObjectId.isValid(rawId)) {
      return NextResponse.json({message: "ID không hợp lệ"}, {status: 400});
    }

    const asObjectId = new mongoose.Types.ObjectId(rawId);

    // Thử xem đây có phải _id của 1 câu hỏi không
    const baseQuestion = await Question.findById(asObjectId).lean();

    // Xác định threadId
    let threadId: mongoose.Types.ObjectId;

    if (baseQuestion?.threadId) {
      // Ép kiểu cho TypeScript, runtime vẫn ok
      const rawThread = baseQuestion.threadId as unknown as
        | mongoose.Types.ObjectId
        | string;

      if (mongoose.Types.ObjectId.isValid(rawThread)) {
        threadId = new mongoose.Types.ObjectId(rawThread);
      } else {
        threadId = asObjectId;
      }
    } else {
      threadId = asObjectId;
    }

    // Lấy câu hỏi trong thread
    const questions = await Question.find({
      $or: [{threadId}, {_id: threadId}],
    })
      .sort({createDate: 1})
      .lean();

    const questionIds = questions.map((q) => q._id);

    // Lấy câu trả lời liên quan
    const answers = await Answer.find({
      $or: [{threadId}, {question: {$in: questionIds}}],
    })
      .sort({createDate: 1})
      .populate({path: "authorModel", select: "modelId displayName"})
      .lean();

    const combined = [
      // USER QUESTIONS
      ...questions.map((q) => ({
        _t: q.createDate,
        msg: {
          id: String(q._id),
          content:
            typeof q.question === "string" && q.question.trim()
              ? q.question
              : "(không có nội dung)",
          isAdmin: false, // user
        },
      })),

      // AI ANSWERS
      ...answers.map((a) => {
        let modelId: string | undefined;
        let modelName: string | undefined;

        const am = a?.authorModel as any;
        if (typeof am === "string") {
          modelId = am;
        } else if (am && typeof am === "object") {
          modelId = am.modelId || am._id?.toString();
          if (typeof am.displayName === "string") {
            modelName = am.displayName;
          }
        }

        return {
          _t: a.createDate,
          msg: {
            id: String(a._id),
            content:
              typeof a.content === "string" && a.content.trim()
                ? a.content
                : "(không có nội dung)",
            isAdmin: true, // AI
            modelId,
            modelName,
          },
        };
      }),
    ].sort((a, b) => new Date(a._t).getTime() - new Date(b._t).getTime());

    const messages = combined.map((x) => x.msg);

    return NextResponse.json(
      {
        id: String(threadId),
        messages,
      },
      {status: 200}
    );
  } catch (err) {
    console.error("GET /api/chat-history/[id] error:", err);
    return NextResponse.json(
      {message: "Không lấy được đoạn chat"},
      {status: 500}
    );
  }
}
