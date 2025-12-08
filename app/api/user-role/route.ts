// app/api/user-role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/lib/actions/userDb.action";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { userId } = getAuth(req);

    // Không trả 401 nữa, luôn 200 để client dễ xử lý
    if (!userId) {
      return NextResponse.json(
        {
          isAdmin: false,
          message: "Unauthenticated",
        },
        { status: 200 }
      );
    }

    const user = await getUserByClerkId(userId);

    if (!user) {
      return NextResponse.json(
        {
          isAdmin: false,
          message: "User not found in DB",
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      {
        isAdmin: !!user.isAdmin,
        username: user.username,
        email: user.email,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("API /user-role error:", err);
    return NextResponse.json(
      {
        isAdmin: false,
        message: "Server error",
      },
      { status: 200 }
    );
  }
}
