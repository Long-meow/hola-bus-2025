import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export default async function LoginPage(props: {
  searchParams: Promise<{ message: string }>;
}) {
  // 👇 1. GIẢI NÉN PROMISE (FIX LỖI NEXT.JS 15)
  const searchParams = await props.searchParams;
  const message = searchParams?.message;

  const supabase = await createClient();

  // Nếu đã đăng nhập rồi thì đá về trang chủ
  const { data: { session } } = await supabase.auth.getSession();
  if (session) {
    return redirect('/');
  }

  // Server Action để xử lý đăng nhập Google
  const signInWithGoogle = async () => {
    'use server';
    const supabase = await createClient();
    
    // 👇 2. LẤY ORIGIN CHUẨN ĐỂ KHÔNG BỊ CHUYỂN HƯỚNG SAI
    const headersList = await headers();
    const origin = headersList.get('origin') || headersList.get('host') || 'http://localhost:3000';
    
    // Nếu origin không có http/https (thường là localhost), tự thêm vào
    const protocol = origin.includes('localhost') ? 'http' : 'https';
    const finalOrigin = origin.startsWith('http') ? origin : `${protocol}://${origin}`;

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Sau khi Google xong, quay về đúng nơi đã gọi nó (Local về Local, Vercel về Vercel)
        redirectTo: `${finalOrigin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect(data.url);
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 mx-auto min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Đăng nhập</h1>
            <p className="text-gray-500 text-sm">Chào mừng bạn quay trở lại với Hola Bus</p>
        </div>

        <form action={signInWithGoogle}>
          <button className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-4 rounded-xl transition duration-200">
            <img 
                src="https://www.svgrepo.com/show/475656/google-color.svg" 
                alt="Google Logo" 
                className="w-6 h-6"
            />
            <span>Tiếp tục với Google</span>
          </button>
        </form>
        
        {/* 👇 3. SỬ DỤNG BIẾN ĐÃ AWAIT */}
        {message && (
          <p className="mt-4 p-4 bg-red-100 text-red-700 text-center rounded-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}