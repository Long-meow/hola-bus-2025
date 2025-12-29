'use client'

import { useState, useMemo } from 'react';
import { Search, MapPin, Sparkles, X } from 'lucide-react';
import TripCard from './trip-card';

// --- HÀM HỖ TRỢ: CHUYỂN TIẾNG VIỆT CÓ DẤU -> KHÔNG DẤU ---
// Giúp tìm kiếm "ha noi" ra "Hà Nội", "hai phong" ra "Hải Phòng"
function normalizeString(str: string) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export default function TripSearchSection({ trips }: { trips: any[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // --- LOGIC LỌC DỮ LIỆU (REAL-TIME) ---
  // Sử dụng useMemo để tối ưu hiệu năng khi danh sách lớn
  const filteredTrips = useMemo(() => {
    if (!searchTerm) return trips;

    const term = normalizeString(searchTerm);

    return trips.filter((trip) => {
      const origin = normalizeString(trip.origin);
      const dest = normalizeString(trip.destination);
      // Tìm trong cả điểm đi và điểm đến
      return origin.includes(term) || dest.includes(term);
    });
  }, [searchTerm, trips]);

  // Các từ khóa gợi ý nhanh
  const suggestions = ['Thanh Hóa', 'Nam Định', 'Nghệ An', 'Hải Phòng', 'Hà Nội'];

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* --- 1. HERO BANNER (KHUNG TÌM KIẾM) --- */}
      <div className="relative bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 pt-20 pb-32 px-4 overflow-hidden">
        
        {/* Hiệu ứng nền (Blobs) di chuyển nhẹ */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>

        <div className="relative max-w-4xl mx-auto text-center z-10 space-y-6">
            
            {/* Badge nhỏ xinh */}
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-red-100 shadow-sm animate-bounce duration-[2000ms]">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-red-600 tracking-wide">MỞ BÁN VÉ TẾT 2025</span>
            </div>

            {/* Tiêu đề lớn */}
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight">
                Tết này bạn <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">về đâu?</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Hơn <span className="font-bold text-slate-800">20+ tuyến xe</span> chất lượng cao đang chờ đón. 
                Đặt vé sớm để có chỗ ngồi tốt nhất sum vầy cùng gia đình.
            </p>

            {/* --- THANH TÌM KIẾM CHÍNH (INPUT) --- */}
            <div className={`
                relative bg-white rounded-2xl shadow-xl max-w-2xl mx-auto 
                flex items-center border transition-all duration-300 transform
                ${isFocused ? 'scale-105 border-red-400 ring-4 ring-red-100 shadow-2xl' : 'border-slate-100 hover:shadow-2xl hover:-translate-y-1'}
            `}>
                <div className="pl-5 text-slate-400">
                    <Search className={`w-6 h-6 ${isFocused ? 'text-red-500' : ''}`} />
                </div>
                
                <input 
                    type="text" 
                    placeholder="Nhập tỉnh thành bạn muốn đến (VD: Nam Định...)" 
                    className="flex-1 p-5 outline-none text-lg text-slate-800 placeholder:text-slate-400 bg-transparent rounded-2xl"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />

                {/* Nút Xóa (chỉ hiện khi có chữ) */}
                {searchTerm && (
                    <button 
                        onClick={() => setSearchTerm('')}
                        className="p-2 mr-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}

                <button className="hidden md:block bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3.5 px-8 rounded-xl mr-2 transition-all shadow-lg shadow-orange-200">
                    Tìm chuyến
                </button>
            </div>

            {/* Gợi ý từ khóa (Tags) */}
            <div className="flex flex-wrap justify-center gap-3 pt-2">
                <span className="text-sm text-slate-400 py-1">Phổ biến:</span>
                {suggestions.map((city) => (
                    <button 
                        key={city}
                        onClick={() => setSearchTerm(city)}
                        className="text-sm bg-white/60 hover:bg-white border border-slate-200 hover:border-red-200 text-slate-600 hover:text-red-600 px-3 py-1 rounded-full transition-all shadow-sm"
                    >
                        {city}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* --- 2. PHẦN KẾT QUẢ TÌM KIẾM --- */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 pb-20">
        
        {/* Header Kết quả */}
        <div className="flex items-center justify-between mb-8 px-2">
             <div className="flex items-center gap-3">
                 <div className="h-10 w-1.5 bg-red-600 rounded-full"></div>
                 <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        {searchTerm ? `Kết quả tìm kiếm` : 'Lịch trình Tết 2025'}
                    </h2>
                    <p className="text-sm text-slate-500">
                        {searchTerm 
                            ? `Tìm thấy ${filteredTrips.length} chuyến phù hợp với "${searchTerm}"`
                            : 'Danh sách các chuyến xe đang mở bán'
                        }
                    </p>
                 </div>
             </div>
        </div>

        {/* --- GRID DANH SÁCH VÉ --- */}
        {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                {/* Render Trip Cards */}
                {filteredTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        ) : (
            // --- TRẠNG THÁI KHÔNG TÌM THẤY ---
            <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
                <div className="bg-red-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <MapPin className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Không tìm thấy chuyến nào</h3>
                <p className="text-slate-500 max-w-md mx-auto mb-8">
                    Rất tiếc, chưa có tuyến xe nào đi đến <span className="font-bold text-red-600">"{searchTerm}"</span>. 
                    Bạn hãy thử tìm các địa điểm lân cận xem sao nhé.
                </p>
                <button 
                    onClick={() => setSearchTerm('')}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-xl transition"
                >
                    Xóa bộ lọc & Xem tất cả
                </button>
            </div>
        )}
      </div>

    </div>
  );
}