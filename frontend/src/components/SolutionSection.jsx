import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Search, Wrench, Zap, Quote } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export const SolutionSection = () => {
  const steps = [
    { 
      title: "Discover", 
      desc: "We map your goals and current workflows.", 
      icon: "Search",
      detail: "Deep-dive audit of your processes, pain points, and opportunities"
    },
    { 
      title: "Build & Integrate", 
      desc: "Deploy custom AI tools or enhance your existing systems.", 
      icon: "Wrench",
      detail: "Custom development that works with your existing tech stack"
    },
    { 
      title: "Automate & Scale", 
      desc: "Run workflows, dashboards, and reporting on autopilot.", 
      icon: "Zap",
      detail: "Hands-off automation that grows with your business"
    }
  ];

  const testimonials = [
    {
      quote: "Payroll went from days to hours.",
      author: "Sarah M., CFO",
      company: "TechStartup Inc.",
      metric: "Saved 32 hours/month"
    },
    {
      quote: "We automated sales follow-ups and boosted conversions.",
      author: "Mike R., Sales Director", 
      company: "Growth Co.",
      metric: "+47% conversion rate"
    }
  ];

  return (
    <section id="services" className="py-20 bg-luxury-bg-secondary grid-section border-t border-luxury-grid-divider">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-luxury-bg-primary text-luxury-ai-start border-luxury-grid-divider px-6 py-3 text-base font-semibold luxury-card">
            The Ailutions Advantage
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-luxury-text-heading mb-8 leading-tight">
            The AI Partner That Does 
            <span className="gradient-ai-text block">
              What Others Don't.
            </span>
          </h2>
          <p className="text-xl text-luxury-text-body max-w-3xl mx-auto">
            While others sell you software, we deliver outcomes. Here's our proven 3-step process:
          </p>
        </div>

        {/* 3-Step Process */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, index) => {
            const IconComponent = LucideIcons[step.icon] || LucideIcons.Circle;
            return (
              <Card key={index} className="group relative overflow-hidden hover:scale-105 transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl">
                {/* Step number badge */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-green-600 group-hover:text-blue-600 transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-4 font-semibold">{step.desc}</p>
                  <p className="text-gray-600">{step.detail}</p>
                </CardContent>

                {/* Connection arrow */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-6 w-12 h-px bg-gradient-to-r from-green-400 to-blue-400 z-10">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Social Proof */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
          <div className="text-center mb-12">
            <Quote className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Real Results from Real Clients</h3>
            <p className="text-gray-600 text-lg">Don't just take our word for it...</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 bg-gradient-to-br from-white to-green-50 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Quote className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-xl font-semibold text-gray-800 italic">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.author}</p>
                        <p className="text-gray-600 text-sm">{testimonial.company}</p>
                      </div>
                      <Badge className="bg-green-100 text-green-700 font-bold">
                        {testimonial.metric}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};