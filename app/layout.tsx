import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeContext';
import { ThemeInitializer } from './theme-script';
import { Analytics } from '@vercel/analytics/next';
import { Montserrat, Poppins, Pacifico } from 'next/font/google';
import Script from 'next/script';

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

const pacifico = Pacifico({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  variable: '--font-pacifico',
});

export const metadata: Metadata = {
  title: 'Eggs On Time – Perfect Eggs in Minutes!',
  description: 'Use our free egg timer to get perfect hard, soft, and medium-boiled eggs every time.',
  metadataBase: new URL('https://eggsontime.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Eggs On Time – Perfect Eggs in Minutes!',
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
    title: 'Eggs On Time – Perfect Eggs in Minutes!',
    description: 'Set and track your eggs with ease. No signup required!',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'rjHZhRYUeTHE2iBt9uJUgHd3qVdN0ajbC6YIWG7GonE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${montserrat.variable} ${poppins.variable} ${pacifico.variable}`}>
      <body>
        <ThemeInitializer />
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Analytics />
        <Script id="schema-structured-data" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HowTo",
              "name": "How to Use the Egg Timer",
              "step": [
                { "@type": "HowToStep", "text": "Choose soft, medium, or hard" },
                { "@type": "HowToStep", "text": "Click start" },
                { "@type": "HowToStep", "text": "Listen for the ding!" }
              ],
              "tool": "Egg Timer App",
              "image": "https://eggsontime.app/og-image.png",
              "url": "https://eggsontime.app/"
            }
          `}
        </Script>
      </body>
    </html>
  );
} 