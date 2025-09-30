import React, { useState } from 'react';
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
import { ArrowRight, Sparkles, Target, MessageCircle, Menu, Mail, Phone, Linkedin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Whatsapp } from 'react-bootstrap-icons';
import { caseStudiesData, contactData } from '../data/mock';
import Drawer from '../components/ui/drawer';

export default function Homepage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsDrawerOpen(false);
  };

  return (
    <div className="min-h-screen bg-luxury-bg-primary">
      {/* Header */}
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
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <a href="#problem" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">Problems We Solve</a>
              <a href="#services" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">How It Works</a>
              <a href="#case-studies" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">Results</a>
              <a href="/about" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">About</a>
              <a href="/digital-maturity-tracker" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium text-sm xl:text-base">Free Assessment</a>
              <button 
                onClick={scrollToContact}
                className="btn-primary btn-small rounded-full"
              >
                Get Started
              </button>
            </nav>

            {/* Mobile Navigation Button */}
            <div className="lg:hidden flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => window.location.href = '/digital-maturity-tracker'}
                className="btn-primary rounded-full text-xs px-3 py-1.5 sm:px-4 sm:py-2"
                style={{fontSize: '12px'}}
              >
                Assessment
              </button>
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-2 text-luxury-text-body hover:text-luxury-text-heading"
              >
                <Menu className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div className="flex flex-col space-y-6">
          <a href="#problem" onClick={() => setIsDrawerOpen(false)} className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-semibold text-lg">Problems We Solve</a>
          <a href="#services" onClick={() => setIsDrawerOpen(false)} className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-semibold text-lg">How It Works</a>
          <a href="#case-studies" onClick={() => setIsDrawerOpen(false)} className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-semibold text-lg">Results</a>
          <a href="/about" onClick={() => setIsDrawerOpen(false)} className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-semibold text-lg">About</a>
          <a href="/digital-maturity-tracker" onClick={() => setIsDrawerOpen(false)} className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-semibold text-lg">Free Assessment</a>
          <button 
            onClick={scrollToContact}
            className="btn-primary rounded-full mt-4"
          >
            Contact Us
          </button>
        </div>
      </Drawer>

      {/* Luxury Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20 bg-luxury-bg-primary grid-section">
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-bg-primary via-luxury-bg-secondary to-luxury-bg-primary opacity-50"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center section-mobile-safe">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center space-x-2 bg-luxury-bg-secondary border border-luxury-grid-divider text-luxury-ai-start rounded-full px-4 sm:px-6 py-2 sm:py-3 luxury-card font-semibold text-sm sm:text-base">
              <Target className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Proven Results • No Fluff • Outcome-Driven</span>
              <span className="sm:hidden">Proven Results • Outcome-Driven</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-luxury-text-heading leading-tight">
              We help businesses 
              <span className="gradient-ai-text block">
                automate operations
              </span>
              & scale faster with AI
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-luxury-text-body max-w-5xl mx-auto leading-relaxed font-medium px-4">
              <strong>Without expensive IT projects or wasted effort.</strong>
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-luxury-text-secondary max-w-4xl mx-auto leading-relaxed px-4">
              Ailutions builds custom AI tools, integrates AI into your existing systems, automates sales & operations, and implements ERPNext tailored to your business.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 px-4 max-w-4xl mx-auto">
              <button 
                onClick={() => window.location.href = '/digital-maturity-tracker'}
                className="btn-primary btn-large w-full sm:w-auto btn-wrap container-mobile-fix"
              >
                <span className="hidden sm:inline">Start Free Digital Maturity Assessment</span>
                <span className="sm:hidden">Free Assessment</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </button>
              
              <button 
                onClick={scrollToContact}
                className="btn-secondary btn-large w-full sm:w-auto btn-wrap container-mobile-fix"
              >
                <span className="hidden sm:inline">Book a Free Strategy Call</span>
                <span className="sm:hidden">Book Call</span>
              </button>
            </div>
            
            <p className="text-sm sm:text-base lg:text-lg text-luxury-text-secondary font-medium px-4">
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
      <section id="case-studies" className="py-20 bg-luxury-bg-secondary grid-section border-t border-luxury-grid-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-luxury-text-heading mb-6">
              {caseStudiesData.headline}
            </h2>
            <div className="w-32 h-2 gradient-ai mx-auto rounded-full"></div>
            <p className="text-xl text-luxury-text-body mt-6 max-w-3xl mx-auto">
              Real results from real businesses. These companies eliminated manual work and scaled faster.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {caseStudiesData.cards.slice(0, 3).map((study, index) => (
              <InteractiveCaseStudyCard
                key={index}
                title={study.title}
                metric={study.metric}
                problem={study.problem}
                solution={study.solution}
                outcome={study.outcome}
                details={study.details}
                link={study.link}
              />
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => window.location.href = '/case-studies'}
              className="btn-secondary btn-large bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              View More Case Studies
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* CTA Banner */}
      <CTABanner />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-luxury-bg-primary grid-section border-t border-luxury-grid-divider">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-luxury-text-heading mb-6">
              {contactData.headline}
            </h2>
            <div className="w-32 h-2 gradient-ai mx-auto rounded-full"></div>
            <p className="text-xl text-luxury-text-body mt-6 max-w-2xl mx-auto">
              Ready to automate your business and scale faster? Let's start the conversation.
            </p>
          </div>
          
          
          {/* Additional contact options */}
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <Button
                onClick={() => window.open('https://cal.com/ailutions/15-minutes-strategy-call', '_blank')}
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
                onClick={() => window.open('https://wa.me/971585695177', '_blank')}
                variant="outline"
                className="p-6 h-auto flex-col space-y-2 bg-green-50 border-green-200 text-green-700 hover:bg-green-100 hover:scale-105 transition-all duration-300"
              >
                <Whatsapp className="w-8 h-8 text-green-600" />
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
      <footer className="bg-luxury-text-heading text-white py-16 border-t border-luxury-grid-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <a href="/" className="inline-block mb-4">
                <img 
                  src="https://customer-assets.emergentagent.com/job_ai-lead-toolkit/artifacts/o5yg4xd7_ailutions%20logo%20white.svg" 
                  alt="Ailutions Logo" 
                  className="h-8 w-auto hover:scale-105 transition-transform duration-200"
                />
              </a>
              <p className="text-gray-300 mb-4">
                AI that powers your business. Automate operations, eliminate manual work, and scale faster.
              </p>
              <p className="text-sm text-gray-400">
                No fluff. No BS. Just results.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Custom AI Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Integration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Process Automation</a></li>
                <li><a href="#" className-="hover:text-white transition-colors">ERPNext Implementation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Free Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/digital-maturity-tracker" className="hover:text-white transition-colors">Digital Maturity Assessment</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Automation Playbook</a></li>
                <li><a href="/roi-calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
                <li><a href="/case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="/case-studies" className="hover:text-white transition-colors">WhatsApp for eCommerce</a></li>
              </ul>
            </div>
            
            <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <a href="mailto:info@ailutions.ai" className="hover:text-white transition-colors">
                  info@ailutions.ai
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <a href="tel:+971585695177" className="hover:text-white transition-colors">
                  +971 58 569 5177
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Whatsapp className="w-5 h-5 text-gray-400" />
                <a href="https://wa.me/971585695177?text=Hi, I'd like to learn more about your AI automation services" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  WhatsApp Support
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageCircle className="w-5 h-5 text-gray-400" />
                <a href="https://cal.com/ailutions/15-minutes-strategy-call" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Book a Strategy Call
                </a>
              </li>
            </ul>
          </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Ailutions. All rights reserved. We help businesses automate and scale.
            </p>
            <div className="flex items-center space-x-6">
              <a href="https://www.linkedin.com/company/ailutions-ai" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/ailutions" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://wa.me/971585695177" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Whatsapp className="w-6 h-6" />
              </a>
              <a href="mailto:info@ailutions.ai" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy</a>
              <a href="/terms-of-service" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
