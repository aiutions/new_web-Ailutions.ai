import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';

export const CTABanner = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-luxury-bg-secondary grid-section border-t border-luxury-grid-divider relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-luxury-ai-start/10 rounded-full"></div>
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-luxury-ai-end/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-luxury-ai-start/10 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/5 w-20 h-20 bg-luxury-ai-end/10 rounded-full"></div>
        
        {/* Floating AI icons */}
        <div className="absolute top-20 left-20">
          <Zap className="w-8 h-8 text-luxury-ai-start/20" />
        </div>
        <div className="absolute bottom-20 right-20">
          <TrendingUp className="w-8 h-8 text-luxury-ai-end/20" />
        </div>
        <div className="absolute top-1/2 left-10">
          <Clock className="w-6 h-6 text-luxury-ai-start/20" />
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-ai-start/5 via-transparent to-luxury-ai-end/5"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Urgency badge */}
          <div className="inline-flex items-center space-x-2 bg-luxury-critical text-white rounded-full px-6 py-3 font-bold shadow-lg">
            <Clock className="w-5 h-5" />
            <span>Your Competitors Are Already Automating</span>
          </div>

          <h2 className="text-4xl md:text-7xl font-bold leading-tight text-luxury-text-heading">
            Ready to Automate 
            <span className="gradient-ai-text block">
              Your Business?
            </span>
          </h2>
          
          <p className="text-2xl md:text-3xl text-luxury-text-body max-w-4xl mx-auto font-semibold">
            Start with a <strong>free Digital Maturity Assessment</strong> or book a strategy call today.
          </p>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center items-center gap-8 py-8 border-y border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">3 min</div>
              <div className="text-sm opacity-80">Assessment Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">50+</div>
              <div className="text-sm opacity-80">Businesses Automated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">90%</div>
              <div className="text-sm opacity-80">Time Savings Avg</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">$0</div>
              <div className="text-sm opacity-80">Until Results</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-6 sm:space-y-0 sm:space-x-8">
            <Button
              onClick={() => window.location.href = '/digital-maturity-tracker'}
              size="lg"
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-gray-900 font-bold px-12 py-6 rounded-2xl text-xl hover:scale-110 transition-all duration-300 hover:shadow-2xl btn-pulse"
            >
              Launch Free Assessment
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
            
            <Button
              onClick={scrollToContact}
              variant="outline"
              size="lg"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-12 py-6 rounded-2xl text-xl hover:scale-110 transition-all duration-300 bg-transparent"
            >
              Talk to an Expert
            </Button>
          </div>

          <div className="space-y-2">
            <p className="text-lg opacity-90">
              ⚡ <strong>No credit card required</strong> • Instant results • Free consultation
            </p>
            <p className="text-sm opacity-70">
              Join 50+ businesses that eliminated manual work and scaled faster with AI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};