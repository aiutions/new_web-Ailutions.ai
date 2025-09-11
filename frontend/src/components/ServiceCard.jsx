import React from 'react';
import { Card, CardContent } from './ui/card';
import * as LucideIcons from 'lucide-react';

export const ServiceCard = ({ title, icon, desc }) => {
  const IconComponent = LucideIcons[icon] || LucideIcons.Circle;
  
  return (
    <Card className="group hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardContent className="p-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <IconComponent className="w-6 h-6 text-blue-600 group-hover:text-green-600 transition-colors duration-300" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {desc}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};