
import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
          <p className="text-gray-700 mb-6">
            Welcome to our website. By accessing and using this website, you agree to be bound by the following terms and conditions of use.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use of Website</h2>
          <p className="text-gray-700 mb-6">
            The content of the pages of this website is for your general information and use only. It is subject to change without notice.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Disclaimer</h2>
          <p className="text-gray-700 mb-6">
            The information provided on this website is for general informational purposes only. We make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-700 mb-6">
            In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
          </p>
        </div>
      </main>
    </div>
  );
}
