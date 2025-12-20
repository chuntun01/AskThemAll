import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/lib/models/User";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/actions/userDb.action";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const { userId: requesterClerkId } = await auth();
  if (!requesterClerkId) {
    return { ok: false as const, res: NextResponse.json({ message: "Unauthorized" }, { status: 401 }) };
  }

  // requester must exist in DB
  const currentUser = await getUserByClerkId(requesterClerkId);
  if (!currentUser) {
    return {
      ok: false as const,
      res: NextResponse.json(
        { message: "Account does not exist or has been deleted." },
        { status: 403 }
      ),
    };
  }

  if (currentUser.isAdmin !== true) {
    return { ok: false as const, res: NextResponse.json({ message: "Forbidden" }, { status: 403 }) };
  }

  return { ok: true as const, requesterClerkId, currentUser };
}

export async function GET(_req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    await connectDB();

    const user = await User.findById(id).lean();
    if (!user) {
      return NextResponse.json({ message: "Không tìm thấy user" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: String((user as any)._id),
        username: (user as any).username,
        email: (user as any).email,
        isAdmin: (user as any).isAdmin === true,
        clerkId: (user as any).clerkId ?? null,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Lỗi server", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    await connectDB();

    const body = await request.json().catch(() => ({}));
    const { username, email, isAdmin } = body || {};

    const updateData: Record<string, any> = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (isAdmin !== undefined) updateData.isAdmin = isAdmin;

    const updated = await User.findByIdAndUpdate(id, { $set: updateData }, { new: true }).lean();

    if (!updated) {
      return NextResponse.json({ message: "Không tìm thấy user" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: String((updated as any)._id),
        username: (updated as any).username,
        email: (updated as any).email,
        clerkId: (updated as any).clerkId ?? null,
        isAdmin: (updated as any).isAdmin === true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Lỗi server", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  try {
    const { id } = await ctx.params;

    const guard = await requireAdmin();
    if (!guard.ok) return guard.res;

    await connectDB();

    // 1) find target in DB
    const target = await User.findById(id).lean();
    if (!target) {
      return NextResponse.json({ message: "Không tìm thấy user" }, { status: 404 });
    }

    const targetClerkId = String((target as any).clerkId ?? "");
    if (!targetClerkId) {
      // thiếu clerkId => chỉ xoá DB
      await User.deleteOne({ _id: id });
      return NextResponse.json(
        { message: "Xoá user DB thành công, nhưng thiếu clerkId nên không xoá được trên Clerk." },
        { status: 200 }
      );
    }

    // không cho admin tự xoá chính mình
    if (targetClerkId === guard.requesterClerkId) {
      return NextResponse.json(
        { message: "Không thể xoá chính tài khoản đang đăng nhập." },
        { status: 400 }
      );
    }

    // 2) delete on Clerk FIRST
    const client = await clerkClient();
    try {
      await client.users.deleteUser(targetClerkId);
    } catch (e: any) {
      // 404 => user Clerk đã không tồn tại, vẫn tiếp tục xoá DB
      const status = e?.status ?? e?.statusCode;
      if (status !== 404) {
        console.error("Clerk deleteUser failed:", e);
        return NextResponse.json(
          { message: "Xoá trên Clerk thất bại, chưa xoá trong DB." },
          { status: 502 }
        );
      }
      console.warn("Clerk user not found (404), continue deleting DB user:", targetClerkId);
    }

    // 3) delete in DB
    await User.deleteOne({ _id: id });

    return NextResponse.json({ message: "Xoá user thành công" }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/users/[id] error:", error);
    return NextResponse.json(
      { message: "Lỗi server", error: (error as Error).message },
      { status: 500 }
    );
  }
}
