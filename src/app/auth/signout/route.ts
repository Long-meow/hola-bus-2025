import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // 1. Kiểm tra xem có session không
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    // 2. Nếu có thì đăng xuất
    await supabase.auth.signOut();
  }

  // 3. Xóa cache để Header cập nhật lại trạng thái (từ Avatar -> Nút Login)
  revalidatePath('/', 'layout');
  
  // 4. Quay về trang chủ
  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  });
}