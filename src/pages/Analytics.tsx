import { BarChart2, TrendingUp, Fuel, Clock } from 'lucide-react';

const Analytics: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card p-4 flex items-center space-x-4">
          <TrendingUp size={32} className="text-green-400" />
          <div>
            <p className="text-sm text-[#a3b18a]">Average Speed</p>
            <h3 className="text-lg font-semibold">72 km/h</h3>
          </div>
        </div>

        <div className="card p-4 flex items-center space-x-4">
          <Fuel size={32} className="text-amber-400" />
          <div>
            <p className="text-sm text-[#a3b18a]">Fuel Efficiency</p>
            <h3 className="text-lg font-semibold">13.5 km/l</h3>
          </div>
        </div>

        <div className="card p-4 flex items-center space-x-4">
          <Clock size={32} className="text-blue-400" />
          <div>
            <p className="text-sm text-[#a3b18a]">Total Hours Driven</p>
            <h3 className="text-lg font-semibold">1340 hrs</h3>
          </div>
        </div>

        <div className="card p-4 flex items-center space-x-4">
          <BarChart2 size={32} className="text-purple-400" />
          <div>
            <p className="text-sm text-[#a3b18a]">Trips Completed</p>
            <h3 className="text-lg font-semibold">428</h3>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-bold mb-4">Monthly Trip Summary</h2>
        <div className="h-[300px]">{/* Insert a Chart.js or Recharts chart here */}</div>
      </div>
    </div>
  );
};

export { Analytics };
