// ... imports
import SiteHeader from '@/components/layout/site-header'; // Import file mới
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="antialiased text-slate-800 bg-slate-50">
        
        {/* Đặt Header ở đây */}
        <SiteHeader />
        
        {/* Header dùng position:absolute nên nó sẽ nằm đè lên children.
            Điều này HOÀN HẢO cho trang chủ vì ta muốn nó đè lên Banner Tết.
            
            TUY NHIÊN: Với các trang con (như Admin, Login), nội dung có thể bị che mất.
            Nếu bị che, ở các trang con bạn chỉ cần thêm class `pt-20` vào thẻ bao ngoài cùng là được.
        */}
        {children}
        
      </body>
    </html>
  );
}