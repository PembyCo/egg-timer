import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeContext';
import { ThemeInitializer } from './theme-script';
import { Analytics } from '@vercel/analytics/next';
import { Montserrat, Poppins } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Egg Timer – Simple & Accurate Kitchen Timer',
  description: 'Use our free egg timer to get perfect hard, soft, and medium-boiled eggs every time.',
  metadataBase: new URL('https://eggsontime.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Egg Timer – Perfect Eggs Every Time',
    description: 'Set and track your eggs with ease. No signup required!',
    url: 'https://eggsontime.app',
    siteName: 'Eggs On Time',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Eggs On Time - Egg Timer App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Egg Timer – Perfect Eggs Every Time',
    description: 'Set and track your eggs with ease. No signup required!',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${poppins.variable}`}>
      <body>
        <ThemeInitializer />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
} 