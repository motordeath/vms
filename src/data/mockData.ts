import { Vehicle, Driver, TripData, Alert } from '../types';

export const vehicles: Vehicle[] = [
  {
    id: 'v1',
    name: 'Truck Alpha',
    model: 'Tata Prima 4928.S',
    licensePlate: 'UP 78 BT 1234',
    status: 'active',
    metrics: {
      speed: 65,
      fuelLevel: 85,
      engineTemperature: 85,
      rpm: 2477,
      batteryLevel: 92,
      location: {
        latitude: 26.8467,
        longitude: 80.9462,
        address: 'Lucknow, Uttar Pradesh'
      }
    }
  },
  {
    id: 'v2',
    name: 'Van Beta',
    model: 'Mahindra Supro',
    licensePlate: 'UP 78 CT 5678',
    status: 'idle',
    metrics: {
      speed: 0,
      fuelLevel: 65,
      engineTemperature: 65,
      rpm: 800,
      batteryLevel: 87,
      location: {
        latitude: 26.4499,
        longitude: 80.3319,
        address: 'Kanpur, Uttar Pradesh'
      }
    }
  },
  {
    id: 'v3',
    name: 'Delivery Gamma',
    model: 'Ashok Leyland Partner',
    licensePlate: 'UP 78 DT 9012',
    status: 'maintenance',
    metrics: {
      speed: 0,
      fuelLevel: 20,
      engineTemperature: 45,
      rpm: 0,
      batteryLevel: 45,
      location: {
        latitude: 26.7606,
        longitude: 80.8855,
        address: 'Unnao, Uttar Pradesh'
      }
    }
  },
  {
    id: 'v4',
    name: 'Truck Delta',
    model: 'BharatBenz 1217C',
    licensePlate: 'UP 78 ET 3456',
    status: 'active',
    metrics: {
      speed: 72,
      fuelLevel: 45,
      engineTemperature: 82,
      rpm: 2100,
      batteryLevel: 88,
      location: {
        latitude: 26.5922,
        longitude: 80.6542,
        address: 'Between Kanpur and Lucknow'
      }
    }
  },
  {
    id: 'v5',
    name: 'Container Echo',
    model: 'Tata LPT 3518',
    licensePlate: 'UP 78 FT 7890',
    status: 'active',
    metrics: {
      speed: 58,
      fuelLevel: 70,
      engineTemperature: 78,
      rpm: 1900,
      batteryLevel: 95,
      location: {
        latitude: 26.6489,
        longitude: 80.7221,
        address: 'NH27, Uttar Pradesh'
      }
    }
  }
];

export const driverList: Driver[] = [
  {
    id: 'd1',
    name: 'Rajesh Kumar',
    licenseNumber: 'UP-CDL-12345',
    score: 92,
    metrics: {
      harshBrakes: 2,
      harshAccel: 1,
      overspeeds: 1
    }
  },
  {
    id: 'd2',
    name: 'Amit Singh',
    licenseNumber: 'UP-CDL-67890',
    score: 98,
    metrics: {
      harshBrakes: 0,
      harshAccel: 1,
      overspeeds: 0
    }
  },
  {
    id: 'd3',
    name: 'Pradeep Verma',
    licenseNumber: 'UP-CDL-54321',
    score: 85,
    metrics: {
      harshBrakes: 4,
      harshAccel: 3,
      overspeeds: 2
    }
  },
  {
    id: 'd4',
    name: 'Suresh Yadav',
    licenseNumber: 'UP-CDL-98765',
    score: 88,
    metrics: {
      harshBrakes: 3,
      harshAccel: 2,
      overspeeds: 1
    }
  },
  {
    id: 'd5',
    name: 'Manoj Sharma',
    licenseNumber: 'UP-CDL-45678',
    score: 95,
    metrics: {
      harshBrakes: 1,
      harshAccel: 0,
      overspeeds: 1
    }
  }
];

export const tripHistory: TripData[] = [
  {
    id: 't1',
    vehicleId: 'v1',
    driverId: 'd1',
    startTime: '2024-02-20T08:00:00Z',
    endTime: '2024-02-20T11:30:00Z',
    distance: 88.5,
    averageSpeed: 45.2,
    maxSpeed: 72.1,
    fuelConsumption: 18.3,
    route: [
      { latitude: 26.4499, longitude: 80.3319, timestamp: '2024-02-20T08:00:00Z', speed: 0 },
      { latitude: 26.5124, longitude: 80.4234, timestamp: '2024-02-20T08:30:00Z', speed: 45 },
      { latitude: 26.5922, longitude: 80.6542, timestamp: '2024-02-20T09:00:00Z', speed: 65 },
      { latitude: 26.6489, longitude: 80.7221, timestamp: '2024-02-20T09:30:00Z', speed: 72 },
      { latitude: 26.7606, longitude: 80.8855, timestamp: '2024-02-20T10:00:00Z', speed: 68 },
      { latitude: 26.8123, longitude: 80.9157, timestamp: '2024-02-20T10:30:00Z', speed: 60 },
      { latitude: 26.8345, longitude: 80.9289, timestamp: '2024-02-20T11:00:00Z', speed: 40 },
      { latitude: 26.8467, longitude: 80.9462, timestamp: '2024-02-20T11:30:00Z', speed: 0 }
    ]
  }
];

export const alerts: Alert[] = [
  {
    id: 'a1',
    vehicleId: 'v1',
    type: 'overspeed',
    message: 'Vehicle exceeded speed limit (80 km/h)',
    timestamp: '2024-02-20T09:35:00Z',
    read: false,
    severity: 'medium'
  },
  {
    id: 'a2',
    vehicleId: 'v3',
    type: 'lowFuel',
    message: 'Fuel level below 25%',
    timestamp: '2024-02-20T10:15:00Z',
    read: false,
    severity: 'low'
  },
  {
    id: 'a3',
    vehicleId: 'v1',
    type: 'highTemperature',
    message: 'Engine temperature above 95°C',
    timestamp: '2024-02-20T10:05:00Z',
    read: true,
    severity: 'high'
  },
  {
    id: 'a4',
    vehicleId: 'v4',
    type: 'maintenance',
    message: 'Scheduled maintenance due in 2 days',
    timestamp: '2024-02-20T11:20:00Z',
    read: false,
    severity: 'low'
  }
];

// mockData.ts or wherever you store your dummy data
export const drivers = [
  {
    id: 'd1',
    name: 'Rajesh Kumar',
    phone: '9876543210',
    license: 'UP-CDL-12345',
    trips: 120,
    rating: 4.7,
    status: 'active',
  },
  {
    id: 'd2',
    name: 'Amit Singh',
    phone: '9876512345',
    license: 'UP-CDL-67890',
    trips: 98,
    rating: 4.3,
    status: 'on leave',
  },
  {
    id: 'd3',
    name: 'Pradeep Verma',
    phone: '9876598765',
    license: 'UP-CDL-54321',
    trips: 150,
    rating: 4.9,
    status: 'active',
  },
  {
    id: 'd4',
    name: 'Suresh Yadav',
    phone: '9876543211',
    license: 'UP-CDL-98765',
    trips: 130,
    rating: 4.5,
    status: 'active',
  },
  {
    id: 'd5',
    name: 'Manoj Sharma',
    phone: '9876577654',
    license: 'UP-CDL-45678',
    trips: 110,
    rating: 4.8,
    status: 'inactive',
  }
];


export const speedDataPoints = Array(100).fill(0).map((_, i) => ({
  time: i,
  speed: 50 + Math.sin(i / 5) * 20 + Math.random() * 10
}));