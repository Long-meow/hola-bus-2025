import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  // 1. Khởi tạo response ban đầu để giữ các headers
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Khởi tạo Supabase Client (Dùng để đọc/ghi cookie phiên đăng nhập)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Bước này quan trọng: Cập nhật cookie vào cả request và response
          // để phiên đăng nhập được duy trì liên tục
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. Lấy thông tin User hiện tại từ Supabase
  // Lưu ý: getUser() an toàn hơn getSession() vì nó xác thực lại token với server
  const { data: { user } } = await supabase.auth.getUser();

  // --- PHẦN PHÂN QUYỀN (AUTHORIZATION) ---
  const url = request.nextUrl.clone(); // Clone URL để an toàn khi chuyển hướng
  const path = url.pathname;

  // A. BẢO VỆ TRANG ADMIN (QUAN TRỌNG NHẤT)
  if (path.startsWith('/admin')) {
    
    // TH1: Chưa đăng nhập -> Đá về trang Login
    if (!user) {
      url.pathname = '/login';
      // Thêm param message để báo người dùng biết tại sao bị đá về
      url.searchParams.set('message', 'Bạn cần đăng nhập để truy cập Admin');
      return NextResponse.redirect(url);
    }

    // TH2: Đã đăng nhập nhưng KHÔNG PHẢI ADMIN
    const adminEmail = process.env.ADMIN_EMAIL;
    
    // Nếu quên cấu hình .env thì chặn luôn cho an toàn
    if (!adminEmail) {
      console.error("❌ LỖI BẢO MẬT: Chưa cấu hình ADMIN_EMAIL trong file .env.local");
      url.pathname = '/';
      return NextResponse.redirect(url);
    }

    // So sánh email user với email trong .env
    if (user.email !== adminEmail) {
      console.warn(`⚠️ Cảnh báo: User ${user.email} cố tình truy cập trái phép trang Admin!`);
      url.pathname = '/'; // Đá về trang chủ
      return NextResponse.redirect(url);
    }
  }

  // B. BẢO VỆ TRANG CÁ NHÂN (Vé của tôi, Thanh toán, Chi tiết vé)
  // Các trang này bắt buộc phải đăng nhập mới xem được
  const protectedPaths = ['/my-tickets', '/payment', '/ticket'];
  
  // Kiểm tra xem path hiện tại có bắt đầu bằng một trong các protectedPaths không
  const isProtectedPath = protectedPaths.some(prefix => path.startsWith(prefix));

  if (isProtectedPath && !user) {
    url.pathname = '/login';
    url.searchParams.set('message', 'Vui lòng đăng nhập để xem vé của bạn');
    return NextResponse.redirect(url);
  }

  // C. CHẶN TRANG LOGIN NẾU ĐÃ ĐĂNG NHẬP
  // Nếu đã login rồi mà vào /login thì đá về Home cho đỡ thừa
  if (path === '/login' && user) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // 4. Trả về response đã xử lý (cập nhật cookie mới nếu có)
  return response;
}