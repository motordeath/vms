import React, { useState } from 'react';
import Speedometer from '../components/dashboard/Speedometer';
import CircularGauge from '../components/dashboard/CircularGauge';
import MapView from '../components/dashboard/MapView';
import VehicleStatus from '../components/dashboard/VehicleStatus';
import SpeedChart from '../components/dashboard/SpeedChart';
import AlertList from '../components/dashboard/AlertList';
import DriverBehavior from '../components/dashboard/DriverBehavior';
import { vehicles, drivers, alerts, speedDataPoints } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <select 
            className="custom-input min-w-[200px]"
            value={selectedVehicle.id}
            onChange={(e) => {
              const vehicle = vehicles.find(v => v.id === e.target.value);
              if (vehicle) setSelectedVehicle(vehicle);
            }}
          >
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.name} ({vehicle.licensePlate})
              </option>
            ))}
          </select>
          
          <button className="btn-primary whitespace-nowrap">
            Refresh Data
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card flex items-center justify-center p-6">
          <Speedometer currentSpeed={selectedVehicle.metrics.speed} />
        </div>
        
        <div className="card flex items-center justify-center p-6">
          <CircularGauge 
            value={selectedVehicle.metrics.fuelLevel} 
            maxValue={100} 
            label="Fuel Level" 
            unit="%"
            size="lg"
            colorRanges={[
              { value: 25, color: '#e63946' },
              { value: 50, color: '#ffc857' },
              { value: 100, color: '#588157' }
            ]}
          />
        </div>
        
        <div className="card flex items-center justify-center p-6">
          <CircularGauge 
            value={selectedVehicle.metrics.engineTemperature} 
            maxValue={120} 
            label="Engine Temperature" 
            unit="°C"
            size="lg"
            colorRanges={[
              { value: 70, color: '#588157' },
              { value: 90, color: '#ffc857' },
              { value: 120, color: '#e63946' }
            ]}
          />
        </div>
        
        <div className="card flex items-center justify-center p-6">
          <CircularGauge 
            value={selectedVehicle.metrics.rpm} 
            maxValue={5000} 
            label="RPM" 
            unit=""
            size="lg"
            colorRanges={[
              { value: 2000, color: '#588157' },
              { value: 3500, color: '#ffc857' },
              { value: 5000, color: '#e63946' }
            ]}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[400px]">
          <MapView vehicles={vehicles} selectedVehicleId={selectedVehicle.id} height="h-full" />
        </div>
        
        <div>
          <VehicleStatus vehicle={selectedVehicle} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SpeedChart data={speedDataPoints} height={300} />
        </div>
        
        <div className="h-full">
          <AlertList alerts={alerts} limit={4} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-medium mb-6">Trip Statistics</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#344e41] p-6 rounded-lg">
                <p className="text-sm text-[#a3b18a] mb-2">Total Distance</p>
                <p className="text-2xl font-semibold">120.5 km</p>
              </div>
              <div className="bg-[#344e41] p-6 rounded-lg">
                <p className="text-sm text-[#a3b18a] mb-2">Average Speed</p>
                <p className="text-2xl font-semibold">45.2 km/h</p>
              </div>
              <div className="bg-[#344e41] p-6 rounded-lg">
                <p className="text-sm text-[#a3b18a] mb-2">Fuel Consumption</p>
                <p className="text-2xl font-semibold">18.3 L</p>
              </div>
              <div className="bg-[#344e41] p-6 rounded-lg">
                <p className="text-sm text-[#a3b18a] mb-2">Driving Time</p>
                <p className="text-2xl font-semibold">3.5 hr</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <DriverBehavior driver={{
            ...drivers[0],
            licenseNumber: drivers[0].license,
            score: 0, // Provide a default or calculated score
            metrics: {
              harshBrakes: 0,
              harshAccel: 0,
              overspeeds: 0
            }
          }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;