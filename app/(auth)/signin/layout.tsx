import {Provider} from '@/components/ui/provider';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import '../../globals.css';

const myFont = localFont({
  src: '../../../public/Vazirmatn[wght].woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'فرآواز',
  description: 'موسیقی در کنار آرامش',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body className={`${myFont.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
