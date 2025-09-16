import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  getChatHistoryByUserId,
  getAllChatHistory,
} from "@/lib/actions/chat.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions";
import mongoose from "mongoose";

interface ChatHistoryItem {
  _id: mongoose.Types.ObjectId;
  question: string;
  createDate: Date;
  updatedAt: Date;
  // Thêm các trường khác nếu cần (e.g., userId, threadId)
}

interface FormattedHistoryItem {
  id: string;
  name: string;
  href: string;
  createDate: number; // Timestamp
}

export async function GET() {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      console.error("Authorization failed: clerkId is null.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Lấy thông tin user từ DB để kiểm tra role
    const currentUser = await getUserByClerkId(clerkId);

    let history: ChatHistoryItem[];
    if (currentUser?.role === "admin") {
      // Nếu là admin, lấy toàn bộ lịch sử
      history = (await getAllChatHistory()) || [];
    } else {
      // Nếu là member, chỉ lấy lịch sử của chính họ
      history = (await getChatHistoryByUserId(clerkId)) || [];
    }

    // Định dạng dữ liệu cho Frontend
    const formattedHistory: FormattedHistoryItem[] = history.map((item) => ({
      id: item._id.toString(),
      name: item.question || "No title", // Fallback nếu question null
      href: `/chat/${item._id.toString()}`, // Đảm bảo _id hợp lệ
      createDate: new Date(item.createDate).getTime(), // Chuyển thành timestamp
    }));

    return NextResponse.json(formattedHistory); // Trả về mảng đã định dạng
  } catch (error: Error) {
    // SỬA: Type Error thay any
    console.error("API /chat-history Error:", error.stack); // Thêm stack trace
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
