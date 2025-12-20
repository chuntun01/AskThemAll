import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Conversation from "@/lib/models/Conversation";
import {isAdminUser} from "@/lib/auth/isAdmin";
import {clerkClient} from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const {userId} = await auth();
  if (!userId)
    return NextResponse.json({message: "Unauthorized"}, {status: 401});

  await connectDB();
  const admin = await isAdminUser(userId);

  const filter = admin ? {} : {userId};

  const conversations = await Conversation.find(filter)
    .sort({lastMessageAt: -1})
    .limit(100)
    .lean();

  let ownerMap = new Map<string, {name: string; email: string | null}>();

  if (admin) {
    const ownerIds = Array.from(
      new Set(conversations.map((c) => String(c.userId)).filter(Boolean))
    );

    // Option 1: getUserList (nếu version Clerk của bạn hỗ trợ)
    try {
      const client = await clerkClient();
      const users = await client.users.getUserList({userId: ownerIds});
      for (const u of users.data) {
        const email =
          u.emailAddresses?.find((e: any) => e.id === u.primaryEmailAddressId)
            ?.emailAddress ??
          u.emailAddresses?.[0]?.emailAddress ??
          null;
        const name =
          [u.firstName, u.lastName].filter(Boolean).join(" ") ||
          u.username ||
          u.id;
        ownerMap.set(u.id, {name, email});
      }
    } catch (e) {
      console.warn("clerk getUserList failed, fallback to getUser:", e);
      // Option 2 fallback: gọi từng user (chậm hơn nhưng chắc)
      const client = await clerkClient();
      const settled = await Promise.allSettled(
        ownerIds.map((id) => client.users.getUser(id))
      );
      for (const s of settled) {
        if (s.status !== "fulfilled") continue;
        const u: any = s.value;
        const email =
          u.emailAddresses?.find((e: any) => e.id === u.primaryEmailAddressId)
            ?.emailAddress ??
          u.emailAddresses?.[0]?.emailAddress ??
          null;
        const name =
          [u.firstName, u.lastName].filter(Boolean).join(" ") ||
          u.username ||
          u.id;
        ownerMap.set(u.id, {name, email});
      }
    }
  }

  return NextResponse.json(
    {
      conversations: conversations.map((c: any) => {
        const ownerId = String(c.userId);
        const owner = ownerMap.get(ownerId);

        return {
          id: String(c._id),
          title: c.title,
          lastMessageAt: c.lastMessageAt
            ? new Date(c.lastMessageAt).toISOString()
            : null,
          createdAt: c.createdAt ? new Date(c.createdAt).toISOString() : null,
          ownerUserId: ownerId,
          ownerName: owner?.name ?? null,
          ownerEmail: owner?.email ?? null,
        };
      }),
    },
    {status: 200}
  );
}
