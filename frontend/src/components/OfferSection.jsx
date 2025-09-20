import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, CheckCircle, Gift, Zap } from 'lucide-react';

export const OfferSection = () => {
  const valueStack = [
    { 
      item: "Free Digital Maturity Assessment", 
      value: "Worth $497",
      desc: "Interactive quiz + personalized PDF report"
    },
    { 
      item: "Custom Automation Roadmap", 
      value: "Worth $997",
      desc: "Step-by-step plan tailored to your business"
    },
    { 
      item: "ERPNext Implementation Support", 
      value: "Worth $2,497",
      desc: "Full setup, training, and configuration"
    },
    { 
      item: "AI Playbook for Your Industry", 
      value: "Worth $297",
      desc: "Industry-specific automation strategies"
    }
  ];

  const totalValue = 4288;

  return (
    <section className="py-20 bg-luxury-bg-primary grid-section border-t border-luxury-grid-divider relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-luxury-ai-start/10 to-luxury-ai-end/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-luxury-ai-end/5 to-luxury-ai-start/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-luxury-warning text-luxury-text-heading rounded-full px-6 py-3 mb-6 font-bold shadow-lg">
            <Gift className="w-5 h-5" />
            <span>Limited Time Offer</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight text-luxury-text-heading">
            What You Get with 
            <span className="gradient-ai-text">
              Ailutions
            </span>
          </h2>
          
          <p className="text-2xl mb-8 text-luxury-text-body max-w-4xl mx-auto">
            <strong>AI-powered automation for your business</strong> — fast, tailored, outcome-driven.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Value Stack */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold mb-8">Here's Everything You Get:</h3>
            
            {valueStack.map((item, index) => (
              <Card key={index} className="group bg-luxury-bg-secondary luxury-card transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-luxury-success group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold text-luxury-text-heading">{item.item}</h4>
                        <Badge className="bg-luxury-warning text-luxury-text-heading font-bold shadow-sm">
                          {item.value}
                        </Badge>
                      </div>
                      <p className="text-luxury-text-secondary">{item.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Total Value */}
            <Card className="gradient-cta text-white border-0 shadow-2xl">
              <CardContent className="p-8 text-center">
                <h4 className="text-2xl font-bold mb-2">Total Value:</h4>
                <div className="text-5xl font-bold mb-2">${totalValue.toLocaleString()}</div>
                <p className="text-lg font-semibold">But today, you get it all...</p>
              </CardContent>
            </Card>
          </div>

          {/* Offer CTA */}
          <div className="space-y-8">
            <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-2xl">
              <CardContent className="p-12 text-center">
                <div className="space-y-6">
                  <Zap className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
                  
                  <h3 className="text-4xl font-bold">
                    For <span className="text-yellow-400">FREE</span>
                  </h3>
                  
                  <p className="text-xl opacity-90 mb-8">
                    Start with our Digital Maturity Assessment — completely free, no strings attached.
                  </p>

                  <div className="bg-green-500/20 border border-green-400/50 rounded-2xl p-6 mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                      <h4 className="text-xl font-bold text-green-400">Our Guarantee</h4>
                    </div>
                    <p className="text-lg text-black">
                      <strong>You don't pay until your first automation is live.</strong>
                    </p>
                    <p className="text-sm text-black mt-2">
                      We're so confident in our results, we'll prove the value first.
                    </p>
                  </div>

                  <button
                    onClick={() => window.location.href = '/digital-maturity-tracker'}
                    className="btn-primary btn-large w-full btn-wrap container-mobile-fix"
                    style={{borderRadius: '20px'}}
                  >
                    <span className="hidden sm:inline">Claim My Free Assessment</span>
                    <span className="sm:hidden">Free Assessment</span>
                    <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 ml-2 sm:ml-3" />
                  </button>
                  
                  <p className="text-xs sm:text-sm text-center px-4 mt-3" style={{opacity: '0.8'}}>
                    ⚡ Takes 3 minutes • Instant results • No credit card required
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Urgency */}
            <Card className="bg-red-500/20 border border-red-400/50">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-bold text-red-400 mb-2">⏰ Limited Time</h4>
                <p className="text-sm">
                  This free assessment offer won't last long. Your competitors are already automating.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};