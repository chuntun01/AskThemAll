// lib/db/index.js

import mongoose from "mongoose";

// Note: Lấy chuỗi kết nối từ file .env. Đây là cách an toàn để quản lý các biến bí mật.
const MONGODB_URI = process.env.MONGODB_URI;

// Note: Kiểm tra xem MONGODB_URI có tồn tại không. Nếu không, dừng ứng dụng ngay lập tức
// để tránh các lỗi không mong muốn về sau. Đây là một "fail-fast check".
if (!MONGODB_URI) {
  throw new Error(
    "Vui lòng định nghĩa biến MONGODB_URI trong file .env của bạn"
  );
}

/**
 * Note: Trong môi trường serverless, code có thể chạy lại nhiều lần.
 * Chúng ta cần một nơi để lưu trữ kết nối database giữa các lần chạy đó.
 * `global` là một đối tượng đặc biệt trong Node.js không bị ảnh hưởng bởi
 * "hot-reloading", do đó nó là nơi lý tưởng để lưu cache kết nối.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // --- BƯỚC 1: KIỂM TRA KẾT NỐI CÓ SẴN TRONG CACHE ---
  // Note: Nếu đã có kết nối được thiết lập trước đó, hãy sử dụng lại nó ngay lập tức.
  // Đây là phần quan trọng nhất giúp tối ưu hiệu suất và tránh tạo quá nhiều kết nối tới DB.
  if (cached.conn) {
    console.log("🚀 Using cached database connection");
    return cached.conn;
  }

  // --- BƯỚC 2: NẾU CHƯA CÓ KẾT NỐI, TẠO MỘT KẾT NỐI MỚI ---
  // Note: Chúng ta cache lại "lời hứa" (promise) của việc kết nối.
  // Điều này ngăn chặn việc nhiều yêu cầu API cùng lúc cố gắng tạo kết nối mới (race condition).
  // Yêu cầu đầu tiên sẽ tạo promise, các yêu cầu sau sẽ chờ promise đó hoàn thành.
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Tắt buffer để lỗi kết nối sẽ hiện ra ngay lập tức
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log("✅ New database connection established");
        return mongooseInstance;
      });
  }

  // --- BƯỚC 3: CHỜ KẾT NỐI HOÀN TẤT VÀ XỬ LÝ LỖI ---
  // Note: Chờ cho "lời hứa" kết nối ở trên hoàn tất và gán kết quả vào cache.conn.
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // Note: Nếu kết nối thất bại (sai mật khẩu, lỗi IP,...), hãy xóa promise đã cache
    // để yêu cầu tiếp theo có thể thử kết nối lại.
    cached.promise = null;
    throw e;
  }

  // Note: Trả về kết nối đã hoàn tất.
  return cached.conn;
}

export default connectDB;
