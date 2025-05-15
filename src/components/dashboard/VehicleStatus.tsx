import React from 'react';
import { Vehicle } from '../../types';
import { Thermometer, Battery } from 'lucide-react';

interface VehicleStatusProps {
  vehicle: Vehicle;
}

const VehicleStatus: React.FC<VehicleStatusProps> = ({ vehicle }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-amber-500';
      case 'maintenance': return 'bg-blue-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  const getTemperatureColor = (temp: number) => {
    if (temp < 70) return 'text-[#a3b18a]';
    if (temp < 90) return 'text-amber-400';
    return 'text-red-500';
  };
  
  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-[#a3b18a]';
    if (level > 20) return 'text-amber-400';
    return 'text-red-500';
  };
  
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Vehicle Status</h3>
        <div className="flex items-center">
          <span className={`inline-block w-3 h-3 rounded-full ${getStatusColor(vehicle.status)} mr-2`}></span>
          <span className="text-sm">{getStatusText(vehicle.status)}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-md font-medium mb-2">{vehicle.name} | {vehicle.model}</h4>
        <p className="text-sm text-[#a3b18a]">License: {vehicle.licensePlate}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <Thermometer className={getTemperatureColor(vehicle.metrics.engineTemperature)} size={20} />
          <div className="ml-3">
            <p className="text-sm text-[#a3b18a]">Engine Temperature</p>
            <p className={`font-medium ${getTemperatureColor(vehicle.metrics.engineTemperature)}`}>
              {vehicle.metrics.engineTemperature}°C
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <Battery className={getBatteryColor(vehicle.metrics.batteryLevel)} size={20} />
          <div className="ml-3">
            <p className="text-sm text-[#a3b18a]">Battery</p>
            <p className={`font-medium ${getBatteryColor(vehicle.metrics.batteryLevel)}`}>
              {vehicle.metrics.batteryLevel}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleStatus;