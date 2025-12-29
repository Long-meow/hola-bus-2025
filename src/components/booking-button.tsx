'use client'

import { useState } from 'react';
import { bookTicket } from '@/actions/booking-actions'; // Lưu ý: Cần file này ở bước 2
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'; 
import { Loader2, Ticket } from 'lucide-react';

export default function BookingButton({ tripId, price }: { tripId: string, price: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    setIsLoading(true);

    try {
      // Gọi Server Action để đặt vé
      const result = await bookTicket(tripId, "random");

      if (result.error) {
        // Nếu lỗi (Spam, chưa login...)
        toast.error("Không thể đặt vé", {
          description: result.error,
          duration: 4000,
        });
      } else if (result.success) {
        // Nếu thành công
        toast.success("Đặt chỗ thành công!", {
          description: "Đang chuyển đến trang thanh toán...",
        });
        
        setTimeout(() => {
          router.push(`/payment/${result.bookingId}`);
        }, 1000);
      }
    } catch (err) {
      toast.error("Lỗi kết nối", { description: "Vui lòng thử lại sau." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleBooking}
      disabled={isLoading}
      className={`
        w-full flex items-center justify-center gap-2 
        bg-gradient-to-r from-orange-600 to-red-600 text-white 
        font-bold py-4 px-6 rounded-xl shadow-lg shadow-orange-200
        transition-all transform hover:scale-[1.02] active:scale-95
        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
      `}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Đang xử lý...
        </>
      ) : (
        <>
          <Ticket className="w-5 h-5" />
          Đặt vé ngay • {price.toLocaleString()}đ
        </>
      )}
    </button>
  );
}