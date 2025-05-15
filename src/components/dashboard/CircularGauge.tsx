import React from 'react';

interface CircularGaugeProps {
  value: number;
  maxValue: number;
  label: string;
  unit: string;
  size?: 'sm' | 'md' | 'lg';
  colorRanges?: {
    value: number;
    color: string;
  }[];
}

const CircularGauge: React.FC<CircularGaugeProps> = ({
  value,
  maxValue,
  label,
  unit,
  size = 'md',
  colorRanges = [
    { value: 60, color: '#a3b18a' },
    { value: 80, color: '#588157' },
    { value: 100, color: '#3a5a40' }
  ]
}) => {
  const normalizedValue = Math.min(value, maxValue);
  const percentage = (normalizedValue / maxValue) * 100;
  
  // Determine the size
  const sizeClass = {
    sm: 'w-28 h-28',
    md: 'w-36 h-36',
    lg: 'w-44 h-44'
  }[size];
  
  // Calculate stroke color based on value
  const getStrokeColor = () => {
    for (let i = 0; i < colorRanges.length; i++) {
      if (percentage <= colorRanges[i].value) {
        return colorRanges[i].color;
      }
    }
    return colorRanges[colorRanges.length - 1].color;
  };
  
  const strokeColor = getStrokeColor();
  
  // SVG properties
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeClass}`}>
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#2d3d32"
            strokeWidth="8"
          />
          
          {/* Value circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ 
              transition: 'stroke-dashoffset 1s ease-in-out',
            }}
          />
        </svg>
        
        {/* Value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{value}</span>
          <span className="text-xs text-[#a3b18a]">{unit}</span>
        </div>
      </div>
      
      <div className="mt-2 text-center">
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
};

export default CircularGauge;