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

export const metadata = {
  title: '메이커스 블로그',
  description: '',
  openGraph: {
    title: '메이커스 블로그',
  },
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
