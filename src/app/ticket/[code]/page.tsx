import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft, Bus, CheckCircle } from 'lucide-react';

// --- SỬA DÒNG NÀY: Định nghĩa kiểu params là Promise ---
export default async function TicketDetailPage({ params }: { params: Promise<{ code: string }> }) {
  
  // --- SỬA DÒNG NÀY: Phải await params trước khi lấy code ---
  const { code } = await params;
  const ticketCode = code;

  const supabase = await createClient();

  // 1. Lấy thông tin vé từ mã Code (VD: HOLA123)
  const { data: ticket } = await supabase
    .from('bookings')
    .select(`*, trips (*)`)
    .eq('payment_code', ticketCode)
    .single();

  if (!ticket) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
            <div className="text-4xl mb-4">😢</div>
            <h1 className="text-xl font-bold text-gray-800">Không tìm thấy vé</h1>
            <p className="text-gray-500 mb-6">Mã vé "{ticketCode}" không tồn tại trong hệ thống.</p>
            <Link href="/my-tickets" className="text-orange-600 hover:underline">
                ← Quay lại danh sách
            </Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center items-start">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden relative">
        
        {/* Header vé */}
        <div className="bg-orange-600 p-6 text-center text-white relative">
            <Link href="/my-tickets" className="absolute left-4 top-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition">
                <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold tracking-widest uppercase">Vé Điện Tử</h1>
            <p className="text-orange-100 text-sm opacity-90">Hola Bus System</p>
        </div>

        {/* Nội dung vé (Cắt giấy) */}
        <div className="relative bg-white p-6">
            {/* Răng cưa trang trí */}
            <div className="absolute top-0 left-0 w-full h-4 -mt-2 bg-white rounded-t-xl"></div>

            <div className="text-center mb-6">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider">Mã đặt chỗ</p>
                <h2 className="text-4xl font-black text-orange-600 tracking-wider my-1">{ticket.payment_code}</h2>
                <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mt-2">
                    <CheckCircle className="w-3 h-3" /> Đã thanh toán
                </div>
            </div>

            <hr className="border-dashed border-gray-300 my-6" />

            {/* Thông tin hành trình */}
            <div className="space-y-6">
                <div className="flex items-start gap-4">
                    <div className="mt-1 bg-orange-100 p-2 rounded-lg">
                        <Bus className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase">Chuyến xe</p>
                        <p className="font-bold text-gray-800 text-lg">
                            {ticket.trips?.origin} ➝ {ticket.trips?.destination}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-1 flex items-center gap-1"><Calendar className="w-3 h-3"/> Ngày đi</p>
                        <p className="font-semibold text-gray-800">
                            {new Date(ticket.trips?.departure_time).toLocaleDateString('vi-VN')}
                        </p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 uppercase mb-1 flex items-center gap-1"><Clock className="w-3 h-3"/> Giờ đi</p>
                        <p className="font-semibold text-gray-800">
                            {new Date(ticket.trips?.departure_time).toLocaleTimeString('vi-VN', {hour: '2-digit', minute:'2-digit'})}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500 text-sm">Hành khách</span>
                        <span className="font-bold text-gray-900">{ticket.full_name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                        <span className="text-gray-500 text-sm">SĐT</span>
                        <span className="font-bold text-gray-900">{ticket.phone_number}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500 text-sm">Ghế</span>
                        <span className="font-bold text-purple-600 uppercase">{ticket.seat_preference}</span>
                    </div>
                </div>
            </div>

            <hr className="border-dashed border-gray-300 my-8" />

            {/* QR Code */}
            <div className="text-center">
                <p className="text-sm text-gray-500 mb-4">Quét mã này để lên xe</p>
                <div className="bg-white p-2 border-2 border-gray-100 rounded-xl inline-block">
                    {/* Tạo QR Code động từ Google API */}
                    <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ticket.payment_code}`} 
                        alt="QR Ticket" 
                        className="w-40 h-40"
                    />
                </div>
                <p className="text-xs text-gray-400 mt-4">Vui lòng đến trước 15 phút giờ khởi hành</p>
            </div>

        </div>
      </div>
    </div>
  );
}