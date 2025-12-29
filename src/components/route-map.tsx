import { MapPin, ExternalLink } from 'lucide-react';

interface RouteMapProps {
  origin: string;
  destination: string;
}

export default function RouteMap({ origin, destination }: RouteMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  
  // Encode địa chỉ để URL không bị lỗi tiếng Việt
  const originEncoded = encodeURIComponent(`${origin}, Việt Nam`);
  const destEncoded = encodeURIComponent(`${destination}, Việt Nam`);

  // 1. URL Nhúng (Hiển thị ngay trên web)
  const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=${apiKey}&origin=${originEncoded}&destination=${destEncoded}&mode=driving`;
  
  // 2. URL Link (Để mở tab mới hoặc mở App Google Maps)
  const linkUrl = `https://www.google.com/maps/dir/?api=1&origin=${originEncoded}&destination=${destEncoded}&travelmode=driving`;

  // Fallback nếu chưa cấu hình Key
  if (!apiKey) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 border border-gray-200">
        <MapPin className="w-8 h-8 mb-2" />
        <p className="text-sm">Chưa cấu hình Google Maps API Key</p>
      </div>
    );
  }

  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-100">
      {/* Bản đồ Embed */}
      <iframe
        width="100%"
        height="350" // Chiều cao bản đồ
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        title="Bản đồ lộ trình"
        className="w-full object-cover"
      />

      {/* Nút mở App Google Maps (Nổi lên góc phải dưới) */}
      <a 
        href={linkUrl} 
        target="_blank" 
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-blue-600 px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-blue-50 transition flex items-center gap-2 z-10"
      >
        <ExternalLink className="w-4 h-4" /> Xem chỉ đường
      </a>
    </div>
  );
}