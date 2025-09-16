import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { upsertUser } from "@/lib/actions/user.actions";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error("Missing CLERK_WEBHOOK_SECRET");
  }

  // Await headers() một lần
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", { status: 400 });
  }

  // Đọc REQUEST DƯỚI DẠNG VĂN BẢN THÔ
  const payload = await req.text();

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    // Xác thực payload thô
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Webhook verification failed:", errorMessage);
    return new Response(`Webhook verification failed: ${errorMessage}`, {
      status: 400,
    });
  }

  const eventType = evt.type;
  console.log(`✅ Webhook received: ${eventType}`);

  if (eventType === "user.created") {
    const { id, email_addresses, image_url, username } = evt.data;

    // Kiểm tra email
    if (
      !email_addresses ||
      email_addresses.length === 0 ||
      !email_addresses[0].email_address
    ) {
      console.warn(`Webhook ignored: User ${id} has no valid email address.`);
      return NextResponse.json({
        success: true,
        message: "Webhook ignored, no valid email.",
      });
    }

    const userData = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username || id,
      avatarUrl: image_url,
      role: "member",
    };

    try {
      const updatedUser = await upsertUser(userData);
      console.log(
        `✨ User ${updatedUser.username} was successfully saved to DB.`
      );
      return NextResponse.json(
        { success: true, user: updatedUser },
        { status: 201 }
      );
    } catch (error) {
      console.error("❌ DB Error:", error.message);
      return NextResponse.json(
        { success: false, message: "Database error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ success: true, message: "Event not handled" });
}
