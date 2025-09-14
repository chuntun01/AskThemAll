/* eslint-disable @typescript-eslint/no-unused-vars */
// File: app/api/models/route.js
import dbConnect from "@/lib/db";
import AIModel from "@/lib/models/AIModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const models = await AIModel.find({});
    return NextResponse.json(models, { status: 200 });
  } catch (error) {
    console.error("Error fetching AI models:", error);
    return NextResponse.json({ message: "Lỗi từ máy chủ." }, { status: 500 });
  }
}
