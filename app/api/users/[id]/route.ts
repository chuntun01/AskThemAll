import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import {auth} from "@clerk/nextjs/server";
import {getUserByClerkId} from "@/lib/actions/userDb.action";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, {params}: {params: {id: string}}) {
  try {
    await connectDB();

    const user = await User.findById(params.id).lean();
    if (!user) {
      return NextResponse.json({message: "Không tìm thấy user"}, {status: 404});
    }

    return NextResponse.json(
      {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        clerkId: user.clerkId,
      },
      {status: 200}
    );
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}

export async function PATCH(
  request: NextRequest,
  {params}: {params: {id: string}}
) {
  try {
    const {userId: clerkId} = await auth();
    if (!clerkId) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const currentUser = await getUserByClerkId(clerkId);
    if (!currentUser) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    await connectDB();

    const body = await request.json();
    const {username, email, role} = body || {};

    const updateData: any = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (role !== undefined) updateData.role = role;

    const updated = await User.findByIdAndUpdate(
      params.id,
      {$set: updateData},
      {new: true}
    );

    if (!updated) {
      return NextResponse.json({message: "Không tìm thấy user"}, {status: 404});
    }

    return NextResponse.json(
      {
        id: updated._id.toString(),
        username: updated.username,
        email: updated.email,
        isAdmin: updated.isAdmin,
        clerkId: updated.clerkId,
      },
      {status: 200}
    );
  } catch (error) {
    console.error("PATCH /api/users/[id] error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  {params}: {params: {id: string}}
) {
  try {
    const {userId: clerkId} = await auth();
    if (!clerkId) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const currentUser = await getUserByClerkId(clerkId);
    if (!currentUser) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    await connectDB();

    const deleted = await User.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json({message: "Không tìm thấy user"}, {status: 404});
    }

    return NextResponse.json({message: "Xoá user thành công"}, {status: 200});
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}
