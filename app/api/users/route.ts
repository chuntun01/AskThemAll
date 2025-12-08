import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import {auth} from "@clerk/nextjs/server";
import {getUserByClerkId} from "@/lib/actions/userDb.action";

export const dynamic = "force-dynamic";

// [GET] /api/users - danh sách user
export async function GET() {
  try {
    await connectDB();

    const users = await User.find().sort({createdAt: -1}).lean();

    const result = users.map((u: any) => ({
      id: u._id.toString(),
      username: u.username,
      email: u.email,
      isAdmin: u.isAdmin,
      clerkId: u.clerkId,
    }));

    return NextResponse.json({users: result}, {status: 200});
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}

// [POST] /api/users - tạo user mới trong DB
export async function POST(request: NextRequest) {
  try {
    const {userId: clerkId} = await auth();
    if (!clerkId) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const currentUser = await getUserByClerkId(clerkId);
    if (!currentUser) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    // TODO: nếu có role admin thì check ở đây
    // if (currentUser.role !== "admin") { ... }

    await connectDB();

    const body = await request.json();
    const {username, email, role} = body || {};

    if (!username || !email) {
      return NextResponse.json(
        {message: "Thiếu username hoặc email"},
        {status: 400}
      );
    }

    const existed = await User.findOne({email});
    if (existed) {
      return NextResponse.json(
        {message: "Email đã tồn tại trong hệ thống"},
        {status: 409}
      );
    }

    const newUser = await User.create({
      username,
      email,
      role: role || "user",
      // Không đụng tới clerkId ở đây, vì account Clerk do Clerk quản lý
    });

    return NextResponse.json(
      {
        id: newUser._id.toString(),
        username: newUser.username,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
      },
      {status: 201}
    );
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}
