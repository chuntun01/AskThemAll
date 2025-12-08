// app/api/questions/[questionId]/answers/route.js
import connectDB from "@/lib/db";
import Answer from "@/lib/models/Answer";
import Question from "@/lib/models/Question";
import {NextResponse} from "next/server";

/**
 * @swagger
 * /api/questions/{questionId}/answers:
 *   post:
 *     tags: [Answers]
 *     summary: Tạo câu trả lời mới cho một câu hỏi
 *     description: Thêm câu trả lời cho câu hỏi có ID được cung cấp và cập nhật lại danh sách answers của câu hỏi đó.
 *     parameters:
 *       - in: path
 *         name: questionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của câu hỏi cần trả lời
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - userId
 *             properties:
 *               content:
 *                 type: string
 *                 example: "Mình nghĩ SEO Onpage gồm các bước tối ưu title, meta description, heading, internal link..."
 *               userId:
 *                 type: string
 *                 example: "user_123456"
 *     responses:
 *       201:
 *         description: Tạo câu trả lời thành công
 *       400:
 *         description: Thiếu thông tin cần thiết
 *       500:
 *         description: Lỗi server
 */

// [POST]: Thêm câu trả lời cho câu hỏi có ID là [questionId]
export async function POST(request, {params}) {
  try {
    await connectDB();
    const {questionId} = params; // Lấy ID câu hỏi từ URL
    const body = await request.json();
    const {content, userId} = body; // Giả sử có ID người dùng đã đăng nhập

    if (!content || !userId) {
      return NextResponse.json(
        {message: "Thiếu thông tin cần thiết"},
        {status: 400}
      );
    }

    // 1. Tạo câu trả lời mới
    const newAnswer = await Answer.create({
      content,
      author: userId,
      question: questionId,
    });

    // 2. Cập nhật câu hỏi, thêm ID của câu trả lời mới vào mảng 'answers'
    await Question.findByIdAndUpdate(questionId, {
      $push: {answers: newAnswer._id},
    });

    return NextResponse.json(newAnswer, {status: 201});
  } catch (error) {
    return NextResponse.json(
      {message: "Lỗi server", error: error.message},
      {status: 500}
    );
  }
}
