import connectDB from "@/lib/db";
import AIModel from "@/lib/models/AIModel";
import { NextResponse } from "next/server";

// Đảm bảo hàm có đúng cấu trúc (request, { params })
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { modelId } = params;
    const decodedModelId = decodeURIComponent(modelId);
    const model = await AIModel.findOne({ modelId: decodedModelId });

    if (!model) {
      return NextResponse.json(
        { message: "Không tìm thấy model." },
        { status: 404 }
      );
    }
    return NextResponse.json(model, { status: 200 });
  } catch (error) {
    console.error(`Error fetching model ${params.modelId}:`, error);
    return NextResponse.json({ message: "Lỗi từ máy chủ." }, { status: 500 });
  }
}
