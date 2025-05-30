import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - Eggs On Time | Data Protection & Cookie Policy',
  description: 'Learn how Eggs On Time protects your privacy. Our comprehensive privacy policy covers data collection, cookies, GDPR compliance, and your rights.',
  openGraph: {
    title: 'Privacy Policy - Eggs On Time',
    description: 'Privacy policy for the Eggs On Time egg timer application.',
    url: 'https://eggsontime.app/legal/privacy',
    siteName: 'Eggs On Time',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy - Eggs On Time',
    description: 'Privacy policy for the Eggs On Time egg timer application.',
    site: '@eggsontime',
    creator: '@pembyCo',
  },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center px-3 py-6 sm:p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
        <div className="mb-8">
          <Link href="/" className="text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Egg Timer
          </Link>
          
          <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400">Last updated: 15 May 2025</p>
          <div className="mt-4 text-gray-600 dark:text-gray-300">
            <p>Controller: LPR Nexus LTD trading as PembyCo</p>
            <p>Contact: <a href="mailto:hello@lprnexus.com" className="text-amber-500 hover:underline">hello@lprnexus.com</a></p>
          </div>
        </div>

        <div className="prose prose-amber dark:prose-invert max-w-none">
          <p className="dark:text-white">We respect your privacy worldwide. This Policy explains what we collect, why, how we use it, and your rights under various laws (GDPR, CCPA, COPPA, LGPD, PIPEDA, APPs, APPI, etc.).</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">1. Data We Collect</h2>
          <p className="font-semibold dark:text-white">Analytics & Telemetry</p>
          <ul className="list-disc pl-6 mb-4 dark:text-white">
            <li>Providers: Google Analytics, Cursor AI telemetry, Vercel Analytics</li>
            <li>Data: anonymised IP address, device/browser info, session duration, feature usage</li>
          </ul>

          <p className="font-semibold dark:text-white">Cookies & localStorage</p>
          <ul className="list-disc pl-6 dark:text-white">
            <li>Cookies: only set after you consent to analytics cookies</li>
            <li>localStorage: stores your timer settings and in-progress inputs</li>
          </ul>

          <p className="dark:text-white">We do not collect your name, email, precise location, or other personal identifiers.</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">2. How We Use Your Data</h2>
          <p className="dark:text-white"><strong>Improvement & Diagnostics:</strong> to analyse performance, fix errors, and enhance features.</p>
          <p className="dark:text-white"><strong>Compliance & Security:</strong> to detect and prevent abuse.</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">3. Legal Bases under GDPR</h2>
          <p className="dark:text-white"><strong>Legitimate Interests:</strong> for analytics and product improvement, balanced against your privacy.</p>
          <p className="dark:text-white"><strong>Consent:</strong> for any non-essential cookies or tracking (you can withdraw consent at any time).</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">4. Cookies & Tracking Consent</h2>
          <p className="dark:text-white">We present a banner on first visit:</p>
          <ul className="list-disc pl-6 dark:text-white">
            <li>Explains cookie categories (essential, analytics, functional).</li>
            <li>Allows you to accept or reject each category.</li>
            <li>Analytics cookies only load after you opt in.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6 dark:text-white">5. International Data Transfers</h2>
          <p className="dark:text-white">Analytics providers may process data outside the UK/EEA (e.g., in the U.S.). We rely on Standard Contractual Clauses (UK-approved SCCs) or equivalent safeguards to protect your data.</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">6. Data Retention & Security</h2>
          <p className="dark:text-white">We do not retain personal data ourselves; it is held by our analytics providers under their policies.</p>
          <p className="dark:text-white">All communications occur over HTTPS; data in transit is encrypted.</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">7. Your Rights</h2>
          <p className="font-semibold dark:text-white">Under GDPR (EU/UK) – Articles 15–22</p>
          <p className="dark:text-white">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 dark:text-white">
            <li>Access the personal data we hold.</li>
            <li>Rectify inaccurate data.</li>
            <li>Erase your data (&quot;right to be forgotten&quot;).</li>
            <li>Restrict processing.</li>
            <li>Port your data to another controller.</li>
            <li>Object to processing based on legitimate interests.</li>
            <li>Withdraw consent for any processing that relied on it.</li>
          </ul>

          <p className="font-semibold dark:text-white">California Residents (CCPA)</p>
          <p className="dark:text-white">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 dark:text-white">
            <li>Know what personal data is collected, used, shared, or sold.</li>
            <li>Delete personal information we hold about you.</li>
            <li>Opt-out of sale of your personal information (we do not sell data, but you may still request opt-out).</li>
            <li>Non-discrimination for exercising your rights.</li>
          </ul>

          <p className="dark:text-white">To exercise any rights, or if you have questions, email <a href="mailto:hello@lprnexus.com" className="text-amber-500 hover:underline">hello@lprnexus.com</a>.</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">8. Children&apos;s Privacy (COPPA)</h2>
          <p className="dark:text-white">The App is not intended for users under 13. We do not knowingly collect personal data from children under 13; any such data will be deleted promptly.</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">9. Global Compliance Notice</h2>
          <p className="dark:text-white">Residents of other jurisdictions (e.g., Canada&apos;s PIPEDA, Brazil&apos;s LGPD, Australia&apos;s APPs, Japan&apos;s APPI) may have additional rights under local law. Please contact us at <a href="mailto:hello@lprnexus.com" className="text-amber-500 hover:underline">hello@lprnexus.com</a> for more information.</p>

          <h2 className="text-xl font-bold mt-6 dark:text-white">10. Changes to This Policy</h2>
          <p className="dark:text-white">We may update this Policy; the &quot;Last updated&quot; date will change accordingly. Please review periodically.</p>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/legal/terms" className="text-amber-500 hover:text-amber-600 dark:text-amber-400 hover:underline">
              Terms & Conditions
            </Link>
            <Link href="/" className="text-amber-500 hover:text-amber-600 dark:text-amber-400 hover:underline">
              Back to Egg Timer
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
} 