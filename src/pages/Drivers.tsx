import { User } from 'lucide-react';
import { drivers } from '../data/mockData';

const Drivers: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Drivers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.map((driver) => (
          <div key={driver.id} className="card p-4 space-y-2">
            <div className="flex items-center space-x-3">
              <User size={28} className="text-[#a3b18a]" />
              <h2 className="text-lg font-medium">{driver.name}</h2>
            </div>
            <p className="text-sm text-[#dad7cd]">Phone:{driver.phone}</p>
            <p className="text-sm text-[#dad7cd]">License: {driver.license}</p>
            <p className="text-sm text-[#dad7cd]">Trips Completed: {driver.trips}</p>
            <p className="text-sm text-[#dad7cd]">Rating: {driver.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Drivers };
