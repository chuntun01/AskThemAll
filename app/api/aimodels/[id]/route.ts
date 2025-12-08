// app/api/aimodels/[id]/route.ts
import {NextRequest, NextResponse} from "next/server";
import connectDB from "@/lib/db";
import AIModel from "@/lib/models/AIModel";
import {auth} from "@clerk/nextjs/server";
import {getUserByClerkId} from "@/lib/actions/userDb.action";

export const dynamic = "force-dynamic";

// GET 1 model (optional)
export async function GET(_req: NextRequest, {params}: {params: {id: string}}) {
  try {
    await connectDB();
    const model = await AIModel.findById(params.id).lean();

    if (!model) {
      return NextResponse.json(
        {message: "Không tìm thấy model"},
        {status: 404}
      );
    }

    return NextResponse.json(
      {
        id: model._id.toString(),
        modelId: model.modelId,
        displayName: model.displayName,
        provider: model.provider,
        isFree: model.isFree,
      },
      {status: 200}
    );
  } catch (error) {
    console.error("GET /api/aimodels/[id] error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}

// PATCH: cập nhật
export async function PATCH(
  request: NextRequest,
  {params}: {params: {id: string}}
) {
  try {
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
    const {modelId, displayName, provider, isFree} = body || {};

    const updateData: any = {};
    if (modelId !== undefined) updateData.modelId = modelId;
    if (displayName !== undefined) updateData.displayName = displayName;
    if (provider !== undefined) updateData.provider = provider;
    if (isFree !== undefined) updateData.isFree = isFree;

    const updated = await AIModel.findByIdAndUpdate(
      params.id,
      {$set: updateData},
      {new: true}
    );

    if (!updated) {
      return NextResponse.json(
        {message: "Không tìm thấy model"},
        {status: 404}
      );
    }

    return NextResponse.json(
      {
        id: updated._id.toString(),
        modelId: updated.modelId,
        displayName: updated.displayName,
        provider: updated.provider,
        isFree: updated.isFree,
      },
      {status: 200}
    );
  } catch (error) {
    console.error("PATCH /api/aimodels/[id] error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}

// DELETE: xoá
export async function DELETE(
  _req: NextRequest,
  {params}: {params: {id: string}}
) {
  try {
    const {userId: clerkId} = await auth();
    if (!clerkId) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401});
    }
    const currentUser = await getUserByClerkId(clerkId);
    if (!currentUser) {
      return NextResponse.json({message: "User not found"}, {status: 404});
    }

    await connectDB();

    const deleted = await AIModel.findByIdAndDelete(params.id);
    if (!deleted) {
      return NextResponse.json(
        {message: "Không tìm thấy model"},
        {status: 404}
      );
    }

    return NextResponse.json({message: "Xoá model thành công"}, {status: 200});
  } catch (error) {
    console.error("DELETE /api/aimodels/[id] error:", error);
    return NextResponse.json(
      {message: "Lỗi server", error: (error as Error).message},
      {status: 500}
    );
  }
}
