import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import Script from 'next/script';

const pretendardGov = localFont({
  src: '../assets/font/PretendardGOVVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard-gov'
});

export const metadata: Metadata = {
  title: '대한민국 댐 지도',
  description: '댐 수문 개방과 인근 하천 정보를 확인해보세요.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className={`${pretendardGov.variable} antialiased`}>
        {children}
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_KEY}`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
