
import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-luxury-bg-primary">
      <header className="fixed top-0 w-full z-50 bg-luxury-bg-primary/95 backdrop-blur-md border-b border-luxury-grid-divider shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img 
                src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" 
                alt="Ailutions Logo" 
                className="h-8 sm:h-10 w-auto hover:scale-105 transition-transform duration-200"
              />
            </a>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white shadow-sm rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
          <p className="text-gray-700 mb-6">
            We may collect personal information from you such as your name, email address, and other contact details when you use our website or services.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
          <p className="text-gray-700 mb-6">
            We may use the information we collect from you to provide, maintain, and improve our services, and to send you promotional communications.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
          <p className="text-gray-700 mb-6">
            We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Security</h2>
          <p className="text-gray-700 mb-6">
            We are committed to ensuring that your information is secure. We have put in place suitable physical, electronic, and managerial procedures to safeguard and secure the information we collect online.
          </p>
        </div>
      </main>
    </div>
  );
}
