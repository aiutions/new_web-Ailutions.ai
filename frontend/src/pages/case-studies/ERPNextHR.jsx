
import React from 'react';
import { ArrowLeft, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function ERPNextHRCaseStudy() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">ERPNext HR & Payroll: 90% Payroll Automation for a UAE Retail Group</h1>
            <p className="mt-4 text-lg text-gray-600">See how Ailutions streamlined HR and payroll for a major retailer in the UAE, achieving 99.5% accuracy and same-day processing.</p>
          </header>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-8 mb-12 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Challenge</p>
                <p className="text-2xl font-bold text-purple-800">Manual Payroll Errors & Delays</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Solution</p>
                <p className="text-2xl font-bold text-purple-800">Integrated ERPNext with Automation</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Outcome</p>
                <p className="text-2xl font-bold text-purple-800">90% Automated Payroll</p>
              </div>
            </div>
          </div>

          <div className="prose lg:prose-xl max-w-none text-gray-700">
            <p className="lead">A large retail group with multiple stores across the UAE was struggling with a decentralized and manual payroll system. The process was prone to errors, compliance risks, and significant delays, impacting employee morale and operational efficiency.</p>
            
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Challenge: Inaccurate and Delayed Payroll Processing</h2>
            <p>The retail group’s HR team had to manually collect attendance data, calculate overtime, and process payroll for hundreds of employees. This outdated method resulted in several critical problems:</p>
            <ul>
              <li><strong>Payroll Inaccuracies:</strong> Manual calculations frequently led to errors in salaries and deductions, causing employee dissatisfaction.</li>
              <li><strong>Compliance Risks:</strong> Keeping up with the UAE's labor laws and WPS requirements was challenging with a manual system.</li>
              <li><strong>Delayed Payments:</strong> The sheer volume of manual work meant that payroll processing took several days, often leading to payment delays.</li>
            </ul>

            <div className="my-12">
              <img src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop" alt="HR team collaborating in an office" className="rounded-lg shadow-lg" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Solution: A Unified ERPNext HR & Payroll System</h2>
            <p>Ailutions implemented a centralized HR and payroll system using ERPNext, customized to meet the specific needs of the UAE retail market. The solution provided a single source of truth for all HR-related data and automated key processes:</p>
            <ul>
              <li><strong>Automated Payroll Calculation:</strong> The system automatically calculated salaries, allowances, and deductions based on predefined rules, ensuring 99.5% accuracy.</li>
              <li><strong>WPS Compliance:</strong> The solution generated WPS-compliant salary files, simplifying the payment process and ensuring regulatory compliance.</li>
              <li><strong>Integrated HR Management:</strong> The ERPNext module handled everything from employee onboarding and attendance tracking to leave management and final settlements, all in one place.</li>
            </ul>

            <div className="bg-gray-50 p-8 rounded-lg my-12 text-center">
                <Zap className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">Achieving 99.5% Accuracy</h3>
                <p className="text-lg text-gray-600 mt-2">The automated system virtually eliminated payroll errors and enabled same-day payroll processing.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Results: Efficiency, Compliance, and Employee Satisfaction</h2>
            <p>The new ERPNext HR & Payroll system delivered significant improvements across the board:</p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">90% Payroll Automation</h4>
                  <p>The HR team’s manual workload was drastically reduced, allowing them to focus on strategic initiatives and employee development.</p>
                </div>
              </div>
              <div className="flex items-start">
                <TrendingUp className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Improved Employee Morale</h4>
                  <p>Timely and accurate salary payments boosted employee trust and satisfaction.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Zap className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Streamlined HR Operations</h4>
                  <p>Having a single, integrated system for all HR functions improved data accuracy and provided valuable insights for decision-making.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold">Streamline Your HR & Payroll Today</h2>
          <p className="mt-4 text-lg text-gray-300">Contact Ailutions to discover how our customized ERPNext solutions can bring efficiency and accuracy to your HR processes in the UAE.</p>
          <div className="mt-8">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => window.location.href='/free-assessment'}>Book a Free Consultation</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
