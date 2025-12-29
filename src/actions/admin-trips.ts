'use server'

import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

// 1. TẠO CHUYẾN XE
export async function createTrip(formData: FormData) {
  try {
    const supabase = createAdminClient();
    
    const tripData = {
      origin: formData.get('origin') as string,
      destination: formData.get('destination') as string,
      departure_time: formData.get('departure_time') as string,
      price: Number(formData.get('price')),
      // ❌ ĐÃ XÓA DÒNG total_seats Ở ĐÂY
      image_url: formData.get('image_url') as string,       // Link ảnh bìa
      route_details: formData.get('route_details') as string, // Lộ trình văn bản
      waypoints: formData.get('waypoints') as string,       // Các điểm dừng Google Map
    };

    console.log("🚀 Đang tạo chuyến xe:", tripData);

    const { error } = await supabase.from('trips').insert([tripData]);

    if (error) {
      console.error("❌ Lỗi Supabase (Create):", error);
      return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };

  } catch (err: any) {
    return { error: err.message };
  }
}

// 2. CẬP NHẬT
export async function updateTrip(tripId: number, formData: FormData) {
  try {
    const supabase = createAdminClient();
    
    const updates = {
      origin: formData.get('origin') as string,
      destination: formData.get('destination') as string,
      departure_time: formData.get('departure_time') as string,
      price: Number(formData.get('price')),
      // ❌ ĐÃ XÓA DÒNG total_seats Ở ĐÂY
      image_url: formData.get('image_url') as string,
      route_details: formData.get('route_details') as string,
      waypoints: formData.get('waypoints') as string,
    };

    console.log("🚀 Đang update chuyến:", tripId, updates);

    const { error } = await supabase.from('trips').update(updates).eq('id', tripId);

    if (error) {
      console.error("❌ Lỗi Supabase (Update):", error);
      return { error: error.message };
    }

    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };

  } catch (err: any) {
    return { error: err.message };
  }
}

// 3. XÓA
export async function deleteTrip(tripId: number) {
  try {
    const supabase = createAdminClient();
    console.log("🚀 Đang xóa chuyến:", tripId);

    const { error } = await supabase.from('trips').delete().eq('id', tripId);

    if (error) {
      console.error("❌ Lỗi Supabase (Delete):", error);
      return { error: error.message };
    }

    revalidatePath('/admin');
    return { success: true };
    
  } catch (err: any) {
    console.error("❌ Lỗi Server Action:", err);
    return { error: err.message };
  }
}

// 4. XÓA VÉ (BOOKING)
export async function deleteBooking(bookingId: string) {
  try {
    const supabase = createAdminClient();
    console.log("🚀 Đang xóa booking:", bookingId);

    const { error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
      console.error("❌ Lỗi xóa booking:", error);
      return { error: error.message };
    }

    revalidatePath('/admin/trips/[id]', 'page'); // Refresh lại trang chi tiết chuyến
    return { success: true };
    
  } catch (err: any) {
    return { error: err.message };
  }

}
// 5. CHECK-IN VÉ  
export async function checkInTicket(paymentCode: string) {
  try {
    const supabase = createAdminClient();
    
    // 1. Tìm vé
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*, trips(destination, departure_time)')
      .eq('payment_code', paymentCode)
      .single();

    if (error || !booking) {
      return { error: 'Vé không tồn tại hoặc mã sai!' };
    }

    // 2. Kiểm tra điều kiện
    if (booking.status === 'PENDING') return { error: 'Vé CHƯA THANH TOÁN!' };
    if (booking.status === 'CANCELLED') return { error: 'Vé ĐÃ BỊ HỦY!' };
    
    // 3. UPDATE GIỜ CHECK-IN (QUAN TRỌNG)
    // Nếu đã check-in rồi thì thôi, hoặc update lại giờ mới nhất cũng được
    const checkInTime = new Date().toISOString();
    
    const { error: updateError } = await supabase
      .from('bookings')
      .update({ check_in_at: checkInTime }) // <--- Ghi vào DB
      .eq('id', booking.id);

    if (updateError) return { error: 'Lỗi cập nhật DB: ' + updateError.message };

    // 4. Trả về thành công
    return { 
      success: true, 
      booking: {
        ...booking,
        trip_destination: booking.trips.destination,
        trip_time: booking.trips.departure_time,
        check_in_at: checkInTime // Trả về để UI hiển thị ngay nếu cần
      } 
    };

  } catch (err: any) {
    return { error: err.message };
  }
}