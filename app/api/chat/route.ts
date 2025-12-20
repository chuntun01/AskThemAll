import {NextRequest, NextResponse} from "next/server";
import mongoose from "mongoose";
import {auth} from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Conversation from "@/lib/models/Conversation";
import ConversationMessage from "@/lib/models/ConversationMessage";
import {askOpenRouterChat} from "@/lib/services/aiService";
import User from "@/lib/models/User";

export const dynamic = "force-dynamic";

function buildTitleFromQuestion(q: string) {
  const s = q.trim().replace(/\s+/g, " ");
  return s.length <= 60 ? s : s.slice(0, 60) + "…";
}

const HISTORY_LIMIT = 40; // số message gần nhất cho mỗi model

export async function POST(req: NextRequest) {
  const {userId} = await auth();
  const effectiveUserId = userId ?? "guest";
    if (!userId)
      return NextResponse.json({message: "Unauthorized"}, {status: 401});

  await connectDB();

  const exists = await User.exists({clerkId: userId});
  if (!exists) {
    return NextResponse.json(
      {message: "Account does not exist or has been deleted."},
      {status: 403}
    );
  }

  const body = await req.json().catch(() => ({}));
  const question = String(body?.question ?? "").trim();
  const modelIds: string[] = Array.isArray(body?.modelIds) ? body.modelIds : [];
  const threadId: string | null = body?.threadId ?? null;

  if (!question)
    return NextResponse.json({message: "question is required"}, {status: 400});
  if (modelIds.length === 0)
    return NextResponse.json({message: "modelIds is required"}, {status: 400});

  // 1) ensure conversation
  let convo: any = null;

  if (threadId && mongoose.Types.ObjectId.isValid(threadId)) {
    // ✅ đúng: lấy lại conversation theo threadId
    convo = await Conversation.findById(threadId);
    if (!convo) {
      return NextResponse.json(
        {message: "Conversation not found"},
        {status: 404}
      );
    }

    // ✅ optional: nếu muốn khóa theo owner (khi bạn quay lại private mode)
    // if (String(convo.userId) !== effectiveUserId) return 403;
  } else {
    // ✅ tạo mới khi KHÔNG có threadId
    convo = await Conversation.create({
      userId: effectiveUserId,
      title: buildTitleFromQuestion(question),
      lastMessageAt: new Date(),
    });
  }

  // 2) save user message
  const userMsg = await ConversationMessage.create({
    conversationId: convo._id,
    role: "user",
    content: question,
    modelId: null,
  });

  // 3) per-model context + call + save assistant
  const results = await Promise.allSettled(
    modelIds.map(async (modelId) => {
      // lấy lịch sử trước message hiện tại
      const history = await ConversationMessage.find({
        conversationId: convo._id,
        $or: [{role: "user"}, {role: "assistant", modelId}],
        // loại trừ user message mới để tránh double + đảm bảo thứ tự logic
        _id: {$ne: userMsg._id},
      })
        .sort({createdAt: 1})
        .lean();

      const trimmed = history.slice(
        Math.max(0, history.length - (HISTORY_LIMIT - 1))
      );

      const messages = trimmed.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      }));

      // append prompt hiện tại vào cuối
      messages.push({role: "user", content: question});

      const content = await askOpenRouterChat(messages, modelId);

      const saved = await ConversationMessage.create({
        conversationId: convo._id,
        role: "assistant",
        content: content || "Model không trả về phản hồi.",
        modelId,
      });

      return {modelId, messageId: String(saved._id), content: saved.content};
    })
  );

  const assistant = results.map((r, idx) => {
    const modelId = modelIds[idx];
    if (r.status === "fulfilled") return {...r.value, error: null};
    return {
      modelId,
      messageId: null,
      content: "",
      error: r.reason instanceof Error ? r.reason.message : String(r.reason),
    };
  });

  // 4) update convo timestamp
  convo.lastMessageAt = new Date();
  await convo.save();

  return NextResponse.json(
    {
      threadId: String(convo._id),
      user: {messageId: String(userMsg._id), content: userMsg.content},
      assistant,
    },
    {status: 200}
  );
}
