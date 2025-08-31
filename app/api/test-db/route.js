// app/api/test-db/route.js

import mongoose from 'mongoose'; // <--- LỖI LÀ DO THIẾU DÒNG NÀY
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Gọi hàm kết nối DB
    await connectDB();

    // Thử một thao tác đơn giản với database, ví dụ: đếm số lượng users
    const userCount = await User.countDocuments();

    // Nếu mọi thứ thành công
    return NextResponse.json(
      {
        message: '✅ Chúc mừng! Kết nối Database thành công!',
        // Lấy trạng thái kết nối từ mongoose đã import
        // 1 = connected, 2 = connecting, 3 = disconnecting
        connectionState: mongoose.connection.readyState,
        userCount: userCount,
      },
      { status: 200 }
    );
  } catch (error) {
    // In ra lỗi chi tiết trong terminal để chẩn đoán
    console.error('--- CHI TIẾT LỖI KẾT NỐI DATABASE ---', error);

    return NextResponse.json(
      {
        message: '❌ Vẫn còn lỗi kết nối Database.',
        errorName: error.name,
        errorMessage: error.message,
      },
      { status: 500 }
    );
  }
}