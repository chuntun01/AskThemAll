import {NextRequest, NextResponse} from "next/server";
import mongoose from "mongoose";
import {auth} from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Conversation from "@/lib/models/Conversation";
import ConversationMessage from "@/lib/models/ConversationMessage";
import {isAdminUser} from "@/lib/auth/isAdmin";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, ctx: {params: {id: string}}) {
  const {userId} = await auth();
  if (!userId)
    return NextResponse.json({message: "Unauthorized"}, {status: 401});

  const {id} = ctx.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({message: "Invalid id"}, {status: 400});
  }

  await connectDB();

  const admin = await isAdminUser(userId);
  
  const convo = admin
    ? await Conversation.findById(id).lean()
    : await Conversation.findOne({_id: id, userId}).lean();

  if (!convo) return NextResponse.json({message: "Not found"}, {status: 404});

  const messages = await ConversationMessage.find({conversationId: id})
    .sort({createdAt: 1})
    .lean();

  return NextResponse.json(
    {
      conversation: {id: String(convo._id), title: convo.title},
      messages: messages.map((m) => ({
        id: String(m._id),
        role: m.role,
        content: m.content,
        modelId: m.modelId ?? null,
        createdAt: m.createdAt,
      })),
    },
    {status: 200}
  );
}
export async function DELETE(_req: NextRequest, ctx: {params: {id: string}}) {
  const {userId} = await auth();
  if (!userId)
    return NextResponse.json({message: "Unauthorized"}, {status: 401});

  const {id} = ctx.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({message: "Invalid id"}, {status: 400});
  }

  await connectDB();

  // Chỉ cho phép xoá conversation của chính user
  const convo = await Conversation.findOne({_id: id, userId}).lean();
  if (!convo) return NextResponse.json({message: "Not found"}, {status: 404});

  // Xoá tất cả messages trước (hoặc sau đều được)
  await ConversationMessage.deleteMany({conversationId: id});
  await Conversation.deleteOne({_id: id});

  return NextResponse.json({ok: true}, {status: 200});
}
export async function PATCH(req: NextRequest, ctx: {params: {id: string}}) {
  const {userId} = await auth();
  if (!userId)
    return NextResponse.json({message: "Unauthorized"}, {status: 401});

  const {id} = ctx.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({message: "Invalid id"}, {status: 400});
  }

  const body = await req.json().catch(() => ({}));
  const title = String(body?.title ?? "").trim();

  if (!title) {
    return NextResponse.json({message: "title is required"}, {status: 400});
  }
  if (title.length > 120) {
    return NextResponse.json(
      {message: "title too long (max 120)"},
      {status: 400}
    );
  }

  await connectDB();

  // chỉ cho phép sửa title của conversation thuộc user hiện tại
  const updated = await Conversation.findOneAndUpdate(
    {_id: id, userId},
    {$set: {title}},
    {new: true}
  ).lean();

  if (!updated) return NextResponse.json({message: "Not found"}, {status: 404});

  return NextResponse.json(
    {ok: true, conversation: {id: String(updated._id), title: updated.title}},
    {status: 200}
  );
}
