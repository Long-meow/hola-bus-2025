'use client'

import Link from 'next/link';
import { Clock, Wifi, Coffee, ArrowRight, Star } from 'lucide-react';

// Ảnh mặc định
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000&auto=format&fit=crop";

type TripProps = {
  trip: {
    id: string;
    origin: string;
    destination: string;
    price: number;
    departure_time: string;
    image_url?: string;
    route_details?: string;
  }
}

export default function TripCard({ trip }: TripProps) {
  // Format giá tiền
  const priceFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(trip.price);
  
  // Format ngày giờ
  const dateObj = new Date(trip.departure_time);
  const timeStr = dateObj.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const dateStr = dateObj.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

  // --- 🛠️ LOGIC XỬ LÝ LỘ TRÌNH ---
  // Tách chuỗi văn bản thành mảng các điểm dừng
  const routeSteps = trip.route_details 
    ? trip.route_details.split(/->|-|;|,\s*/).map(s => s.trim()).filter(s => s.length > 0)
    : [];

  // Nếu không có lộ trình chi tiết, dùng mặc định [Điểm đi, Điểm đến]
  const displaySteps = routeSteps.length > 0 ? routeSteps : [trip.origin, trip.destination];

  return (
    <div className="group relative h-full flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-red-900/10 border border-red-100">
      
      {/* Hiệu ứng viền */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-200 rounded-2xl transition-colors pointer-events-none z-20"></div>

      {/* --- 1. PHẦN ẢNH BÌA --- */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={trip.image_url || DEFAULT_IMAGE} 
          alt={trip.destination}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Badge TẾT */}
        <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg flex items-center gap-1 border border-yellow-400">
            <Star className="w-3 h-3 text-yellow-300 fill-yellow-300 animate-pulse" />
            XUÂN ẤT TỴ
        </div>
        
        {/* Badge Giờ */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-red-700 shadow-sm flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timeStr} • {dateStr}
        </div>
      </div>

      {/* --- 2. PHẦN NỘI DUNG --- */}
      <div className="p-5 flex flex-col flex-grow relative">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-20 h-20 bg-yellow-400 rounded-full blur-3xl opacity-10 pointer-events-none"></div>

        <h3 className="text-lg font-extrabold text-slate-800 mb-4 group-hover:text-red-600 transition-colors line-clamp-1">
            {trip.destination}
        </h3>

        {/* --- 👇 LỘ TRÌNH DẠNG TIMELINE (HIỆN TẤT CẢ) 👇 --- */}
        <div className="space-y-0 mb-4">
            {/* Lặp qua TOÀN BỘ các bước, không cắt bớt nữa */}
            {displaySteps.map((step, index) => {
                // Logic: Chỉ tô đỏ điểm cuối cùng thực sự của mảng
                const isLast = index === displaySteps.length - 1; 

                return (
                    <div key={index} className="flex gap-3 relative min-h-[32px]">
                        {/* Cột chứa Dấu chấm & Đường kẻ */}
                        <div className="flex flex-col items-center w-4 pt-1">
                            {/* Dấu chấm tròn */}
                            <div className={`
                                w-3.5 h-3.5 rounded-full border-2 z-10 shrink-0
                                ${isLast 
                                    ? 'bg-red-500 border-red-500 shadow-sm shadow-red-200' // Điểm cuối màu đỏ
                                    : 'bg-white border-slate-300' // Điểm thường màu trắng
                                }
                            `}></div>
                            
                            {/* Đường kẻ nối (Hiện ở tất cả trừ điểm cuối) */}
                            {!isLast && (
                                <div className="w-[2px] bg-slate-200 h-full -mt-1 mb-1 group-hover:bg-red-100 transition-colors"></div>
                            )}
                        </div>

                        {/* Cột chứa Tên địa điểm */}
                        <div className="pb-2 w-full">
                            <p className="text-[10px] text-slate-400 font-medium uppercase leading-none mb-0.5">
                                {index === 0 ? 'Điểm đi' : (isLast ? 'Điểm đến' : 'Qua')}
                            </p>
                            <p className={`text-sm leading-tight ${isLast ? 'font-bold text-red-700' : 'font-medium text-slate-700'}`}>
                                {step}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
        {/* ----------------------------------------------------- */}

        {/* Tiện ích */}
        <div className="flex gap-2 mb-6 mt-auto">
            <span className="inline-flex items-center gap-1 text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded border border-slate-100">
                <Wifi className="w-3 h-3" /> Wifi
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-slate-50 text-slate-500 px-2 py-1 rounded border border-slate-100">
                <Coffee className="w-3 h-3" /> Nước
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] bg-yellow-50 text-yellow-700 px-2 py-1 rounded border border-yellow-100 font-medium">
                ⚡ Vé nhanh
            </span>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-dashed border-slate-200 flex items-end justify-between">
            <div>
                <p className="text-xs text-slate-400 font-medium mb-0.5">Giá vé ưu đãi</p>
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-black text-red-600">{priceFormatted}</span>
                </div>
            </div>
            
            <Link 
                href={`/trips/${trip.id}`}
                className="relative overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 text-white pl-4 pr-3 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-200 hover:shadow-orange-300 hover:scale-105 transition-all duration-300 flex items-center gap-2 group/btn"
            >
                <span className="relative z-10">Đặt ngay</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-500"></div>
            </Link>
        </div>
      </div>
    </div>
  );
}