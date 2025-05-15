// UnifiedSpeedometer.tsx
import React, { useEffect, useState } from 'react';

interface UnifiedSpeedometerProps {
  currentSpeed: number;
  maxSpeed?: number;
  size?: 'sm' | 'md' | 'lg';
}

const UnifiedSpeedometer: React.FC<UnifiedSpeedometerProps> = ({
  currentSpeed,
  maxSpeed = 120,
  size = 'md'
}) => {
  const [animatedSpeed, setAnimatedSpeed] = useState(0);

  // Animate the speed transition
  useEffect(() => {
    const duration = 1000;
    const interval = 20;
    const steps = duration / interval;
    const increment = (currentSpeed - animatedSpeed) / steps;
    let current = animatedSpeed;
    let counter = 0;

    const timer = setInterval(() => {
      counter++;
      current += increment;
      if (counter >= steps) {
        clearInterval(timer);
        setAnimatedSpeed(currentSpeed);
      } else {
        setAnimatedSpeed(current);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentSpeed]);

  const percentage = Math.min((animatedSpeed / maxSpeed) * 100, 100);

  const sizeClass = {
    sm: 'w-28 h-28',
    md: 'w-36 h-36',
    lg: 'w-44 h-44'
  }[size];

  // Color based on speed
  const getStrokeColor = () => {
    if (percentage <= 50) return '#a3b18a'; // green
    if (percentage <= 80) return '#ffc857'; // orange
    return '#e63946'; // red
  };

  const strokeColor = getStrokeColor();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${sizeClass}`}>
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#2d3d32"
            strokeWidth="8"
          />

          {/* Animated Value Circle */}
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
              transition: 'stroke-dashoffset 0.8s ease-in-out'
            }}
          />
        </svg>

        {/* Speed Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{Math.round(animatedSpeed)}</span>
          <span className="text-xs text-[#a3b18a]">km/h</span>
        </div>
      </div>

      <div className="mt-2 text-center">
        <p className="text-sm font-medium">Current Speed</p>
      </div>
    </div>
  );
};

export default UnifiedSpeedometer;
