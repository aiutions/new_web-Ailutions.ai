
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight, RotateCcw } from 'lucide-react';

export const InteractiveCaseStudyCard = ({ title, metric, problem, solution, outcome, details, link }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const handleReadFullCase = (e) => {
    e.stopPropagation();
    window.location.href = link;
  };

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  }
  
  return (
    <div className="perspective-1000 h-80">
      <div className={`relative w-full h-full transition-all duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        {/* Front Card */}
        <Card 
          onClick={handleFlip}
          className={`absolute inset-0 backface-hidden transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-blue-50/30 cursor-pointer ${isFlipped ? 'rotate-y-180' : ''}`}>
          <CardContent className="p-8 text-center h-full flex flex-col justify-center">
            <div className="space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 transition-transform duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300">
                {title}
              </h3>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                {metric}
              </div>
              <p className="text-sm text-gray-500">Click to learn more</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Back Card */}
        <Card className={`absolute inset-0 backface-hidden rotate-y-180 transition-all duration-300 border-0 bg-gradient-to-br from-blue-50 to-cyan-50 ${isFlipped ? '' : 'rotate-y-180'}`}>
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleFlip}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="font-semibold text-red-600">Problem: </span>
                  <span className="text-gray-600">{problem}</span>
                </div>
                <div>
                  <span className="font-semibold text-blue-600">Solution: </span>
                  <span className="text-gray-600">{solution}</span>
                </div>
                <div>
                  <span className="font-semibold text-green-600">Outcome: </span>
                  <span className="text-gray-600">{outcome}</span>
                </div>
              </div>
              
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
                {metric}
              </div>
            </div>
            
            <Button
              onClick={handleReadFullCase}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg text-sm mt-4"
            >
              Read Full Case
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
