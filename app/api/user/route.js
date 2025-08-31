// app/api/users/route.js
import dbConnect from "@/lib/db";
import User from "@/lib/models/User"; // <-- Import từ vị trí mới
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  const users = await User.find({});
  return NextResponse.json(users);
}
