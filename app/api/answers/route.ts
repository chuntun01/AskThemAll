// File: app/api/answers/route.ts (Hoặc đổi tên cho đúng, ví dụ: app/api/models/route.ts)

import dbConnect from "@/lib/db";
import AIModel from "@/lib/models/AIModel";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    await dbConnect();

    const models = await AIModel.find({});

    return NextResponse.json(models, { status: 200 });
  } catch (error) {
    console.error("Error fetching AI models:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
