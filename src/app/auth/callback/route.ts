import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Lấy "code" từ URL mà Google trả về
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Nếu có param "next" thì chuyển hướng tới đó, không thì về trang chủ
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    
    // Đổi code lấy session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Đăng nhập thành công -> Chuyển hướng người dùng vào trong
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Nếu lỗi -> Quay về trang login
  return NextResponse.redirect(`${origin}/login?message=Could not login with Google`);
}