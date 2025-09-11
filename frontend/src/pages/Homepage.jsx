import React from 'react';
import { Button } from '../components/ui/button';
import { AnimatedHeroBackground } from '../components/AnimatedHeroBackground';
import { TrustBar } from '../components/TrustBar';
import { ProblemSection } from '../components/ProblemSection';
import { SolutionSection } from '../components/SolutionSection';
import { OfferSection } from '../components/OfferSection';
import { LeadMagnetSection } from '../components/LeadMagnetSection';
import { InteractiveCaseStudyCard } from '../components/InteractiveCaseStudyCard';
import { AboutSection } from '../components/AboutSection';
import { CTABanner } from '../components/CTABanner';
import { ConversationalContactForm } from '../components/ConversationalContactForm';
import { ArrowRight, Sparkles, Target, MessageCircle } from 'lucide-react';
import { caseStudiesData, contactData } from '../data/mock';

export default function Homepage() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-blue-600 to-green-600">
                Ailutions
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#problem" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Problems We Solve</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">How It Works</a>
              <a href="#case-studies" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Results</a>
              <a href="/digital-maturity-tracker" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Free Assessment</a>
              <Button 
                onClick={scrollToContact}
                size="sm" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white rounded-full px-6 hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hormozi-Style Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <AnimatedHeroBackground />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 rounded-full px-6 py-3 shadow-lg font-semibold">
              <Target className="w-5 h-5" />
              <span>Proven Results • No Fluff • Outcome-Driven</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900 leading-tight">
              We help businesses 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block">
                automate operations
              </span>
              & scale faster with AI
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-medium">
              <strong>Without expensive IT projects or wasted effort.</strong>
            </p>
            
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Ailutions builds custom AI tools, integrates AI into your existing systems, automates sales & operations, and implements ERPNext tailored to your business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
              <Button 
                onClick={() => window.location.href = '/digital-maturity-tracker'}
                size="lg" 
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-12 py-6 rounded-2xl text-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl btn-pulse"
              >
                Start Free Digital Maturity Assessment
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              
              <Button 
                onClick={scrollToContact}
                variant="outline" 
                size="lg"
                className="border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-bold px-12 py-6 rounded-2xl text-xl hover:scale-110 transition-all duration-300 bg-white/80 backdrop-blur-sm hover:shadow-xl"
              >
                Book a Free Strategy Call
              </Button>
            </div>
            
            <p className="text-lg text-gray-600 font-medium">
              ⚡ <strong>FREE assessment</strong> • 3 minutes • Instant results • No strings attached
            </p>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Problem Section - Hormozi Style */}
      <ProblemSection />

      {/* Solution Section */}
      <SolutionSection />

      {/* Offer Section - Value Stack */}
      <OfferSection />

      {/* Lead Magnet Section */}
      <LeadMagnetSection />

      {/* Case Studies */}
      <section id="case-studies" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {caseStudiesData.headline}
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Real results from real businesses. These companies eliminated manual work and scaled faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {caseStudiesData.cards.map((study, index) => (
              <InteractiveCaseStudyCard
                key={index}
                title={study.title}
                metric={study.metric}
                problem={study.problem}
                solution={study.solution}
                outcome={study.outcome}
                details={study.details}
              />
            ))}
          </div>
          
          <div className="text-center">
            <Button
              onClick={() => alert('Navigate to full case studies page')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-10 py-4 rounded-2xl text-lg hover:scale-105 transition-all duration-300"
            >
              View More Case Studies
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* CTA Banner */}
      <CTABanner />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {contactData.headline}
            </h2>
            <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
            <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
              Ready to automate your business and scale faster? Let's start the conversation.
            </p>
          </div>
          
          <ConversationalContactForm />
          
          {/* Additional contact options */}
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Button
                onClick={() => window.open('https://calendly.com/ailutions', '_blank')}
                variant="outline"
                className="p-6 h-auto flex-col space-y-2 hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-semibold">Book a Call</div>
                  <div className="text-sm text-gray-500">15-minute strategy session</div>
                </div>
              </Button>
              
              <Button
                onClick={() => window.open('https://wa.me/YOUR_WHATSAPP', '_blank')}
                variant="outline"
                className="p-6 h-auto flex-col space-y-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="w-8 h-8 text-green-600" />
                <div>
                  <div className="font-semibold">WhatsApp</div>
                  <div className="text-sm text-green-600">Instant response</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-400">
                  Ailutions
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                AI that powers your business. Automate operations, eliminate manual work, and scale faster.
              </p>
              <p className="text-sm text-gray-500">
                No fluff. No BS. Just results.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Custom AI Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Integration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Process Automation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ERPNext Implementation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Free Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/digital-maturity-tracker" className="hover:text-white transition-colors">Digital Maturity Assessment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Automation Playbook</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ROI Calculator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>hello@ailutions.com</li>
                <li>+1 (555) 123-4567</li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Book a Strategy Call</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Ailutions. All rights reserved. We help businesses automate and scale.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}