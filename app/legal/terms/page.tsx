import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions - Eggs On Time',
  description: 'Terms and conditions for using the Eggs On Time egg timer application.',
};

export default function TermsPage() {
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
          
          <h1 className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">Terms & Conditions</h1>
          <p className="text-gray-500 dark:text-gray-400">Last updated: 15 May 2025</p>
          <div className="mt-4 text-gray-600 dark:text-gray-300">
            <p>Provider: LPR Nexus LTD (reg. no. 16356758 in England & Wales) trading as PembyCo</p>
            <p>Registered office: The Accountancy Partnership, Twelve Quays House, Egerton Wharf, Wirral, CH41 1LD</p>
            <p>Contact (legal): <a href="mailto:hello@lprnexus.com" className="text-amber-500 hover:underline">hello@lprnexus.com</a></p>
          </div>
        </div>

        <div className="prose prose-amber dark:prose-invert max-w-none">
          <p>By accessing or using the Egg Timer app ("the App"), you agree to these Terms. If you do not agree, please stop using the App immediately.</p>

          <h2 className="text-xl font-bold mt-6">1. Eligibility & Age Requirements</h2>
          <p>You must be at least 13 years old to use the App.</p>
          <p>We do not knowingly collect personal data from children under 13; if we learn we have, we will delete it promptly.</p>

          <h2 className="text-xl font-bold mt-6">2. Licence & Ownership</h2>
          <p>We grant you a limited, revocable, non-exclusive licence to use the App for personal cooking-timer purposes.</p>
          <p>All intellectual property rights in the App (code, design, trademarks) are owned by LPR Nexus LTD.</p>

          <h2 className="text-xl font-bold mt-6">3. Acceptable Use</h2>
          <p>You must not:</p>
          <ul className="list-disc pl-6">
            <li>Reverse-engineer, decompile, or modify the App.</li>
            <li>Use the App for unlawful purposes or in breach of any applicable laws or regulations.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with anyone.</li>
          </ul>

          <h2 className="text-xl font-bold mt-6">4. Disclaimers & Safety</h2>
          <p><strong>No Warranty:</strong> The App is provided "as-is" and "as-available," without any warranty of any kind.</p>
          <p><strong>Use at Your Own Risk:</strong> You assume all risk for cooking results. We accept no liability for under- or over-cooked eggs or any injury or damage arising from use of the App.</p>

          <h2 className="text-xl font-bold mt-6">5. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, LPR Nexus LTD shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from your use of (or inability to use) the App, even if advised of the possibility of such damages.</p>

          <h2 className="text-xl font-bold mt-6">6. Termination</h2>
          <p>We may suspend or terminate your access to the App at any time, without notice, for any reason, including for breach of these Terms.</p>

          <h2 className="text-xl font-bold mt-6">7. Changes to Terms</h2>
          <p>We reserve the right to update these Terms at any time by posting a new version here. Your continued use after changes implies your acceptance.</p>

          <h2 className="text-xl font-bold mt-6">8. Governing Law & Dispute Resolution</h2>
          <p>These Terms are governed by the laws of England & Wales. You agree that any dispute will be resolved exclusively in the courts of England & Wales.</p>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <Link href="/legal/privacy" className="text-amber-500 hover:text-amber-600 dark:text-amber-400 hover:underline">
              Privacy Policy
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