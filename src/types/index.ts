export interface Vehicle {
  id: string;
  name: string;
  model: string;
  licensePlate: string;
  status: 'active' | 'idle' | 'maintenance' | 'offline';
  metrics: {
    speed: number;
    fuelLevel: number;
    engineTemperature: number;
    rpm: number;
    batteryLevel: number;
    location: {
      latitude: number;
      longitude: number;
      address?: string;
    };
  };
}

export interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  score: number;
  metrics: {
    harshBrakes: number;
    harshAccel: number;
    overspeeds: number;
  };
}

export interface TripData {
  id: string;
  vehicleId: string;
  driverId: string;
  startTime: string;
  endTime: string;
  distance: number;
  averageSpeed: number;
  maxSpeed: number;
  fuelConsumption: number;
  route: Array<{
    latitude: number;
    longitude: number;
    timestamp: string;
    speed: number;
  }>;
}

export interface Alert {
  id: string;
  vehicleId: string;
  type: 'overspeed' | 'lowFuel' | 'highTemperature' | 'maintenance' | 'geofence';
  message: string;
  timestamp: string;
  read: boolean;
  severity: 'low' | 'medium' | 'high';
}