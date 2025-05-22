import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';
import { authenticateUser } from './utils/authMiddleware';

import vehicleDataRouter from './api/vehicleData';
import startTripRouter from './api/startTrip';
import endTripRouter from './api/endTrip';
import getTripRouter from './api/getTrip';
import getRealtimeRouter from './api/getRealtime';
import getVehiclesRouter from './api/getVehicles';

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

// Apply authentication middleware to all API routes
// Note: This applies authentication to all routes under /api.
// If some routes should be public, you'll need to apply middleware selectively.
app.use('/api', authenticateUser);


// API routes
app.use('/api/vehicle-data', vehicleDataRouter);
app.use('/api/start-trip', startTripRouter);
app.use('/api/end-trip', endTripRouter);
app.use('/api/trip', getTripRouter);
app.use('/api/realtime', getRealtimeRouter);
app.use('/api/vehicles', getVehiclesRouter);


export const api = functions.https.onRequest(app);
