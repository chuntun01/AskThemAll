// app/api/user-role/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getUserByClerkId } from '@/lib/actions/user.actions';

export const dynamic = 'force-dynamic'; // Bắt buộc route luôn chạy ở chế độ động

export async function GET() {
  try {
    const { userId } = await auth();

    // Dòng này gây ra lỗi 401 nếu server không xác thực được bạn
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: No user ID found in session' }, { status: 401 });
    }

    const user = await getUserByClerkId(userId);
    const role = user?.role || 'member'; 

    return NextResponse.json({ role });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('API /user-role Error:', errorMessage);
    return NextResponse.json({ role: 'member' }, { status: 500 });
  }
}