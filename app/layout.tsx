import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Loader from '@/components/Loader/Loader';
import { LoaderProvider } from '@/providers/LoaderContext';

const geistManrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Pet Love',
  description: 'Pets search application',
  icons: { icon: '/🐶 Favicon.png' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <LoaderProvider>
        <body className={`${geistManrope.variable} `}>
          <Header />
          <Loader />
          {children}
        </body>
      </LoaderProvider>
    </html>
  );
}
