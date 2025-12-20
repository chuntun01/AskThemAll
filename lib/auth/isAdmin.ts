// lib/auth/isAdmin.ts
import connectDB from "@/lib/db";
import User from "@/lib/models/User"; // model bạn đang dùng để lưu isAdmin theo clerkId

export async function isAdminUser(clerkUserId: string): Promise<boolean> {
  await connectDB();
  const u = await User.findOne({ clerkId: clerkUserId }).lean();
  return u?.isAdmin === true;
}
