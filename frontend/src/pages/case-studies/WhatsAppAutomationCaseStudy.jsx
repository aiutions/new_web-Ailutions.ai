
import React from 'react';
import { Button } from '../../components/ui/button';
import { ArrowRight, Zap, CheckCircle, Clock, BarChart, TrendingUp, Users, MessageSquare, MapPin, DollarSign, ArrowDown, ArrowUp, ThumbsUp, AlertTriangle, PlayCircle } from 'lucide-react';

const MetricCard = ({ icon, value, label, improvement, isPositive }) => (
  <div className="bg-luxury-bg-secondary p-6 rounded-lg border border-luxury-grid-divider luxury-card">
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-3xl font-bold text-luxury-text-heading">{value}</p>
          <p className="text-luxury-text-body">{label}</p>
        </div>
      </div>
      {improvement && (
        <div className={`flex items-center space-x-1 text-sm font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span>{improvement}</span>
        </div>
      )}
    </div>
  </div>
);

const BestPracticeCard = ({ icon, title, description }) => (
    <div className="bg-luxury-bg-secondary p-6 rounded-lg border border-luxury-grid-divider luxury-card h-full">
        {icon}
        <h3 className="text-xl font-bold text-luxury-text-heading mt-4 mb-2">{title}</h3>
        <p className="text-luxury-text-body">{description}</p>
    </div>
);


const Section = ({ title, subtitle, children, titleClassName = "text-4xl md:text-5xl" }) => (
    <section className="py-16 border-b border-luxury-grid-divider">
        <div className="max-w-4xl mx-auto text-center">
            <h2 className={`${titleClassName} font-bold text-luxury-text-heading mb-4`}>{title}</h2>
            {subtitle && <p className="text-xl text-luxury-text-body max-w-3xl mx-auto">{subtitle}</p>}
            <div className="w-24 h-1.5 gradient-ai mx-auto mt-6 mb-12 rounded-full"></div>
        </div>
        <div className="max-w-5xl mx-auto px-6">
            {children}
        </div>
    </section>
);


export default function WhatsAppAutomationCaseStudy() {
  return (
    <div className="bg-luxury-bg-primary text-luxury-text-primary">
       <header className="sticky top-0 z-50 w-full border-b border-luxury-grid-divider bg-luxury-bg-primary/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <a href="/">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/lr58t0dk_ailutions.%20logo.svg" 
                  alt="Ailutions Logo" 
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
                <a href="/#problem" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">Problems We Solve</a>
                <a href="/#services" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">How It Works</a>
                <a href="/case-studies" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">Results</a>
                <Button onClick={() => window.location.href = '/#contact'} className="btn-primary btn-small rounded-full">
                  Get Started
                </Button>
            </nav>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <div className="text-center py-20 px-6 bg-luxury-bg-secondary border-b border-luxury-grid-divider">
            <h1 className="text-4xl md:text-6xl font-bold text-luxury-text-heading leading-tight">
                How a Dubai Real Estate Firm 
                <span className="gradient-ai-text block">Doubled Leads & Cut Response Time</span>
            </h1>
            <p className="text-xl text-luxury-text-body mt-6 max-w-3xl mx-auto">
                A deep dive into using WhatsApp Automation to turn a leaky sales funnel into a high-converting machine.
            </p>
        </div>

        {/* 1. The Problem */}
        <Section title="The Problem: Leads Were Going Cold" subtitle="This Dubai real estate agency was leaving money on the table. Their lead management was slow, inconsistent, and costing them deals.">
            <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-luxury-bg-secondary p-6 rounded-lg border border-red-500/30 luxury-card">
                    <Clock className="w-10 h-10 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-luxury-text-heading">Hours-Long Delays</h3>
                    <p className="text-luxury-text-body">Incoming leads from social media and their website sat unattended for over 12 hours. In Dubai's fast market, that’s a lifetime.</p>
                </div>
                <div className="bg-luxury-bg-secondary p-6 rounded-lg border border-red-500/30 luxury-card">
                    <MessageSquare className="w-10 h-10 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-luxury-text-heading">Inconsistent Follow-Ups</h3>
                    <p className="text-luxury-text-body">Manual follow-ups were erratic. Agents were overwhelmed, and potential buyers were slipping through the cracks.</p>
                </div>
                <div className="bg-luxury-bg-secondary p-6 rounded-lg border border-red-500/30 luxury-card">
                    <Users className="w-10 h-10 text-red-500 mb-4" />
                    <h3 className="text-xl font-bold text-luxury-text-heading">Chaotic WhatsApp Use</h3>
                    <p className="text-luxury-text-body">Individual agent accounts led to missed messages, duplicate responses, and the constant risk of being suspended.</p>
                </div>
                <div className="bg-luxury-bg-secondary p-6 rounded-lg border border-red-500/30 luxury-card">
                     <TrendingUp className="w-10 h-10 text-red-500 mb-4 -scale-y-100" />
                    <h3 className="text-xl font-bold text-luxury-text-heading">Low Conversion Rates</h3>
                    <p className="text-luxury-text-body">Weak early engagement meant a low lead-to-deal conversion rate. The question was clear: "How do we fix this?"</p>
                </div>
            </div>
        </Section>

        {/* 2. The Hypothesis */}
        <Section title="The Strategy: Automate the First Touch" subtitle="They believed that if they could automate instant responses and qualification via WhatsApp, they could stop the bleeding and build a scalable sales engine.">
            <div className="space-y-6 text-left max-w-3xl mx-auto">
                <div className="flex items-start space-x-4">
                    <Zap className="w-8 h-8 text-luxury-ai-start flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold">Cut Lead Loss with Instantaneous Response</h3>
                        <p className="text-luxury-text-body">Automate the first touch to engage leads in seconds, not hours, and qualify them on the spot.</p>
                    </div>
                </div>
                <div className="flex items-start space-x-4">
                    <CheckCircle className="w-8 h-8 text-luxury-ai-start flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold">Nurture Leads Automatically</h3>
                        <p className="text-luxury-text-body">Integrate the agent with their CRM and property catalogs to send follow-ups and listings without manual oversight.</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-4">
                    <BarChart className="w-8 h-8 text-luxury-ai-start flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-xl font-bold">Track Everything</h3>
                        <p className="text-luxury-text-body">Focus on hard metrics: response time, lead volume, conversion rate, and cost per lead to measure true ROI.</p>
                    </div>
                </div>
            </div>
        </Section>
        
        {/* 4. The Results */}
        <Section title="The Results: Metrics After 90 Days" subtitle="The numbers don't lie. After implementing the WhatsApp agent, performance skyrocketed across the board.">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <MetricCard icon={<Clock className="w-8 h-8 text-blue-500" />} value="< 2 mins" label="Lead Response Time" improvement="90% faster" isPositive={true} />
                <MetricCard icon={<ArrowUp className="w-8 h-8 text-green-500" />} value="+100%" label="Lead Volume (WhatsApp)" improvement="200 to 400/mo" isPositive={true} />
                <MetricCard icon={<TrendingUp className="w-8 h-8 text-green-500" />} value="2.5x" label="First-Time Conversion" improvement="From 15% to 37%" isPositive={true} />
                <MetricCard icon={<DollarSign className="w-8 h-8 text-green-500" />} value="2.5x" label="Lead-to-Deal Conversion" improvement="From 2% to 5%" isPositive={true} />
                <MetricCard icon={<ArrowDown className="w-8 h-8 text-green-500" />} value="-48%" label="Cost Per Lead" improvement="From AED 35 to AED 18" isPositive={true} />
                <MetricCard icon={<BarChart className="w-8 h-8 text-blue-500" />} value="+26%" label="Dubai Transactions (YoY)" improvement="Market is hot" isPositive={true} />
            </div>
             <p className="text-center text-luxury-text-secondary mt-8 text-sm">Data aligned with public reports from firms like Footprint Real Estate and market trends.</p>
        </Section>

        {/* 5. Best Practices */}
        <Section title="Learnings & Best Practices" subtitle="Here’s what made the project a success. These are non-negotiable for real estate automation.">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <BestPracticeCard icon={<Zap className="w-10 h-10 text-luxury-ai-start" />} title="Be Instant" description="The first 60 seconds are critical. Leads drop off after just 5 minutes. Your agent must respond immediately." />
                <BestPracticeCard icon={<CheckCircle className="w-10 h-10 text-luxury-ai-start" />} title="Ask the Right Questions" description="Qualify leads with minimal friction: budget range, preferred area, property type. Get the info you need, fast." />
                <BestPracticeCard icon={<Users className="w-10 h-10 text-luxury-ai-start" />} title="Human Handoff is Key" description="For complex queries (legal, financing), the bot must seamlessly forward the conversation with full context to a human agent." />
                <BestPracticeCard icon={<MessageSquare className="w-10 h-10 text-luxury-ai-start" />} title="Use Smart Follow-Ups" description="If a user goes silent, send gentle reminders. 'Still interested? I have more properties that match your criteria.'" />
                <BestPracticeCard icon={<AlertTriangle className="w-10 h-10 text-yellow-500" />} title="Respect WhatsApp Policies" description="Use pre-approved templates, get opt-ins, and respect the 24-hour messaging window to avoid account suspension." />
                <BestPracticeCard icon={<PlayCircle className="w-10 h-10 text-luxury-ai-start" />} title="Use Rich Media" description="Send images, video tours, and floorplans directly in the chat. Visuals drive engagement and decisions." />
            </div>
        </Section>

        {/* 8. Call to Action */}
         <div className="bg-luxury-bg-secondary border-t border-luxury-grid-divider">
            <div className="max-w-4xl mx-auto py-20 px-6 text-center">
                <h2 className="text-4xl md:text-5xl font-bold text-luxury-text-heading mb-6">Ready to Replicate These Results?</h2>
                <p className="text-xl text-luxury-text-body mb-8 max-w-3xl mx-auto">
                    If you're ready to respond in seconds, qualify leads automatically, and close more deals, let's talk. We'll implement a WhatsApp sales & support agent built for your listings and the unique Dubai market.
                </p>
                <Button onClick={() => window.location.href = '/#contact'} className="btn-primary btn-large rounded-full group">
                    Book a Free Strategy Call
                    <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
                 <p className="text-sm text-luxury-text-secondary mt-4">Your edge in the Dubai property race begins with automation.</p>
            </div>
        </div>
      </main>

      <footer className="bg-luxury-text-heading text-white py-12 border-t border-luxury-grid-divider">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400">© 2025 Ailutions. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
