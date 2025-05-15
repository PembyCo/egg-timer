import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeContext';
import { ThemeInitializer } from './theme-script';
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
  title: 'Eggs On Time',
  description: 'A beautiful egg timer application for cooking perfect eggs',
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
      </body>
    </html>
  );
} 