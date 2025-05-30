import React from 'react';
import Header from "../components/Header";
import EggTimer from "../components/EggTimer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Eggs On Time – Perfect Eggs in Minutes! | Free Egg Timer App',
  description: 'Use our free egg timer to get perfect hard, soft, and medium-boiled eggs every time. Simple, reliable, and works on all devices. No signup required!',
  keywords: 'egg timer, boiled eggs, cooking timer, soft boiled eggs, hard boiled eggs, medium boiled eggs, kitchen timer, cooking app',
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
    site: '@eggsontime',
    creator: '@pembyCo',
  },
};

// This page will be statically generated at build time
export const dynamic = 'force-static';
export const revalidate = false;

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center px-3 py-6 sm:p-4">
      <Header />
      <EggTimer />
      
      {/* SEO Content Section */}
      <section className="w-full max-w-4xl mt-8 px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mb-4">
            Perfect Eggs Every Time
          </h2>
          <div className="prose prose-amber dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              <strong>Eggs On Time</strong> is your reliable companion for cooking perfect eggs. Whether you prefer soft, medium, or hard-boiled eggs, our timer ensures consistent results every time.
            </p>
            
            <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
              How to Use the Egg Timer
            </h3>
            <ol className="list-decimal list-inside text-gray-700 dark:text-gray-300 mb-4">
              <li>Choose your preferred egg consistency: soft, medium, or hard</li>
              <li>Click the start button to begin timing</li>
              <li>Listen for the notification when your eggs are ready</li>
              <li>Enjoy perfectly cooked eggs!</li>
            </ol>
            
            <h3 className="text-lg font-semibold text-amber-600 dark:text-amber-400 mb-2">
              Features
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              <li><strong>Three timing options:</strong> Soft (6 min), Medium (8 min), Hard (10 min)</li>
              <li><strong>Audio notifications:</strong> Clear sound alerts when timing is complete</li>
              <li><strong>Visual feedback:</strong> Animated egg visualization shows cooking progress</li>
              <li><strong>Mobile-friendly:</strong> Works perfectly on phones, tablets, and desktop</li>
              <li><strong>No registration required:</strong> Start cooking immediately</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
} 