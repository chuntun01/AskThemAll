// app/api/questions/[questionId]/answers/route.js
import connectDB from "@/lib/db";
import Answer from "@/lib/models/Answer";
import Question from "@/lib/models/Question";
import { NextResponse } from "next/server";

// [POST]: Thêm câu trả lời cho câu hỏi có ID là [questionId]
export async function POST(request, { params }) {
  try {
    await connectDB();
    const { questionId } = params; // Lấy ID câu hỏi từ URL
    const body = await request.json();
    const { content, userId } = body; // Giả sử có ID người dùng đã đăng nhập

    if (!content || !userId) {
      return NextResponse.json(
        { message: "Thiếu thông tin cần thiết" },
        { status: 400 }
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
      $push: { answers: newAnswer._id },
    });

    return NextResponse.json(newAnswer, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Lỗi server", error: error.message },
      { status: 500 }
    );
  }
}
