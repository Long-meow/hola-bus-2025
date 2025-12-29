import { createClient } from '@/utils/supabase/server';
import TripSearchSection from '@/components/trip-search-section';
// Lưu ý: AuthButton thường nằm ở Navbar (layout.tsx), 
// nhưng nếu bạn muốn đặt ở đâu đó trong body thì cứ import lại.

export default async function Home() {
  const supabase = await createClient();

  // 1. Lấy thông tin User (GIỮ NGUYÊN TÍNH NĂNG CŨ)
  const { data: { user } } = await supabase.auth.getUser();

  // 2. Fetch Trips (GIỮ NGUYÊN TÍNH NĂNG CŨ)
  const { data: trips, error } = await supabase
    .from('trips')
    .select('*')
    .order('departure_time', { ascending: true });

  // Xử lý lỗi đơn giản nếu fetch thất bại
  if (error) {
    console.error("Lỗi tải dữ liệu:", error);
  }

  return (
    <main>
      {/* 3. HIỂN THỊ GIAO DIỆN MỚI 
        Chúng ta truyền cả 'trips' và 'user' xuống component con.
        Component con sẽ lo việc hiển thị Banner, Tìm kiếm, và Chào user.
      */}
      <TripSearchSection 
        trips={trips || []} 
        user={user} 
      />
    </main>
  );
}