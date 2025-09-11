import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export const EnhancedServiceCard = ({ title, icon, desc, slug }) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.Circle;
  
  const handleLearnMore = () => {
    // For now, we'll show an alert. Later this can navigate to detailed service pages
    alert(`Learn more about ${title} - This will navigate to detailed service page`);
  };
  
  return (
    <Card className="group relative overflow-hidden hover:scale-105 transition-all duration-500 hover:shadow-2xl border-0 bg-white/90 backdrop-blur-sm hover:bg-white cursor-pointer">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-green-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-green-500/10 group-hover:to-blue-500/10 transition-all duration-500 rounded-lg"></div>
      
      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 via-green-500 to-blue-500 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500"></div>
      
      <CardContent className="relative p-8 h-full flex flex-col">
        <div className="flex items-start space-x-4 mb-6">
          <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 group-hover:shadow-lg">
            <IconComponent className="w-8 h-8 text-blue-600 group-hover:text-green-600 transition-colors duration-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              {desc}
            </p>
          </div>
        </div>
        
        {/* Floating learn more button */}
        <div className="mt-auto opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Button
            onClick={handleLearnMore}
            variant="outline"
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white border-0 font-semibold py-3 rounded-xl hover:scale-105 transition-all duration-300"
          >
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};