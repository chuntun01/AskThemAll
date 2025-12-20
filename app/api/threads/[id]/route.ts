import { NextResponse, type NextRequest } from "next/server";
import mongoose from "mongoose";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Thread from "@/lib/models/Thread";
import ThreadMessage from "@/lib/models/ThreadMessage";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = ctx.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return NextResponse.json({ message: "Invalid id" }, { status: 400 });

  await connectDB();
  const thread = await Thread.findOne({ _id: id, userId: clerkId }).lean();
  if (!thread) return NextResponse.json({ message: "Thread not found" }, { status: 404 });

  const messages = await ThreadMessage.find({ threadId: id })
    .sort({ createdAt: 1 })
    .lean();

  return NextResponse.json({
    ok: true,
    thread: {
      threadId: String(thread._id),
      title: thread.title,
      selectedModelIds: thread.selectedModelIds ?? [],
      updatedAt: thread.updatedAt,
    },
    messages: messages.map((m) => ({
      id: String(m._id),
      role: m.role,
      modelId: m.modelId ?? null,
      content: m.content,
      turn: m.turn,
      createdAt: m.createdAt,
    })),
  });
}
