
import React from 'react';
import { InteractiveCaseStudyCard } from '../components/InteractiveCaseStudyCard';
import { caseStudiesData } from '../data/mock';
import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function CaseStudies() {
  return (
    <div className="bg-luxury-bg-primary min-h-screen">
      {/* Header */}
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
            <div className="hidden md:block">
              <nav className="flex items-center space-x-4">
                <a href="/#problem" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">Problems We Solve</a>
                <a href="/#services" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">How It Works</a>
                <a href="/case-studies" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">Results</a>
                <a href="/about" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">About</a>
                <a href="/digital-maturity-tracker" className="text-luxury-text-body hover:text-luxury-ai-start transition-colors font-medium">Free Assessment</a>
                <Button 
                  onClick={() => window.location.href = '#contact'}
                  className="btn-primary btn-small rounded-full"
                >
                  Get Started
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </header>
      
      <main className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl md:text-6xl font-bold text-luxury-text-heading mb-6">
              Our Track Record
            </h1>
            <div className="w-32 h-2 gradient-ai mx-auto rounded-full"></div>
            <p className="text-xl text-luxury-text-body mt-6 max-w-3xl mx-auto">
              We deliver real results for businesses. Explore how we've helped companies like yours automate operations, reduce costs, and scale faster with AI-powered solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <InteractiveCaseStudyCard
                title="Shopify in the UAE"
                metric="+25% Conversions"
                problem="Losing sales due to multilingual friction and COD questions."
                solution="AI sales agent provides instant, bilingual answers and support."
                outcome="Increased conversion rates and automated customer support."
                link="/blog/shopify-merchants-uae"
              />
            {caseStudiesData.cards.map((study, index) => (
              <InteractiveCaseStudyCard
                key={index}
                title={study.title}
                metric={study.metric}
                problem={study.problem}
                solution={study.solution}
                outcome={study.outcome}
                link={study.link}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-luxury-text-heading text-white py-16 border-t border-luxury-grid-divider">
        <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 mb-4 md:mb-0">
                © 2025 Ailutions. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy</a>
                <a href="/terms-of-service" className="hover:text-white transition-colors">Terms</a>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
}
