import React from 'react';
import { Card, CardContent } from './ui/card';

export const CaseStudyCard = ({ title, metric }) => {
  return (
    <Card className="group hover:scale-105 hover:-rotate-1 transition-all duration-300 hover:shadow-xl border-0 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <CardContent className="p-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-green-500 group-hover:rotate-12 transition-transform duration-300"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            {metric}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};