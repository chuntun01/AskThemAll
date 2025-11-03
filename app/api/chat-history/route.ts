// app/api/chat-history/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  getChatHistoryByUserId,
  getAllChatHistory,
} from "@/lib/actions/chat.actions";
import { getUserByClerkId } from "@/lib/actions/user.actions"; // Import hàm kiểm tra user

export async function GET() {
  try {
    const { userId: clerkID } = await auth();
    if (!clerkID) {
      console.error("Authorization failed: clerkID is null.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Lấy thông tin user từ DB để kiểm tra role
    const currentUser = await getUserByClerkId(clerkID);

    let history;
    if (currentUser?.role === "admin") {
      // Nếu là admin, lấy toàn bộ lịch sử
      history = await getAllChatHistory();
    } else {
      // Nếu là member, chỉ lấy lịch sử của chính họ
      history = await getChatHistoryByUserId(clerkID);
    }

    // Trả về dữ liệu dưới dạng mảng `HistoryItem[]` mà NavMenu đang mong đợi
    // Giả sử mỗi item trong history có trường 'id', 'name', 'updatedAt'
    const formattedHistory = history.map(
      (item: {
        createDate: string | number | Date;
        _id: { toString: () => Error };
        question: Error;
        updatedAt: string | number | Date;
      }) => ({
        id: item._id.toString(),
        name: item.question, // Giả sử tiêu đề cuộc trò chuyện nằm trong trường 'title'
        href: `/chat/${item._id}`,
        createDate: new Date(item.createDate).getTime(),
      })
    );

    return NextResponse.json(formattedHistory); // Trả về dữ liệu đã được định dạng
  } catch (error) {
    console.error("API /chat-history Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
