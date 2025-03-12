import type {Metadata} from 'next';
import {Provider} from '@/components/ui/provider';
import localFont from 'next/font/local';
import './globals.css';
import PlayerLayout from '@/components/PlayerLayout';

const myFont = localFont({
  src: '../public/Vazirmatn[wght].woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'فرآواز',
  description: 'موسیقی در کنار آرامش',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body className={`${myFont.className} antialiased`}>
        <Provider>
          <PlayerLayout>{children}</PlayerLayout>
        </Provider>
      </body>
    </html>
  );
}
