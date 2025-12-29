import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Users, Bus, Target, Heart, Rocket, Star } from 'lucide-react';

export const metadata = {
  title: 'Về dự án HolaBus - FPTU Business Club',
  description: 'Câu chuyện về dự án xe tuyến sinh viên HolaBus, một sáng kiến khởi nghiệp từ CLB Kinh doanh Đại học FPT (FPTU Business Club).',
};

export default function AboutPage() {
  return (
    <main className="bg-white">
      {/* --- 1. HERO SECTION: BANNER ĐẦU TRANG --- */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-orange-50 to-yellow-50">
        {/* Hiệu ứng nền */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-orange-100 shadow-sm mb-6 animate-in fade-in slide-in-from-top-4">
              <Rocket className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-600 tracking-wide">DỰ ÁN KHỞI NGHIỆP SINH VIÊN</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-6">
              Câu chuyện về <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500">HolaBus</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              Hơn cả một chuyến xe, HolaBus là hành trình kết nối, là sáng kiến từ chính những sinh viên Đại học FPT với khát vọng mang đến giải pháp di chuyển tốt hơn cho cộng đồng của mình.
            </p>
          </div>
        </div>
      </section>

      {/* --- 2. CÂU CHUYỆN KHỞI NGUỒN (THE STORY) --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 animate-in fade-in slide-in-from-left duration-700">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                {/* Thay ảnh này bằng ảnh thật của dự án HolaBus khi có */}
                <img 
                  src="https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=1000&auto=format&fit=crop" 
                  alt="Sinh viên FPT trên chuyến xe HolaBus" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Bus className="w-4 h-4" /> Khởi nguồn
                  </p>
                  <h3 className="text-2xl font-bold">Từ nỗi trăn trở của sinh viên Hòa Lạc</h3>
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6 animate-in fade-in slide-in-from-right duration-700">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                Khi <span className="text-orange-600">"Về nhà"</span> trở thành một hành trình gian nan
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Học tập tại khu công nghệ cao Hòa Lạc mang lại môi trường tuyệt vời, nhưng việc di chuyển về Hà Nội hay các tỉnh thành khác, đặc biệt vào những dịp lễ Tết, luôn là một nỗi ám ảnh với sinh viên FPT. Xe buýt công cộng quá tải, xe khách không thuận tiện, chi phí đi lại đắt đỏ.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Nhận thấy sự bất cập đó, một nhóm sinh viên năng động, nòng cốt là các thành viên của <span className="font-bold text-slate-800">CLB Kinh doanh (Business Club)</span>, đã quyết định không đứng nhìn. Ý tưởng về **HolaBus** - một dịch vụ xe tuyến chuyên biệt, an toàn, giá cả hợp lý dành riêng cho sinh viên FPT - đã ra đời từ chính nhu cầu cấp thiết đó.
              </p>
              <div className="pt-4">
                <div className="inline-flex items-center gap-3 bg-orange-50 p-4 rounded-2xl border border-orange-100">
                  <Heart className="w-6 h-6 text-orange-500 fill-orange-500" />
                  <p className="font-medium text-orange-800">Slogan từng gắn liền với dự án: "Thấy Hola Bus là thấy Tết!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. GIỚI THIỆU CLB BUSINESS CLUB (FPTU BC) --- */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Đơn vị khởi xướng: <span className="text-blue-600">FPTU Business Club</span>
            </h2>
            <p className="text-lg text-slate-600">
              Nơi ươm mầm những ý tưởng kinh doanh và đánh thức tiềm năng lãnh đạo trong mỗi sinh viên FPT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-2xl h-fit">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Cộng đồng năng động & sáng tạo</h3>
                  <p className="text-slate-600 leading-relaxed">
                    FPTU Business Club (BC) là một trong những CLB hoạt động sôi nổi nhất tại ĐH FPT. Chúng tôi tập hợp những sinh viên đam mê kinh doanh, không ngại thử thách và luôn tìm kiếm cơ hội để tạo ra giá trị thực.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-yellow-100 p-3 rounded-2xl h-fit">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Thành tích & Dấu ấn</h3>
                  <p className="text-slate-600 leading-relaxed">
                    BC đã từng đạt danh hiệu Câu lạc bộ xuất sắc và tổ chức thành công nhiều chương trình, workshop chất lượng như "Thành công trước tuổi 30", talkshow "QUẢN TRỊ BẢN THÂN – QUẢN TRỊ CUỘC ĐỜI", tạo tiếng vang lớn trong cộng đồng sinh viên.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="bg-orange-100 p-3 rounded-2xl h-fit">
                  <Rocket className="w-8 h-8 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Vườn ươm khởi nghiệp thực chiến</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Không chỉ dừng lại ở lý thuyết, BC khuyến khích và hỗ trợ các thành viên hiện thực hóa ý tưởng kinh doanh. **HolaBus** chính là minh chứng rõ nét nhất cho tinh thần "dám nghĩ, dám làm" của sinh viên BC.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="animate-in fade-in slide-in-from-right duration-700">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                {/* Thay ảnh này bằng ảnh thật của CLB Business Club khi có */}
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop" 
                  alt="Thành viên CLB Business Club trong một sự kiện" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">FPTU Business Club</h3>
                  <p className="font-medium">Đánh thức con người phi thường bên trong bạn</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. SỨ MỆNH CỦA HOLABUS (OUR MISSION) --- */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Sứ mệnh của <span className="text-orange-600">HolaBus</span>
            </h2>
            <p className="text-lg text-slate-600">
              Chúng tôi không chỉ cung cấp một chuyến đi, chúng tôi mang đến sự an tâm và kết nối cho cộng đồng sinh viên FPT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MissionCard 
              icon={<Target className="w-10 h-10 text-red-500" />}
              title="Giải pháp di chuyển tối ưu"
              description="Cung cấp các tuyến xe chất lượng, lộ trình phù hợp với nhu cầu thực tế của sinh viên FPT Hòa Lạc đi Hà Nội và các tỉnh thành."
            />
            <MissionCard 
              icon={<Heart className="w-10 h-10 text-orange-500" />}
              title="An toàn & Tin cậy"
              description="Hợp tác với các nhà xe uy tín, đảm bảo chất lượng phương tiện và thái độ phục vụ, mang lại sự an tâm tuyệt đối cho sinh viên và phụ huynh."
            />
            <MissionCard 
              icon={<Users className="w-10 h-10 text-blue-500" />}
              title="Kết nối cộng đồng"
              description="Tạo ra một không gian di chuyển thân thiện, nơi sinh viên FPT có thể kết nối, chia sẻ trên những hành trình về nhà."
            />
          </div>
        </div>
      </section>

      {/* --- 5. CALL TO ACTION (CTA) --- */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 relative overflow-hidden">
        {/* Họa tiết nền */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Sẵn sàng cho hành trình về nhà?
          </h2>
          <p className="text-lg md:text-xl text-orange-100 mb-10 max-w-2xl mx-auto">
            Hãy để HolaBus đồng hành cùng bạn trên con đường về sum họp bên gia đình. Đặt vé ngay hôm nay để nhận những ưu đãi tốt nhất!
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-bold py-4 px-10 rounded-full text-lg transition-all transform hover:scale-105 shadow-2xl"
          >
            Đặt vé ngay <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </main>
  );
}

// --- SUB-COMPONENT: MISSION CARD ---
function MissionCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center group">
      <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-orange-600 transition-colors">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  )
}