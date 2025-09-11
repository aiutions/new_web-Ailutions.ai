import React from 'react';

export const AnimatedHeroBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 animate-pulse"></div>
      </div>
      
      {/* Floating gradient blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl animate-float opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-400/15 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-1000 opacity-40"></div>
      
      {/* AI Circuit lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1920 1080">
        <defs>
          <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#22C55E" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Animated circuit paths */}
        <path 
          d="M100,200 Q400,100 800,300 T1400,200" 
          stroke="url(#circuitGrad)" 
          strokeWidth="2" 
          fill="none"
          filter="url(#glow)"
          className="animate-pulse"
        />
        <path 
          d="M200,600 Q600,400 1000,700 T1600,500" 
          stroke="url(#circuitGrad)" 
          strokeWidth="1.5" 
          fill="none"
          filter="url(#glow)"
          className="animate-pulse delay-500"
        />
        <path 
          d="M0,400 Q300,300 600,500 T1200,400" 
          stroke="url(#circuitGrad)" 
          strokeWidth="1" 
          fill="none"
          filter="url(#glow)"
          className="animate-pulse delay-1000"
        />
        
        {/* Animated dots along paths */}
        <circle r="4" fill="#3B82F6" opacity="0.6">
          <animateMotion dur="8s" repeatCount="indefinite" path="M100,200 Q400,100 800,300 T1400,200"/>
        </circle>
        <circle r="3" fill="#22C55E" opacity="0.8">
          <animateMotion dur="12s" repeatCount="indefinite" path="M200,600 Q600,400 1000,700 T1600,500"/>
        </circle>
        <circle r="2" fill="#3B82F6" opacity="0.7">
          <animateMotion dur="10s" repeatCount="indefinite" path="M0,400 Q300,300 600,500 T1200,400"/>
        </circle>
      </svg>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-float opacity-60"></div>
      <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-700 opacity-80"></div>
      <div className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-blue-500 rounded-full animate-float delay-1000 opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-green-500 rounded-full animate-pulse delay-300 opacity-70"></div>
      
      {/* Data flow lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent animate-pulse"></div>
      <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/20 to-transparent animate-pulse delay-1000"></div>
    </div>
  );
};