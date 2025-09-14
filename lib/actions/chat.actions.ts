// lib/actions/chat.actions.ts
import connectDB from "../db"; // Import hàm kết nối DB của bạn
import ChatHistory from "../models/Question"; // Import model ChatHistory

/**
 * Lấy lịch sử chat của một người dùng cụ thể bằng clerkId
 * @param {string} clerkId - ID người dùng từ Clerk
 */
export async function getChatHistoryByUserId(clerkId: string) {
  try {
    await connectDB();
    // Tìm tất cả lịch sử có userId khớp và sắp xếp theo ngày cập nhật mới nhất
    const history = await ChatHistory.find({ userId: clerkId }).sort({
      createdAt: -1,
    });
    return JSON.parse(JSON.stringify(history));
  } catch (error) {
    console.error("Error getting chat history by user ID:", error);
    throw new Error("Could not get chat history from database.");
  }
}

/**
 * Lấy TOÀN BỘ lịch sử chat (chỉ dành cho Admin)
 */
export async function getAllChatHistory() {
  try {
    await connectDB();
    // Tìm tất cả lịch sử và sắp xếp theo ngày tạo mới nhất
    const history = await ChatHistory.find({}).sort({ createDate: -1 });
    return JSON.parse(JSON.stringify(history));
  } catch (error) {
    console.error("Error getting all chat history:", error);
    throw new Error("Could not get all chat history from database.");
  }
}
