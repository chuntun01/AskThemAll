// app/api/test-db/route.js
import { NextResponse } from "next/server";
import mongoose from "mongoose";          // cần để đọc connection.readyState
import connectDB from "@/lib/db";
import User from "@/models/User";         // bạn đang đếm userCount → phải import User

export async function GET() {
  try {
    await connectDB();

    // ví dụ thao tác đơn giản với DB
    const userCount = await User.countDocuments({});

    return NextResponse.json(
      {
        message: "✅ Kết nối MongoDB OK",
        // 1 = connected, 2 = connecting, 0 = disconnected, 3 = disconnecting
        connectionState: mongoose.connection.readyState,
        userCount,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("test-db error:", err);
    return NextResponse.json(
      { message: "❌ Lỗi kết nối DB", error: String(err?.message || err) },
      { status: 500 }
    );
  }
}
