// lib/actions/answer.actions.js
import connectToDatabase from '../db';
import Answer from '../models/Answer.js'; 

/**
 * Lấy lịch sử câu trả lời của một người dùng cụ thể bằng clerkId
 * @param {string} clerkId - ID người dùng từ Clerk
 */
export async function getAnswersByUserId(clerkId) {
  try {
    await connectToDatabase();
    // Tìm tất cả câu trả lời có userId khớp và sắp xếp theo ngày tạo mới nhất
    const answers = await Answer.find({ userId: clerkId }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(answers));
  } catch (error) {
    console.error("Error getting answers by user ID:", error);
    throw new Error("Could not get answers from database.");
  }
}