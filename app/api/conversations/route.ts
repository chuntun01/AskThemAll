import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Conversation from "@/lib/models/Conversation";
import ConversationMessage from "@/lib/models/ConversationMessage";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  await connectDB();

  const conversations = await Conversation.find({ userId })
    .sort({ lastMessageAt: -1 })
    .limit(50)
    .lean();

  return NextResponse.json(
    {
      conversations: conversations.map((c) => ({
        id: String(c._id),
        title: c.title,
        lastMessageAt: c.lastMessageAt,
        createdAt: c.createdAt,
      })),
    },
    { status: 200 }
  );
}

