// app/api/questions/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Question from "@/lib/models/Question";
import Answer from "@/lib/models/Answer";
import AIModel from "@/lib/models/AIModel";
import { askOpenRouter } from "@/lib/services/aiService";

// (Nếu bạn có GET ở file này thì giữ nguyên phần GET hiện tại của bạn)

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { question, userId, selectedModelIds, threadId } = body || {};

    // Validate input
    if (
      !question ||
      !Array.isArray(selectedModelIds) ||
      selectedModelIds.length === 0
    ) {
      return NextResponse.json(
        { message: "Dữ liệu không hợp lệ." },
        { status: 400 }
      );
    }

    // Xác định threadId cuối cùng (nếu FE gửi thì dùng, không có thì tạo mới)
    const finalThreadId =
      threadId && mongoose.Types.ObjectId.isValid(threadId)
        ? new mongoose.Types.ObjectId(threadId)
        : new mongoose.Types.ObjectId();

    // Lấy ra các model theo mảng modelId (string) FE gửi lên
    const foundModels = await AIModel.find({
      modelId: { $in: selectedModelIds },
    }).lean();

    if (foundModels.length !== selectedModelIds.length) {
      return NextResponse.json(
        { message: "Một hoặc nhiều AI model không hợp lệ." },
        { status: 404 }
      );
    }

    // Lưu Question (gắn threadId)
    const modelObjectIds = foundModels.map((m) => m._id);
    const newQuestion = await Question.create({
      question: String(question),
      userId: userId ?? null,
      selectedModels: modelObjectIds,   // refs -> AIModel
      threadId: finalThreadId,          // 👈 NEW: gom nhóm
      createDate: new Date(),
      updateDate: new Date(),
    });

    // Gọi các model sinh câu trả lời (song song)
    // FE gửi selectedModelIds là danh sách *modelId* (string). Dùng đúng thứ tự để map.
    const aiPromises = foundModels.map((m) =>
      askOpenRouter(String(question), m.modelId)
    );
    const aiResponses = await Promise.all(aiPromises); // array<string>

    // Chuẩn bị dữ liệu Answer để lưu (gắn threadId)
    const newAnswersData = aiResponses.map((responseText, idx) => ({
      content: responseText || "",
      question: newQuestion._id,             // ref -> Question
      authorModel: foundModels[idx]._id,     // ref -> AIModel
      threadId: finalThreadId,               // 👈 NEW: gom nhóm
      createDate: new Date(),
    }));

    // Lưu tất cả Answer
    const savedAnswers = await Answer.insertMany(newAnswersData);

    // Populate authorModel để FE hiển thị được tên/modelId
    const populatedAnswers = await Answer.find({
      _id: { $in: savedAnswers.map((a) => a._id) },
    })
      .populate({
        path: "authorModel",
        select: "modelId displayName", // 👈 FE sẽ đọc modelId/displayName
      })
      .lean();

    // Trả về cho FE:
    // - threadId để lưu vào store và gửi kèm cho lần hỏi sau
    // - questionId cho tiện debug / liên kết
    // - answers đã populate (FE đang normalize linh hoạt)
    return NextResponse.json(
      {
        ok: true,
        threadId: String(finalThreadId),     // 👈 FE lưu lại
        questionId: String(newQuestion._id),
        question: {
          _id: String(newQuestion._id),
          question: newQuestion.question,
          userId: newQuestion.userId,
          selectedModels: newQuestion.selectedModels,
          threadId: String(finalThreadId),
          createDate: newQuestion.createDate,
          updateDate: newQuestion.updateDate,
        },
        answers: populatedAnswers.map((a) => ({
          _id: String(a._id),
          content: a.content,
          authorModel: a.authorModel
            ? {
                _id: String(a.authorModel._id),
                modelId: a.authorModel.modelId,
                displayName: a.authorModel.displayName,
              }
            : null,
          question: String(a.question),
          threadId: a.threadId ? String(a.threadId) : null,
          createDate: a.createDate,
        })),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi trong quá trình tạo và xử lý câu hỏi:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
