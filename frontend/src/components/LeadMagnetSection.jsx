import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowRight, Download, Calculator, BookOpen, FileText, TrendingUp } from 'lucide-react';

export const LeadMagnetSection = () => {
  const [currentMagnet, setCurrentMagnet] = useState(0);
  const [progress, setProgress] = useState(0);

  const leadMagnets = [
    {
      title: "Free Digital Maturity Tracker",
      subtitle: "Interactive Quiz + PDF Report",
      icon: TrendingUp,
      description: "Discover your business' automation potential with our comprehensive assessment",
      features: ["18 key questions", "Personalized recommendations", "Action priority matrix"],
      cta: "Start Assessment",
      href: "/digital-maturity-tracker",
      color: "from-blue-500 to-green-500"
    },
    {
      title: "Automation Playbook",
      subtitle: "10 Processes You Can Automate This Month",
      icon: BookOpen,
      description: "Step-by-step guide to identifying and automating your biggest time-wasters",
      features: ["Process audit checklist", "ROI calculation templates", "Implementation timeline"],
      cta: "Download Free",
      href: "/automation-playbook",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "AI ROI Calculator",
      subtitle: "See How Much Time & Money You Could Save",
      icon: Calculator,
      description: "Calculate your potential savings from AI automation in under 2 minutes",
      features: ["Time savings calculator", "Cost reduction estimator", "Payback period analysis"],
      cta: "Calculate Savings",
      href: "/roi-calculator",
      color: "from-orange-500 to-red-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMagnet(prev => (prev + 1) % leadMagnets.length);
      setProgress(0);
    }, 4000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + 2.5;
      });
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  const currentLead = leadMagnets[currentMagnet];
  const IconComponent = currentLead.icon;

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Not Sure Where to Start?
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
            Take our <strong>free Digital Maturity Tracker</strong> and discover your business' automation potential.
          </p>
          <div className="w-32 h-2 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Rotating Lead Magnet Showcase */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              {/* Progress bar */}
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Preview</span>
                  <span className="text-sm text-gray-500">{currentMagnet + 1} of {leadMagnets.length}</span>
                </div>
                <Progress value={progress} className="h-1" />
              </div>

              {/* Lead magnet content */}
              <div className="p-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentLead.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentLead.title}
                </h3>
                <p className="text-xl text-gray-600 mb-6 font-medium">
                  {currentLead.subtitle}
                </p>
                
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {currentLead.description}
                </p>

                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-gray-900">What's included:</h4>
                  {currentLead.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentLead.color}`}></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => window.location.href = currentLead.href}
                  className={`w-full bg-gradient-to-r ${currentLead.color} hover:opacity-90 text-white font-semibold py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                >
                  {currentLead.cta}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* All Lead Magnets Grid */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">
              Everything You Need to Get Started
            </h3>
            
            {leadMagnets.map((magnet, index) => {
              const MagnetIcon = magnet.icon;
              return (
                <Card 
                  key={index} 
                  className={`group border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    index === currentMagnet ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white hover:scale-105'
                  }`}
                  onClick={() => setCurrentMagnet(index)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${magnet.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <MagnetIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          {magnet.title}
                        </h4>
                        <p className="text-gray-600">{magnet.subtitle}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500 font-medium">FREE</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* CTA */}
            <Card className="border-0 bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-xl">
              <CardContent className="p-8 text-center">
                <h4 className="text-2xl font-bold mb-4">Ready to Automate?</h4>
                <p className="text-lg mb-6 opacity-90">
                  Start with the Digital Maturity Tracker — it takes just 3 minutes.
                </p>
                <Button
                  onClick={() => window.location.href = '/digital-maturity-tracker'}
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-4 rounded-xl text-lg hover:scale-105 transition-all duration-300"
                >
                  Launch Free Assessment
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};