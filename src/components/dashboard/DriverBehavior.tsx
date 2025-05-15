import React from 'react';
import { Driver } from '../../types';
import { AlertTriangle, Zap, ThumbsUp } from 'lucide-react';

interface DriverBehaviorProps {
  driver: Driver;
}

const DriverBehavior: React.FC<DriverBehaviorProps> = ({ driver }) => {
  // Calculate the angle for the gauge needle
  const scorePercentage = driver.score / 100;
  const angleInDegrees = -90 + (scorePercentage * 180);
  
  // Determine color based on score
  const getScoreColor = () => {
    if (driver.score < 60) return '#e63946'; // Red
    if (driver.score < 85) return '#ffc857'; // Yellow
    return '#a3b18a'; // Green
  };
  
  const getScoreMessage = () => {
    if (driver.score < 60) return 'Needs improvement';
    if (driver.score < 85) return 'Good driving';
    return 'Excellent driving!';
  };
  
  const scoreColor = getScoreColor();
  
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Driver Behavior</h3>
        <div className="text-sm px-3 py-1 rounded-full bg-[#344e41]">
          {driver.licenseNumber}
        </div>
      </div>
      
      <div className="flex flex-col items-center mb-4">
        <h4 className="text-md font-medium mb-2">{driver.name}</h4>
        
        <div className="relative w-36 h-36">
          {/* Score gauge */}
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background semicircle */}
            <path
              d="M 10 75 A 65 65 0 0 1 140 75"
              fill="none"
              stroke="#2d3d32"
              strokeWidth="8"
              strokeLinecap="round"
            />
            
            {/* Score zones */}
            <path
              d="M 10 75 A 65 65 0 0 1 50 14"
              fill="none"
              stroke="#e63946" // Red
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 50 14 A 65 65 0 0 1 100 14"
              fill="none"
              stroke="#ffc857" // Yellow
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M 100 14 A 65 65 0 0 1 140 75"
              fill="none"
              stroke="#a3b18a" // Green
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.7"
            />
            
            {/* Score needle */}
            <g
              style={{
                transformOrigin: '75px 75px',
                transform: `rotate(${angleInDegrees}deg)`,
                transition: 'transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
              }}
            >
              <line
                x1="75"
                y1="75"
                x2="75"
                y2="20"
                stroke={scoreColor}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="75" cy="75" r="4" fill={scoreColor} />
            </g>
            
            {/* Score text */}
            <text
              x="75"
              y="65"
              fill="#dad7cd"
              fontSize="20"
              fontWeight="bold"
              textAnchor="middle"
            >
              {driver.score}
            </text>
            <text
              x="75"
              y="80"
              fill="#a3b18a"
              fontSize="10"
              textAnchor="middle"
            >
              DRIVER SCORE
            </text>
          </svg>
        </div>
        
        <p className="mt-1 text-sm text-[#a3b18a]">{getScoreMessage()}</p>
      </div>
      
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="flex flex-col items-center">
          <AlertTriangle className="text-amber-400 mb-1" size={20} />
          <p className="text-xs text-[#a3b18a]">Harsh Brakes</p>
          <p className="text-lg font-medium">{driver.metrics.harshBrakes}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <Zap className="text-red-400 mb-1" size={20} />
          <p className="text-xs text-[#a3b18a]">Harsh Accel</p>
          <p className="text-lg font-medium">{driver.metrics.harshAccel}</p>
        </div>
        
        <div className="flex flex-col items-center">
          <ThumbsUp className="text-blue-400 mb-1" size={20} />
          <p className="text-xs text-[#a3b18a]">Overspeeds</p>
          <p className="text-lg font-medium">{driver.metrics.overspeeds}</p>
        </div>
      </div>
    </div>
  );
};

export default DriverBehavior;