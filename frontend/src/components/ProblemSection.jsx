import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, AlertTriangle, TrendingDown } from 'lucide-react';

export const ProblemSection = () => {
  const problems = [
    "We're stuck in spreadsheets and manual approvals.",
    "Our CRM doesn't talk to our ERP — we re-enter the same data multiple times.",
    "Payroll eats up days every month.",
    "We know AI can help… but don't know where to start."
  ];

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-luxury-bg-primary grid-section border-t border-luxury-grid-divider relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5"></div>
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-gradient-to-br from-red-400/10 to-orange-400/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 rounded-full px-6 py-3 mb-6">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">Business Reality Check</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Is This What Running Your Business Feels Like?
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Problems List */}
          <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
            <CardContent className="p-10">
              <div className="flex items-center space-x-3 mb-8">
                <TrendingDown className="w-8 h-8 text-red-500" />
                <h3 className="text-2xl font-bold text-gray-900">Sound Familiar?</h3>
              </div>
              
              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                    <p className="text-lg text-gray-700 font-medium leading-relaxed">
                      "{problem}"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Agitation */}
          <div className="space-y-8">
            <Card className="border-0 bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-xl">
              <CardContent className="p-10">
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">Here's What Happens If You Don't Act:</h3>
                  <p className="text-xl leading-relaxed opacity-95">
                    Competitors who adopt AI will operate leaner, move faster, and capture market share while you're still drowning in manual processes.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-0 bg-white/90 backdrop-blur-sm shadow-xl">
              <CardContent className="p-8 text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-4">The Cost of Delay</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-red-500 mb-2">40hrs</div>
                    <p className="text-sm text-gray-600">Wasted on manual tasks per month</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-red-500 mb-2">25%</div>
                    <p className="text-sm text-gray-600">Revenue lost to inefficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button
            onClick={scrollToServices}
            size="lg"
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold px-12 py-6 rounded-2xl text-xl hover:scale-105 transition-all duration-300 hover:shadow-2xl"
          >
            See How Ailutions Eliminates These Problems
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
          <p className="text-gray-600 mt-4 text-lg">
            👆 Stop the bleeding. Start automating.
          </p>
        </div>
      </div>
    </section>
  );
};