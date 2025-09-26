
import React from 'react';
import { ArrowLeft, CheckCircle, Zap, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';

export default function WhatsAppAgentCaseStudy() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">WhatsApp Automation: Slashing No-Show Rates for a Dubai Health Clinic</h1>
            <p className="mt-4 text-lg text-gray-600">Learn how an AI-powered WhatsApp agent increased appointment attendance from 40% to 85% for a leading UAE healthcare provider.</p>
          </header>

          <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12 shadow-sm">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Challenge</p>
                <p className="text-2xl font-bold text-green-800">High No-Show Rates</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Solution</p>
                <p className="text-2xl font-bold text-green-800">AI WhatsApp Agent</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm uppercase font-semibold">The Outcome</p>
                <p className="text-2xl font-bold text-green-800">60% Fewer No-Shows</p>
              </div>
            </div>
          </div>

          <div className="prose lg:prose-xl max-w-none text-gray-700">
            <p className="lead">A prestigious health clinic in Dubai was facing a significant revenue leakage due to high appointment no-show rates. Manual reminders were inefficient and did not allow for easy rescheduling, causing frustration for both staff and patients.</p>
            
            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Challenge: Lost Revenue and Inefficient Scheduling</h2>
            <p>The clinic’s front-desk staff were overwhelmed with manually calling patients for appointment reminders. This approach was not only time-intensive but also ineffective, with appointment attendance hovering around a mere 40%. The primary issues were:</p>
            <ul>
              <li><strong>Ineffective Reminders:</strong> Phone calls were often missed, and manual text messages lacked personalization and interactivity.</li>
              <li><strong>Difficult Rescheduling:</strong> Patients found it cumbersome to reschedule, often leading them to simply not show up.</li>
              <li><strong>Wasted Staff Time:</strong> Administrative staff spent hours each day on reminder calls, diverting their focus from patient care and other critical tasks.</li>
            </ul>

            <div className="my-12">
              <img src="https://images.unsplash.com/photo-1581092580489-c52e1c140e6c?q=80&w=2070&auto=format&fit=crop" alt="Doctor checking schedule on a tablet" className="rounded-lg shadow-lg" />
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Solution: An Intelligent AI WhatsApp Agent</h2>
            <p>Ailutions deployed a sophisticated AI WhatsApp agent to automate the entire appointment management process. The agent was designed to provide a seamless and interactive experience for patients:</p>
            <ul>
              <li><strong>Automated, Smart Reminders:</strong> The agent sent personalized appointment reminders via WhatsApp at optimal times, significantly increasing visibility.</li>
              <li><strong>Effortless Rescheduling:</strong> Patients could confirm, cancel, or reschedule their appointments directly within the WhatsApp chat by conversing with the AI.</li>
              <li><strong>24/7 Availability:</strong> The AI agent was available around the clock to handle patient requests, improving patient satisfaction and operational efficiency.</li>
            </ul>

            <div className="bg-gray-50 p-8 rounded-lg my-12 text-center">
                <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">From 40% to 85% Attendance</h3>
                <p className="text-lg text-gray-600 mt-2">The AI agent more than doubled the appointment attendance rate, transforming the clinic's operational efficiency.</p>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">The Results: A Healthier Bottom Line</h2>
            <p>The implementation of the AI WhatsApp Agent brought about a dramatic improvement in the clinic's performance:</p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="w-6 h-6 text-green-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">60% Reduction in No-Shows</h4>
                  <p>Appointment attendance soared from 40% to 85%, significantly boosting the clinic's revenue and resource utilization.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="w-6 h-6 text-blue-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Enhanced Patient Experience</h4>
                  <p>Patients appreciated the convenience of managing their appointments via WhatsApp, leading to higher satisfaction and loyalty.</p>
                </div>
              </div>
              <div className="flex items-start">
                <Zap className="w-6 h-6 text-yellow-500 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-lg">Increased Staff Productivity</h4>
                  <p>Automating reminders and rescheduling freed up administrative staff to focus on providing better in-clinic patient service.</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>

      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold">Ready to Eliminate No-Shows?</h2>
          <p className="mt-4 text-lg text-gray-300">Contact Ailutions today to learn how our AI-powered WhatsApp agents can help your business in the UAE improve efficiency and customer engagement.</p>
          <div className="mt-8">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => window.location.href='/free-assessment'}>Request a Demo</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
