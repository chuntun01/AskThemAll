// app/api/user-answers/route.js
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getAnswersByUserId } from "@/lib/actions/answer.actions";

export async function GET(request) {
  try {
    // Lấy userId của người dùng đang đăng nhập
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Dùng userId để lấy lịch sử câu trả lời của chính họ
    const answers = await getAnswersByUserId(userId);
    return NextResponse.json({ success: true, answers: answers });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
