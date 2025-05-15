import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SpeedChartProps {
  data: Array<{
    time: number;
    speed: number;
  }>;
  height?: number;
}

const SpeedChart: React.FC<SpeedChartProps> = ({ data, height = 300 }) => {
  // Calculate max and min values for better scaling
  const maxSpeed = Math.max(...data.map(d => d.speed));
  const minSpeed = Math.min(...data.map(d => d.speed));
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#344e41] p-2 rounded shadow-md border border-[#588157] text-xs">
          <p className="font-semibold text-[#dad7cd]">Time: {label}</p>
          <p className="text-[#a3b18a]">
            Speed: <span className="text-[#dad7cd]">{payload[0].value.toFixed(1)} km/h</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="card h-full">
      <h3 className="text-lg font-medium mb-4">Speed Variation Over Trip</h3>
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#3a5a40" opacity={0.3} />
            <XAxis
              dataKey="time"
              stroke="#a3b18a"
              tick={{ fill: '#a3b18a', fontSize: 12 }}
              tickCount={10}
            />
            <YAxis
              stroke="#a3b18a"
              domain={[Math.max(0, minSpeed - 10), maxSpeed + 10]}
              tick={{ fill: '#a3b18a', fontSize: 12 }}
              label={{
                value: 'Speed (km/h)',
                angle: -90,
                position: 'insideLeft',
                fill: '#a3b18a',
                fontSize: 12
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="speed"
              stroke="#588157"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: '#a3b18a' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpeedChart;