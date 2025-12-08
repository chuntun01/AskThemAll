// app/api/aimodels/route.ts
import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import AIModel from "@/lib/models/AIModel";
import {auth} from "@clerk/nextjs/server";
import {getUserByClerkId} from "@/lib/actions/userDb.action";

export const dynamic = "force-dynamic";

// [GET] /api/aimodels - lấy danh sách model
export async function GET() {
  try {
    await connectDB();

    const models = await AIModel.find().sort({createdAt: -1}).lean();

    const result = models.map((m: any) => ({
      id: m._id.toString(),
      modelId: m.modelId,
      displayName: m.displayName,
      provider: m.provider ?? "",
      isFree: m.isFree ?? false,
    }));

    return NextResponse.json({aimodels: result}, {status: 200});
  } catch (error) {
    console.error("GET /api/aimodels error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}

// [POST] /api/aimodels - thêm model mới
export async function POST(request: NextRequest) {
  try {
    // 1. Xác thực (nếu chưa cần có thể comment block auth này lại để test)
    const {userId: clerkId} = await auth();
    if (!clerkId) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }

    const currentUser = await getUserByClerkId(clerkId);
    if (!currentUser) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    await connectDB();

    const body = await request.json();
    const {modelId, displayName, provider, isFree = false} = body || {};

    if (!modelId || !displayName) {
      return NextResponse.json(
        {message: "Thiếu modelId hoặc displayName"},
        {status: 400}
      );
    }

    // 2. Check trùng modelId
    const existed = await AIModel.findOne({modelId});
    if (existed) {
      return NextResponse.json({message: "ModelId đã tồn tại"}, {status: 409});
    }

    // 3. Tạo mới
    const newModel = await AIModel.create({
      modelId,
      displayName,
      provider,
      isFree,
      createdBy: currentUser.clerkId ?? null,
    });

    // trả về đúng object để FE dùng luôn
    return NextResponse.json(
      {
        id: newModel._id.toString(),
        modelId: newModel.modelId,
        displayName: newModel.displayName,
        provider: newModel.provider,
        isFree: newModel.isFree,
      },
      {status: 201}
    );
  } catch (error) {
    console.error("POST /api/aimodels error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}
