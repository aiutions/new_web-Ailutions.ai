import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowRight, TrendingUp } from 'lucide-react';

export const InteractiveMaturityPreview = () => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  
  const maturityLevels = [
    { name: "Foundational", color: "from-red-500 to-orange-500", progress: 25 },
    { name: "Emerging", color: "from-yellow-500 to-amber-500", progress: 50 },
    { name: "Established", color: "from-blue-500 to-cyan-500", progress: 75 },
    { name: "Advanced", color: "from-green-500 to-emerald-500", progress: 100 }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLevel(prev => (prev + 1) % maturityLevels.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    setAnimatedProgress(0);
    const timeout = setTimeout(() => {
      setAnimatedProgress(maturityLevels[currentLevel].progress);
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [currentLevel]);
  
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 to-green-50/30 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5"></div>
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-green-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-green-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 mb-6">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Interactive Assessment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Discover your digital maturity
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Answer key questions and receive a tailored, actionable report with personalized recommendations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Preview */}
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Live Maturity Assessment
                  </h3>
                  <p className="text-gray-600">Watch your score update in real-time</p>
                </div>
                
                {/* Animated Progress */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Digital Maturity Score</span>
                    <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                      {animatedProgress}%
                    </span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={animatedProgress} 
                      className="h-6 bg-gray-100" 
                      aria-label="Digital Maturity Score"
                    />
                    <div 
                      className={`absolute inset-0 h-6 bg-gradient-to-r ${maturityLevels[currentLevel].color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${animatedProgress}%` }}
                    />
                  </div>
                </div>
                
                {/* Current Level Display */}
                <div className="text-center p-4 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-xl">
                  <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${maturityLevels[currentLevel].color} text-white font-semibold mb-2 animate-pulse`}>
                    {maturityLevels[currentLevel].name}
                  </div>
                  <p className="text-sm text-gray-600">
                    Current maturity level assessment
                  </p>
                </div>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-600">6 Assessment Categories</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-200"></div>
                    <span className="text-gray-600">Detailed PDF Report</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-400"></div>
                    <span className="text-gray-600">Custom Recommendations</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-600"></div>
                    <span className="text-gray-600">Action Priority Matrix</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* CTA Content */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Get Your Personalized Digital Transformation Roadmap
              </h3>
              <div className="space-y-4 text-lg text-gray-600">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p>Comprehensive assessment across strategy, process, data, automation, security, and culture</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p>Receive actionable insights with priority recommendations tailored to your business</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <p>Download detailed PDF report and book a free consultation call</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                size="lg"
                onClick={() => window.location.href = '/digital-maturity-tracker'}
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold px-10 py-5 rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl w-full sm:w-auto"
              >
                Launch Digital Maturity Tracker
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <p className="text-sm text-gray-500">
                ✨ Takes only 3 minutes • Free detailed report • No spam, guaranteed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};