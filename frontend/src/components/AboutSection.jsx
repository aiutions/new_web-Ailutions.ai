import React from 'react';
import { Card, CardContent } from './ui/card';
import { Target, Puzzle, Shield, CheckCircle } from 'lucide-react';

export const AboutSection = () => {
  const principles = [
    {
      icon: Target,
      title: "Outcome-First",
      description: "We prioritize measurable wins like time saved and errors reduced.",
      detail: "Every project starts with clear success metrics. No vanity features.",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: Puzzle,
      title: "Integrate, Don't Overbuild", 
      description: "We plug AI into what works and only replace when necessary.",
      detail: "Why rebuild when you can enhance? We work with your existing systems.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Own Your Stack",
      description: "Open standards, documented flows, and control in your hands.",
      detail: "No vendor lock-in. No black boxes. Full transparency and ownership.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight">
            Why Businesses Choose 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 block">
              Ailutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're not just another AI consultancy. Here's what makes us different:
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {principles.map((principle, index) => {
            const IconComponent = principle.icon;
            return (
              <Card key={index} className="group relative overflow-hidden hover:scale-105 transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${principle.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <CardContent className="relative p-10 text-center">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${principle.color} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {principle.title}
                  </h3>
                  
                  <p className="text-lg text-gray-700 mb-4 font-semibold">
                    {principle.description}
                  </p>
                  
                  <p className="text-gray-600">
                    {principle.detail}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional credibility */}
        <Card className="border-0 bg-white/60 backdrop-blur-sm shadow-xl">
          <CardContent className="p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  The Ailutions Difference
                </h3>
                <div className="space-y-4">
                  {[
                    "We've automated 50+ business processes across industries",
                    "Our clients save an average of 40 hours per month",
                    "100% of our implementations deliver measurable ROI within 90 days",
                    "We provide ongoing support, not just one-time setup"
                  ].map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                      <p className="text-lg text-gray-700 font-medium">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="p-6 bg-blue-50 rounded-2xl">
                    <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                    <p className="text-gray-700 font-medium">Projects Delivered</p>
                  </div>
                  <div className="p-6 bg-green-50 rounded-2xl">
                    <div className="text-4xl font-bold text-green-600 mb-2">90%</div>
                    <p className="text-gray-700 font-medium">Time Savings</p>
                  </div>
                  <div className="p-6 bg-purple-50 rounded-2xl">
                    <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                    <p className="text-gray-700 font-medium">ROI Delivered</p>
                  </div>
                  <div className="p-6 bg-orange-50 rounded-2xl">
                    <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                    <p className="text-gray-700 font-medium">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};