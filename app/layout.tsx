import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ThemeContext';
import { ThemeInitializer } from './theme-script';
import { Analytics } from '@vercel/analytics/next';
import { Montserrat, Poppins, Pacifico } from 'next/font/google';
import Script from 'next/script';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Import CookieConsent with dynamic to avoid hydration issues with localStorage
const CookieConsent = dynamic(() => import('../components/CookieConsent'), {
  ssr: false,
});

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
  icons: {
    icon: [
      { url: '/favicon-square.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/favicon-square.svg', type: 'image/svg+xml' },
    ],
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
      <body className="flex flex-col min-h-screen">
        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5831273475381084"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics with Consent Mode */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FP7FK0DTHJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Default consent to denied until user accepts
            gtag('consent', 'default', {
              'analytics_storage': 'denied'
            });
            
            // Check if user has already given consent
            const hasConsented = localStorage.getItem('cookieConsent');
            if (hasConsented === 'true') {
              gtag('consent', 'update', {
                'analytics_storage': 'granted'
              });
            }
            
            gtag('config', 'G-FP7FK0DTHJ', {
              'anonymize_ip': true
            });
          `}
        </Script>
        <ThemeInitializer />
        <ThemeProvider>
          <div className="flex-grow">
            {children}
          </div>
          <footer className="w-full bg-white dark:bg-[#1f2937] mx-auto flex justify-center p-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex space-x-4">
              <Link href="/legal/terms" className="hover:text-amber-500 dark:hover:text-amber-400">Terms</Link>
              <span>•</span>
              <Link href="/legal/privacy" className="hover:text-amber-500 dark:hover:text-amber-400">Privacy</Link>
              <span>•</span>
              <span>© {new Date().getFullYear()} PembyCo</span>
            </div>
          </footer>
          <CookieConsent />
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