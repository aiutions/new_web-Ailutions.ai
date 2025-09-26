
import React from 'react';
import { ArrowLeft, CheckCircle, BarChart, Zap } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function AIFinanceOSCaseStudy() {
  return (
    <div className="bg-white text-gray-800 font-sans">
      <header className="bg-gray-50 border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => window.history.back()} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <a href="/"><img src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" alt="Ailutions Logo" className="h-8" /></a>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 md:py-20">
        <article className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">AI Finance OS: Automating Invoice Processing for a Leading UAE Trading Firm</h1>
            <p className="mt-4 text-lg text-gray-600">Discover how Ailutions helped a Dubai-based company reduce invoice processing time by over 28% and eliminate manual errors.</p>
          </header>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Challenge</p>
                <p className="text-2xl font-bold text-blue-800">4+ Hours Daily on Manual Invoicing</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Solution</p>
                <p className="text-2xl font-bold text-blue-800">AI-Powered Document Extraction</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Outcome</p>
                <p className="text-2xl font-bold text-blue-800">-28% Invoice Time</p>
              </div>
            </div>
          </div>

          <div className="prose lg:prose-xl max-w-none text-gray-700">
            <p className="lead">A prominent trading company in the UAE was struggling with a time-consuming and error-prone invoice management process. Their finance team spent over four hours each day manually entering data from hundreds of invoices, leading to costly delays and a high risk of human error.</p>
            
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Challenge: Manual Processes Hindering Growth</h2>
            <p>The firm’s reliance on manual data entry created significant operational bottlenecks. The process was not only slow but also lacked the scalability required to support the company's growth ambitions in the competitive UAE market. Key challenges included:</p>
            <ul>
              <li><strong>High Time Consumption:</strong> Over 4 hours of skilled employee time was dedicated daily to monotonous data entry.</li>
              <li><strong>Frequent Errors:</strong> Manual processing was prone to errors, leading to incorrect payments and strained supplier relationships.</li>
              <li><strong>Lack of Visibility:</strong> It was difficult to track invoices in real-time, causing delays in approvals and payments.</li>
            </ul>

            <div className="my-12">
              <img src="https://images.unsplash.com/photo-1554224155-169544351760?q=80&w=2070&auto=format&fit=crop" alt="Finance team working on invoices" className="rounded-lg shadow-lg" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Solution: Ailutions' AI Finance OS</h2>
            <p>Ailutions implemented its AI Finance OS, a comprehensive solution designed to automate the entire invoice processing workflow. The core of the solution was an advanced AI engine capable of:</p>
            <ul>
              <li><strong>Intelligent Document Extraction:</strong> The system automatically extracted key information from invoices, such as vendor details, invoice numbers, dates, and line items, with over 99% accuracy.</li>
              <li><strong>Automated Approval Workflows:</strong> Invoices were automatically routed to the correct approvers based on predefined rules, significantly speeding up the approval process.</li>
              <li><strong>Seamless ERP Integration:</strong> The AI Finance OS was integrated with the company's existing ERP system, ensuring that all data was synchronized in real-time without manual intervention.</li>
            </ul>

            <div className="bg-gray-50 p-8 rounded-lg my-12 text-center">
                <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">From 4 Hours to 45 Minutes</h3>
                <p className="text-lg text-gray-600 mt-2">The AI-powered solution reduced daily processing time from over 4 hours to just 45 minutes.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Results: Enhanced Efficiency and Accuracy</h2>
            <p>The implementation of the AI Finance OS yielded transformative results for the company:</p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">28% Reduction in Invoice Processing Time</h4>
                  <p>The finance team saved over 3 hours daily, freeing them up to focus on more strategic financial analysis.</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">99.5% Accuracy</h4>
                  <p>The AI solution eliminated manual data entry errors, ensuring accurate and timely payments.</p>
                </div>
              </div>
              <div className="flex items-start">
                <BarChart className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Improved Financial Visibility</h4>
                  <p>Real-time tracking and reporting provided complete visibility into the invoice lifecycle, enabling better financial planning.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold">Ready to Automate Your Finances?</h2>
          <p className="mt-4 text-lg text-gray-300">Contact Ailutions today for a free consultation and discover how our AI-powered solutions can transform your business in the UAE.</p>
          <div className="mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.location.href='/free-assessment'}>Get Started</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
