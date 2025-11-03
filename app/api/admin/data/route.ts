// app/api/admin/data/route.ts

import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserByClerkId } from "@/lib/actions/user.actions";

export async function GET() {
  try {
    // 1. Lấy userId của người dùng đang đăng nhập từ Clerk

    const { userId: clerkId } = await auth();

    if (!clerkId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 2. Dùng clerkId để lấy thông tin user TỪ DATABASE CỦA BẠN
    const userFromDb = await getUserByClerkId(clerkId);

    if (!userFromDb) {
      return NextResponse.json(
        { message: "User not found in DB" },
        { status: 404 }
      );
    }

    // 3. KIỂM TRA ROLE TỪ DATABASE
    if (userFromDb.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admins only" },
        { status: 403 }
      );
    }

    // 4. Nếu là admin, thực hiện hành động và trả về dữ liệu
    const adminData = {
      message: "Bạn không có quyền truy cập chức năng này!.",
    };
    return NextResponse.json({ success: true, data: adminData });
  } catch (error) {
    console.error("Admin route error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
