import React from 'react';
import { Badge } from './ui/badge';
import { Star, Shield, Award, Users } from 'lucide-react';

export const TrustBar = () => {
  const trustElements = [
    { icon: Star, text: "4.9/5 Client Rating", color: "text-luxury-warning" },
    { icon: Users, text: "50+ Projects Delivered", color: "text-luxury-ai-start" },
    { icon: Shield, text: "Enterprise Security", color: "text-luxury-success" },
    { icon: Award, text: "Certified Partners", color: "text-luxury-ai-end" }
  ];

  return (
    <div className="py-8 bg-luxury-bg-primary border-y border-luxury-grid-divider grid-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          <p className="text-sm font-medium text-luxury-text-secondary uppercase tracking-wide">
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
                  className="flex items-center space-x-2 px-4 py-2 border-luxury-grid-divider bg-luxury-bg-primary luxury-card"
                >
                  <IconComponent className={`w-4 h-4 ${item.color}`} />
                  <span className="text-luxury-text-body font-medium">{item.text}</span>
                </Badge>
              );
            })}
          </div>
          
          {/* Client logos placeholder */}
          <div className="flex items-center space-x-8 opacity-30">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="w-24 h-8 bg-gradient-to-r from-luxury-grid-divider to-luxury-hover-tint rounded"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};