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
  other: {
    'google-adsense-account': 'ca-pub-5831273475381084',
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
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex space-x-4">
                <Link href="/legal/terms" className="hover:text-amber-500 dark:hover:text-amber-400">Terms</Link>
                <span>•</span>
                <Link href="/legal/privacy" className="hover:text-amber-500 dark:hover:text-amber-400">Privacy</Link>
                <span>•</span>
                <span>© {new Date().getFullYear()} PembyCo</span>
              </div>
              <div className="flex space-x-3">
                <a href="https://twitter.com/pembyCo" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 dark:hover:text-amber-400" aria-label="Follow us on Twitter">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://github.com/PembyCo/egg-timer" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 dark:hover:text-amber-400" aria-label="View source on GitHub">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
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