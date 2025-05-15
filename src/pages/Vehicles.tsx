// Vehicles.tsx
import { Truck } from 'lucide-react';
import { vehicles } from '../data/mockData';

const Vehicles: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vehicles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <div key={vehicle.id} className="card p-4 space-y-2">
            <div className="flex items-center space-x-3">
              <Truck size={28} className="text-[#a3b18a]" />
              <h2 className="text-lg font-medium">{vehicle.name}</h2>
            </div>
            <p className="text-sm text-[#dad7cd]">License: {vehicle.licensePlate}</p>
            <p className="text-sm text-[#dad7cd]">Status: {vehicle.status}</p>
            <p className="text-sm text-[#dad7cd]">Speed: {vehicle.metrics.speed} km/h</p>
            <p className="text-sm text-[#dad7cd]">Fuel Level: {vehicle.metrics.fuelLevel}%</p>
            <p className="text-sm text-[#dad7cd] truncate">Location: {vehicle.metrics.location.address || 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Vehicles };
