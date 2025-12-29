import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
  Link,
} from '@react-email/components';

// Định nghĩa kiểu dữ liệu đầu vào cho Email
interface TicketEmailProps {
  customerName: string;
  busRoute: string;     // VD: Hà Nội - Nam Định
  departureTime: string; // VD: 20/01/2025 08:00
  ticketCode: string;   // VD: HOLA8X92
  seatType: string;     // VD: window, random
  price: number;        // VD: 150000
}

export const TicketEmail = ({
  customerName,
  busRoute,
  departureTime,
  ticketCode,
  seatType,
  price,
}: TicketEmailProps) => {

  // Xử lý hiển thị loại ghế cho tiếng Việt đẹp hơn
  const formatSeatType = (type: string) => {
    const map: Record<string, string> = {
      window: 'Cạnh cửa sổ 🪟',
      sick: 'Ghế đầu (Say xe) 🤢',
      random: 'Ngẫu nhiên 🎲',
    };
    return map[type] || 'Ngẫu nhiên';
  };

  // Link tạo QR Code tự động (Dùng QuickChart hoặc QRServer đều được)
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${ticketCode}`;

  return (
    <Html>
      <Head />
      <Preview>✅ Vé xe Tết {ticketCode} của bạn đã được thanh toán thành công!</Preview>
      <Body style={main}>
        <Container style={container}>
          
          {/* HEADER LOGO */}
          <Section style={headerSection}>
            <Heading style={brandName}>🚌 HOLA BUS</Heading>
            <Text style={subBrand}>Hệ thống vé xe Tết sinh viên FPT</Text>
          </Section>

          {/* MAIN CONTENT */}
          <Section style={contentSection}>
            <Heading style={h1}>THANH TOÁN THÀNH CÔNG</Heading>
            <Text style={heroText}>
              Xin chào <b>{customerName}</b>,<br/>
              Vé của bạn đã được xác nhận. Vui lòng lưu email này để lên xe.
            </Text>

            {/* BOX THÔNG TIN VÉ */}
            <Section style={ticketBox}>
              <Row>
                <Column>
                    <Text style={label}>MÃ VÉ (BOOKING ID)</Text>
                    <Text style={codeValue}>{ticketCode}</Text>
                </Column>
              </Row>
              <Hr style={hr} />
              <Row style={rowSpacing}>
                <Column>
                    <Text style={label}>HÀNH TRÌNH</Text>
                    <Text style={value}>{busRoute}</Text>
                </Column>
              </Row>
              <Row style={rowSpacing}>
                <Column>
                    <Text style={label}>KHỞI HÀNH</Text>
                    <Text style={value}>{departureTime}</Text>
                </Column>
                <Column>
                    <Text style={label}>LOẠI GHẾ</Text>
                    <Text style={value}>{formatSeatType(seatType)}</Text>
                </Column>
              </Row>
              <Row style={rowSpacing}>
                 <Column>
                    <Text style={label}>GIÁ VÉ ĐÃ THANH TOÁN</Text>
                    <Text style={priceValue}>{price?.toLocaleString('vi-VN')}đ</Text>
                 </Column>
              </Row>
            </Section>

            {/* QR CODE CHECK-IN */}
            <Section style={qrSection}>
              <Text style={qrLabel}>MÃ QR LÊN XE</Text>
              <Img src={qrUrl} width="180" height="180" alt="QR Checkin" style={qrImage} />
              <Text style={noteText}>Hãy đưa mã này cho BTC khi lên xe bạn nhé.</Text>
            </Section>

          </Section>

          {/* FOOTER */}
          <Text style={footer}>
            HOLA BUS System © 2025<br/>
            Hỗ trợ: <Link href="mailto:support@fpt.edu.vn" style={{color: '#ea580c'}}>support@fpt.edu.vn</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// --- CSS STYLES (Inline Styles chuẩn cho Email Client) ---
const main = {
  backgroundColor: '#f1f5f9',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
  padding: '20px 0',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  maxWidth: '600px',
  borderRadius: '16px',
  overflow: 'hidden' as const,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const headerSection = {
  backgroundColor: '#ea580c', // Cam đậm
  padding: '30px 20px',
  textAlign: 'center' as const,
};

const brandName = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  letterSpacing: '2px',
};

const subBrand = {
  color: '#ffedd5', // Cam nhạt
  fontSize: '14px',
  margin: '5px 0 0',
};

const contentSection = {
  padding: '40px 25px',
};

const h1 = {
  color: '#1e293b',
  fontSize: '22px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '0 0 20px',
};

const heroText = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#475569',
  marginBottom: '30px',
  textAlign: 'center' as const,
};

const ticketBox = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '12px',
  padding: '24px',
};

const rowSpacing = {
  marginTop: '16px',
};

const label = {
  color: '#94a3b8',
  fontSize: '11px',
  fontWeight: 'bold',
  letterSpacing: '1px',
  textTransform: 'uppercase' as const,
  margin: '0 0 4px',
};

const value = {
  color: '#334155',
  fontSize: '15px',
  fontWeight: '600',
  margin: '0',
};

const codeValue = {
  color: '#ea580c',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '2px',
  margin: '0',
};

const priceValue = {
  color: '#16a34a', // Màu xanh lá cây
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '20px 0',
};

const qrSection = {
  textAlign: 'center' as const,
  marginTop: '40px',
};

const qrLabel = {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#64748b',
  marginBottom: '10px',
};

const qrImage = {
  border: '4px solid #ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  margin: '0 auto',
};

const noteText = {
  fontSize: '13px',
  color: '#94a3b8',
  fontStyle: 'italic',
  marginTop: '15px',
};

const footer = {
  backgroundColor: '#f1f5f9',
  padding: '20px',
  textAlign: 'center' as const,
  color: '#94a3b8',
  fontSize: '12px',
  lineHeight: '18px',
  borderTop: '1px solid #e2e8f0',
};