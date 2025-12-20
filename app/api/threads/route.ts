import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Thread from "@/lib/models/Thread";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();
  const threads = await Thread.find({ userId: clerkId })
    .sort({ updatedAt: -1 })
    .limit(50)
    .lean();

  return NextResponse.json({
    ok: true,
    threads: threads.map((t) => ({
      threadId: String(t._id),
      title: t.title || "Untitled",
      updatedAt: t.updatedAt,
      selectedModelIds: t.selectedModelIds ?? [],
    })),
  });
}
