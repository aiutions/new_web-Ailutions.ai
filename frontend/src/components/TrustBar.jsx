import React from 'react';
import { Badge } from './ui/badge';
import { Star, Shield, Award, Users } from 'lucide-react';

export const TrustBar = () => {
  const trustElements = [
    { icon: Star, text: "4.9/5 Client Rating", color: "text-yellow-600" },
    { icon: Users, text: "50+ Projects Delivered", color: "text-blue-600" },
    { icon: Shield, text: "Enterprise Security", color: "text-green-600" },
    { icon: Award, text: "Certified Partners", color: "text-purple-600" }
  ];

  return (
    <div className="py-8 bg-white/50 backdrop-blur-sm border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Trusted by ambitious companies
          </p>
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            {trustElements.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Badge
                  key={index}
                  variant="outline"
                  className="flex items-center space-x-2 px-4 py-2 border-gray-200 bg-white/60 hover:bg-white hover:scale-105 transition-all duration-300"
                >
                  <IconComponent className={`w-4 h-4 ${item.color}`} />
                  <span className="text-gray-700 font-medium">{item.text}</span>
                </Badge>
              );
            })}
          </div>
          
          {/* Client logos placeholder */}
          <div className="flex items-center space-x-8 opacity-50">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="w-24 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};