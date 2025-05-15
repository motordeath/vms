import React, { useState } from 'react';
import MapView from '../components/dashboard/MapView';
import CircularGauge from '../components/dashboard/CircularGauge';
import VehicleStatus from '../components/dashboard/VehicleStatus';
import { vehicles } from '../data/mockData';
import { Map, List, Play, Pause, Truck } from 'lucide-react';

const LiveTracking: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [view, setView] = useState<'map' | 'list'>('map');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Live Tracking</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-[#344e41] rounded-md overflow-hidden">
            <button 
              className={`px-4 py-2 flex items-center ${view === 'map' ? 'bg-[#588157]' : ''}`}
              onClick={() => setView('map')}
            >
              <Map size={18} className="mr-2" />
              <span className="hidden sm:inline">Map View</span>
            </button>
            <button 
              className={`px-4 py-2 flex items-center ${view === 'list' ? 'bg-[#588157]' : ''}`}
              onClick={() => setView('list')}
            >
              <List size={18} className="mr-2" />
              <span className="hidden sm:inline">List View</span>
            </button>
          </div>
          
          <button 
            className="btn-secondary flex items-center"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <>
                <Pause size={18} className="mr-2" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={18} className="mr-2" />
                <span>Resume</span>
              </>
            )}
          </button>
        </div>
      </div>
      
      {view === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <MapView vehicles={vehicles} selectedVehicleId={selectedVehicle.id} height="h-[600px]" />
          </div>
          
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium mb-4">Vehicles</h3>
              <div className="space-y-3">
                {vehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id}
                    className={`
                      p-3 rounded-md cursor-pointer flex items-center
                      ${selectedVehicle.id === vehicle.id ? 'bg-[#3a5a40]' : 'bg-[#344e41]'}
                    `}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="mr-3">
                      <Truck size={20} className="text-[#a3b18a]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{vehicle.name}</h4>
                      <p className="text-sm text-[#a3b18a]">{vehicle.licensePlate}</p>
                    </div>
                    <div 
                      className={`
                        w-3 h-3 rounded-full
                        ${vehicle.status === 'active' ? 'bg-green-500' : 
                          vehicle.status === 'idle' ? 'bg-amber-500' : 
                          vehicle.status === 'maintenance' ? 'bg-blue-500' : 'bg-red-500'}
                      `}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="card flex items-center justify-center py-2">
                <CircularGauge 
                  value={selectedVehicle.metrics.speed} 
                  maxValue={180} 
                  label="Speed" 
                  unit="km/h"
                  size="sm"
                />
              </div>
              <div className="card flex items-center justify-center py-2">
                <CircularGauge 
                  value={selectedVehicle.metrics.fuelLevel} 
                  maxValue={100} 
                  label="Fuel" 
                  unit="%"
                  size="sm"
                />
              </div>
            </div>
            
            <VehicleStatus vehicle={selectedVehicle} />
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#3a5a40]">
                  <th className="py-3 px-4">Vehicle</th>
                  <th className="py-3 px-4">License</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Speed</th>
                  <th className="py-3 px-4">Fuel</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr 
                    key={vehicle.id}
                    className="border-b border-[#3a5a40] hover:bg-[#344e41]/50 transition-colors"
                  >
                    <td className="py-3 px-4">{vehicle.name}</td>
                    <td className="py-3 px-4">{vehicle.licensePlate}</td>
                    <td className="py-3 px-4">
                      <span className={`
                        px-2 py-1 rounded-full text-xs
                        ${vehicle.status === 'active' ? 'bg-green-500/20 text-green-400' : 
                          vehicle.status === 'idle' ? 'bg-amber-500/20 text-amber-400' : 
                          vehicle.status === 'maintenance' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-red-500/20 text-red-400'}
                      `}>
                        {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{vehicle.metrics.speed} km/h</td>
                    <td className="py-3 px-4">{vehicle.metrics.fuelLevel}%</td>
                    <td className="py-3 px-4 max-w-[200px] truncate">
                      {vehicle.metrics.location.address || 'Unknown location'}
                    </td>
                    <td className="py-3 px-4">
                      <button 
                        className="btn-secondary py-1 px-3 text-sm"
                        onClick={() => {
                          setSelectedVehicle(vehicle);
                          setView('map');
                        }}
                      >
                        Track
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveTracking;