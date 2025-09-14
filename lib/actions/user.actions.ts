// lib/actions/user.actions.ts
import mongoose from "mongoose";
import User from "../models/User";
import connectDB from "../db"; // 👈 Import hàm kết nối từ file chuyên dụng

// Định nghĩa kiểu dữ liệu cho userData
interface UserData {
  clerkId: string;
  email: string;
  username: string;
  avatarUrl: string;
  role: string;
}

// Hàm tạo hoặc cập nhật người dùng (Upsert)
export async function upsertUser(userData: UserData) {
  try {
    await connectDB(); // Sử dụng hàm connectDB được import
    const updatedUser = await User.findOneAndUpdate(
      { clerkId: userData.clerkId },
      userData,
      { new: true, upsert: true }
    );
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.error("Error upserting user:", error);
    throw new Error("Could not upsert user in database.");
  }
}

// Hàm lấy người dùng bằng Clerk ID
export async function getUserByClerkId(clerkId: string) {
  try {
    await connectDB(); // Sử dụng hàm connectDB được import
    const user = await User.findOne({ clerkId: clerkId });
    if (!user) {
      return null;
    }
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Error getting user by Clerk ID:", error);
    throw new Error("Could not get user from database.");
  }
}

// Hàm lấy tất cả người dùng (dành cho admin)
export async function getAllUsers() {
  try {
    await connectDB(); // Sử dụng hàm connectDB được import
    const users = await User.find({}).select("-__v");
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Error getting all users:", error);
    throw new Error("Could not get all users from database.");
  }
}
