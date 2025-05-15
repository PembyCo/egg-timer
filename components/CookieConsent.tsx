'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  // Function to set up analytics when user consents
  const setupAnalytics = () => {
    // This would be where you initialize analytics that require consent
    // For example, if you're using Google Analytics or other tracking
    
    // Example code if you were using Google Analytics:
    /*
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
    */
    
    // For Vercel Analytics, they respect DNT (Do Not Track) browser settings
    // No explicit enabling needed as it's already in your layout
  };

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    
    if (hasConsented === 'true') {
      // User previously accepted, set up analytics
      setupAnalytics();
    } else if (hasConsented === null) {
      // First visit, show consent dialog
      setShowConsent(true);
    }
    // If hasConsented is 'false', do nothing (user declined)
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setupAnalytics();
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookieConsent', 'false');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg border-t border-amber-200 dark:border-amber-800 p-4 z-50">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
          <p>
            We use cookies to improve your experience and analyze site usage. 
            Read our{' '}
            <Link href="/legal/privacy" className="text-amber-500 hover:underline">
              Privacy Policy
            </Link>
            {' '}for more information.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button 
            onClick={declineCookies}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-sm font-medium transition-colors flex-1 sm:flex-auto"
          >
            Decline
          </button>
          <button 
            onClick={acceptCookies}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-md text-sm font-medium transition-colors flex-1 sm:flex-auto"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
} 