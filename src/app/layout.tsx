import './globals.css';

import localFont from 'next/font/local';

const myFont = localFont({
  src: './SUIT-Variable.woff2',
  display: 'swap',
  variable: '--font-suit',
});

export const metadata = {
  title: '메이커스 블로그',
  description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ko' className={`${myFont.variable} bg-black100`}>
      <body>
        <div className='min-h-screen text-white100'>{children}</div>
      </body>
    </html>
  );
}
