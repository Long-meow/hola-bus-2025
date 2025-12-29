import { createClient } from '@supabase/supabase-js';

// Hàm này tạo ra một Client có quyền "Tối thượng" (Bypass RLS)
// Chỉ dùng ở Server Actions hoặc API Route, TUYỆT ĐỐI KHÔNG dùng ở Client Component
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}