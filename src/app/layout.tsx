import './globals.css';

import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

const suitFont = localFont({
  src: './SUIT-Variable.woff2',
  display: 'swap',
  variable: '--font-suit',
});

const robotoMonoFont = Roboto_Mono({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-roboto-mono',
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || null;

export const metadata = {
  title: '메이커스 블로그',
  description: '',
  openGraph: {
    title: '메이커스 블로그',
    description: 'SOPT Makers가 만들어가는 블로그입니다.',
    url: BASE_URL ?? undefined,
    type: 'article',
  },
  metadataBase: BASE_URL ? new URL(BASE_URL) : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={`${suitFont.variable} ${robotoMonoFont.variable} bg-black100`}>
      <body>
        <div className='min-h-screen text-white100'>{children}</div>
      </body>
    </html>
  );
}
