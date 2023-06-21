import './globals.css';

import { Roboto_Mono } from 'next/font/google';
import localFont from 'next/font/local';

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
