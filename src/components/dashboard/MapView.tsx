import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vehicle } from '../../types';

const truckIcon = new Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/@raruto/leaflet-elevation@2.5.0/images/elevation-poi.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

const routeCoordinates = [
  [26.4499, 80.3319], // Kanpur
  [26.5124, 80.4234],
  [26.5922, 80.6542],
  [26.6489, 80.7221],
  [26.7606, 80.8855],
  [26.8123, 80.9157],
  [26.8345, 80.9289],
  [26.8467, 80.9462]  // Lucknow
];

interface MapViewProps {
  vehicles: Vehicle[];
  selectedVehicleId?: string;
  height?: string;
}

const MapRecenter: React.FC<{ 
  lat: number; 
  lng: number; 
  zoom?: number 
}> = ({ lat, lng, zoom = 10 }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [lat, lng, zoom, map]);
  
  return null;
};

const MapView: React.FC<MapViewProps> = ({ 
  vehicles, 
  selectedVehicleId, 
  height = 'h-[300px] md:h-[400px]' 
}) => {
  const selectedVehicle = selectedVehicleId 
    ? vehicles.find(v => v.id === selectedVehicleId) 
    : vehicles[0];
  
  if (!selectedVehicle) {
    return (
      <div className={`card ${height} flex items-center justify-center`}>
        <p>No vehicle data available</p>
      </div>
    );
  }
  
  const { latitude, longitude } = selectedVehicle.metrics.location;
  
  return (
    <div className={`card ${height} overflow-hidden`}>
      <div className="h-full">
        <MapContainer
          center={[26.6489, 80.7221]} // Center between Kanpur and Lucknow
          zoom={9}
          className="h-full w-full z-0"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* Route line */}
          <Polyline
            positions={routeCoordinates as [number, number][]}
            color="#588157"
            weight={3}
            opacity={0.7}
          />
          
          {vehicles.map((vehicle) => (
            <Marker 
              key={vehicle.id}
              position={[vehicle.metrics.location.latitude, vehicle.metrics.location.longitude]}
              icon={truckIcon}
            >
              <Popup>
                <div className="text-gray-800">
                  <h3 className="font-bold">{vehicle.name}</h3>
                  <p>Status: {vehicle.status}</p>
                  <p>Speed: {vehicle.metrics.speed} km/h</p>
                  {vehicle.metrics.location.address && (
                    <p>Location: {vehicle.metrics.location.address}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
          
          <MapRecenter lat={latitude} lng={longitude} />
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;