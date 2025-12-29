import Link from 'next/link';
import { Bus, Phone, MessageCircle } from 'lucide-react'; // Thêm icon MessageCircle
import { createClient } from '@/utils/supabase/server';
import UserNav from './user-nav';
import { siteConfig } from '@/config/site'; // <--- IMPORT FILE CONFIG

export default async function SiteHeader() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex h-20 items-center justify-between">
            
          {/* 1. LOGO */}
          <nav className="hidden md:flex items-center gap-6 bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-sm">
            <Link href="/" className="flex items-center gap-2 group">
                  <div className="bg-white p-2 rounded-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">  
                      <Bus className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex flex-col">
                      <span className="font-black text-xl tracking-tight text-slate-800 leading-none">
                          HOLA<span className="text-orange-600">BUS</span>
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                          Về nhà ăn Tết
                      </span>
                  </div>
              </Link>
              {/* Link mới: Giới thiệu dự án */}
              <Link href="/about" className="text-sm font-bold text-slate-700 hover:text-orange-600 transition">
                  Về dự án
              </Link>
              
              {/* Bạn có thể thêm link khác nếu muốn, ví dụ: Hướng dẫn đặt vé */}
              {/* <Link href="/guide" ... >Hướng dẫn</Link> */}
          </nav>
            

            {/* 2. MENU GIỮA */}
            

            {/* 3. MENU PHẢI (Hotline & User) */}
            <div className="flex items-center gap-3">
                
                {/* --- NÚT MESSENGER (ICON TRÒN) --- */}
                <a 
                    href={siteConfig.messengerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Sửa class: Bỏ w-9 h-9, thêm px-4 py-2 để nút dài ra
                    className="hidden lg:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg shadow-blue-200 transition-transform hover:scale-105"
                    title="Chat với chúng tôi"
                >
                    <MessageCircle className="w-5 h-5" />
                    {/* Thêm dòng chữ này */}
                    <span className="text-sm font-bold">Hỗ trợ</span>
                </a>

                {/* --- HOTLINE (LẤY TỪ CONFIG) --- */}
                <a 
                    href={`tel:${siteConfig.hotlineUrl}`}
                    className="hidden lg:flex items-center gap-2 text-slate-600 hover:text-orange-600 mr-2 bg-white/60 hover:bg-white px-3 py-1.5 rounded-full border border-white/40 backdrop-blur-sm transition-all shadow-sm"
                >
                    <Phone className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold font-mono">{siteConfig.hotline}</span>
                </a>

                {/* User Nav */}
                <UserNav user={user} />
            </div>

        </div>
      </div>
    </header>
  );
}