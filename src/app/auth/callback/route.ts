import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Lấy "code" từ URL mà Google trả về
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  // Origin chính là domain hiện tại (localhost hoặc vercel)
  const origin = requestUrl.origin;
  
  // Nếu có param "next" thì chuyển hướng tới đó, không thì về trang chủ
  const next = requestUrl.searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    
    // Đổi code lấy session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // ✅ Đăng nhập thành công -> Chuyển hướng nội bộ về đúng origin hiện tại
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Nếu lỗi -> Quay về trang login của đúng origin đó
  return NextResponse.redirect(`${origin}/login?message=Could not login with Google`);
}