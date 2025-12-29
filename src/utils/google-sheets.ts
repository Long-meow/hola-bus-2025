import { google } from 'googleapis';

export async function appendToSheet(bookingData: any) {
  try {
    // 1. KIỂM TRA CẤU HÌNH (Tránh crash nếu quên file .env)
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
        console.warn("⚠️ Google Sheets: Thiếu cấu hình Env -> Bỏ qua.");
        return "Skipped (Missing Env)";
    }

    // 2. KẾT NỐI (XÁC THỰC)
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        // Quan trọng: Xử lý ký tự xuống dòng trong Private Key
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'), 
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 3. CHUẨN BỊ DỮ LIỆU (FORMATTING)
    
    // Dịch loại ghế sang tiếng Việt cho dễ đọc
    const seatMap: Record<string, string> = {
        'window': 'Cạnh cửa sổ 🪟',
        'sick': 'Ghế đầu (Say xe) 🤢',
        'random': 'Ngẫu nhiên 🎲'
    };
    const seatLabel = seatMap[bookingData.seat_preference] || bookingData.seat_preference;

    // Lấy tên chuyến xe (Xử lý an toàn nếu dữ liệu trip bị thiếu)
    // bookingData.trips có thể là object hoặc mảng tùy cách query, ta xử lý cả 2
    let tripName = 'Không rõ';
    if (bookingData.trips) {
        if (Array.isArray(bookingData.trips)) {
            tripName = bookingData.trips[0]?.destination || 'N/A';
        } else {
            tripName = bookingData.trips.destination || 'N/A';
        }
    }

    // Xếp dữ liệu vào mảng theo đúng thứ tự cột A -> H
    // [Mã Vé | Họ Tên | MSSV | SĐT | Chuyến Xe | Loại Ghế | Số Tiền | Thời Gian]
    const rowData = [
      bookingData.payment_code || '',          // Cột A
      bookingData.full_name || '',             // Cột B
      bookingData.student_id || '',            // Cột C
      bookingData.phone_number || '',          // Cột D
      tripName,                                // Cột E
      seatLabel,                               // Cột F
      bookingData.amount ? bookingData.amount.toLocaleString('vi-VN') : '0', // Cột G
      new Date().toLocaleString('vi-VN')       // Cột H (Thời gian ghi)
    ];

    // 4. GHI VÀO SHEET
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'VEXETET!A2:H', // Ghi vào tab VEXETET, nối tiếp từ dòng A2 trở đi
      valueInputOption: 'USER_ENTERED', // Để Google tự hiểu số và ngày tháng
      requestBody: {
        values: [rowData],
      },
    });

    console.log(`📊 Google Sheets: Đã ghi thành công đơn ${bookingData.payment_code}`);
    return "Success";

  } catch (error: any) {
    console.error('🔥 Google Sheets Error:', error.message);
    return `Error: ${error.message}`;
  }
}