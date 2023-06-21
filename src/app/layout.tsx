import './globals.css';

import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

import { BASE_URL } from '@/const';

export const metadata = {
  title: '메이커스 블로그',
  description: '',
  openGraph: {
    title: '메이커스 블로그',
    description: 'SOPT Makers가 만들어가는 블로그입니다.',
    url: BASE_URL ?? undefined,
    type: 'website',
  },
  metadataBase: BASE_URL ? new URL(BASE_URL) : undefined,
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      'index': false,
      'follow': true,
      'noimageindex': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const suitFont = localFont({
  src: [
    {
      path: './SUIT-Light.woff2',
      weight: '300',
    },
    {
      path: './SUIT-Regular.woff2',
      weight: '400',
    },
    {
      path: './SUIT-Medium.woff2',
      weight: '500',
    },
    {
      path: './SUIT-SemiBold.woff2',
      weight: '600',
    },
    {
      path: './SUIT-Bold.woff2',
      weight: '700',
    },
  ],
  display: 'swap',
  variable: '--font-suit',
});

const robotoMonoFont = Roboto_Mono({
  display: 'swap',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={`${suitFont.variable} ${robotoMonoFont.variable} bg-black100`}>
      <body>
        <div className='min-h-screen text-white100'>{children}</div>
      </body>
    </html>
  );
}
