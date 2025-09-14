/* eslint-disable @typescript-eslint/no-unused-vars */
// app/api/users/route.ts
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUserByClerkId, getAllUsers } from "@/lib/actions/user.actions";

export const dynamic = "force-dynamic";

export async function GET() {
  console.log("--- DEBUGGING /api/users ---");
  const secretKey = process.env.CLERK_SECRET_KEY;
  console.log(
    "CLERK_SECRET_KEY loaded:",
    secretKey ? `Found, starting with sk_...` : "!!! NOT FOUND !!!"
  );
  console.log("--------------------------");

  try {
    // Lấy thông tin người dùng đã xác thực từ Clerk
    const { userId: clerkID } = await auth();
    if (!clerkID) {
      console.error("Authorization failed: clerkID is null.");
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const currentUser = await getUserByClerkId(clerkID);
    if (!currentUser) {
      return NextResponse.json(
        { message: "User not found in database" },
        { status: 404 }
      );
    }

    if (currentUser.role === "admin") {
      const allUsers = await getAllUsers();
      return NextResponse.json({ success: true, users: allUsers });
    } else {
      return NextResponse.json({ success: true, users: [currentUser] });
    }
  } catch (error) {
    console.error("API /api/users Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
