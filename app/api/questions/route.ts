/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextResponse, type NextRequest} from "next/server";
import mongoose from "mongoose";
import {auth} from "@clerk/nextjs/server";
import {getUserByClerkId} from "@/lib/actions/userDb.action";
import connectDB from "@/lib/db";
import Question from "@/lib/models/Question";
import Answer from "@/lib/models/Answer";
import AIModel from "@/lib/models/AIModel";
import {askOpenRouter} from "@/lib/services/aiService";

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Gửi câu hỏi và gọi nhiều mô hình AI
 *     description: Nhận câu hỏi từ user (đã đăng nhập Clerk), lưu vào DB và gọi các AI model đã chọn để tạo danh sách câu trả lời.
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *                 example: "Giải thích giúp tôi SEO Onpage là gì và các bước thực hiện?"
 *               selectedModelIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["gpt-4.1-mini", "claude-3.5-sonnet"]
 *               threadId:
 *                 type: string
 *                 nullable: true
 *                 example: "677521b3b2d4a2f5c9b94a10"
 *     responses:
 *       201:
 *         description: Tạo câu hỏi và câu trả lời thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Chưa đăng nhập (Unauthorized)
 *       404:
 *         description: Không tìm thấy user hoặc model
 *       500:
 *         description: Lỗi server
 */
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // 1. Xác thực người dùng và lấy thông tin từ DB
    const {userId: clerkId} = await auth(); // Await để lấy full session
    if (!clerkId) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    console.log("DEBUG: Clerk ID found:", clerkId); // Log debug

    const currentUser = await getUserByClerkId(clerkId);
    if (!currentUser) {
      return NextResponse.json(
        {message: "User not found in DB"},
        {status: 404}
      );
    }

    await connectDB();

    const body = await request.json();
    const {question, selectedModelIds, threadId} = body || {};

    // 2. Validate input
    if (
      !question ||
      !Array.isArray(selectedModelIds) ||
      selectedModelIds.length === 0
    ) {
      return NextResponse.json(
        {message: "Dữ liệu không hợp lệ."},
        {status: 400}
      );
    }

    const finalThreadId =
      threadId && mongoose.Types.ObjectId.isValid(threadId)
        ? new mongoose.Types.ObjectId(threadId)
        : new mongoose.Types.ObjectId();

    const foundModels = await AIModel.find({
      modelId: {$in: selectedModelIds},
    }).lean();

    if (foundModels.length !== selectedModelIds.length) {
      return NextResponse.json(
        {message: "Một hoặc nhiều AI model không hợp lệ."},
        {status: 404}
      );
    }

    // 3. Lưu Question với thông tin user đã được xác thực
    const newQuestion = await Question.create({
      question: String(question),
      userId: currentUser.clerkId,
      username: currentUser.username,
      selectedModels: foundModels.map((m) => m._id),
      threadId: finalThreadId,
    });

    // 4. Gọi các model AI một cách an toàn với Promise.allSettled
    const aiPromises = foundModels.map((m) =>
      askOpenRouter(String(question), m.modelId)
    );
    const aiResponses = await Promise.allSettled(aiPromises);

    // 5. Chuẩn bị và lưu Answers với đầy đủ thông tin (sửa clerkId)
    const newAnswersData = aiResponses.map((response, idx) => {
      const baseAnswerData = {
        question: newQuestion._id,
        authorModel: foundModels[idx]._id,
        threadId: finalThreadId,
        clerkId: currentUser.clerkId, // SỬA: Đảm bảo khớp với schema Answer
        username: currentUser.username,
      };

      if (response.status === "fulfilled") {
        return {
          ...baseAnswerData,
          content: response.value || "Model không trả về phản hồi.",
          isError: false,
        };
      } else {
        return {
          ...baseAnswerData,
          content: `Lỗi từ model ${foundModels[idx].modelId}: ${
            response.reason?.message || "Không rõ"
          }`,
          isError: true,
        };
      }
    });

    const savedAnswers = await Answer.insertMany(newAnswersData);

    // 6. Populate và trả về dữ liệu cho Frontend
    const populatedAnswers = await Answer.find({
      _id: {$in: savedAnswers.map((a) => a._id)},
    })
      .populate({
        path: "authorModel",
        select: "modelId displayName",
      })
      .lean();

    return NextResponse.json(
      {
        ok: true,
        threadId: String(finalThreadId),
        question: JSON.parse(JSON.stringify(newQuestion)),
        answers: JSON.parse(JSON.stringify(populatedAnswers)),
      },
      {status: 201}
    );
  } catch (error: unknown) {
    console.error("Lỗi trong API /api/questions:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    ); // SỬA: Đóng ngoặc đúng
  }
}
