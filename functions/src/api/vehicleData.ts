import * as express from 'express';
import { admin } from '../config';
import { AuthenticatedRequest } from '../utils/authMiddleware';

const router = express.Router();

router.post('/', async (req: AuthenticatedRequest, res) => {
  try {
    const { vehicleId, timestamp, speed, fuelLevel, location } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).send({ error: 'User not authenticated' });
    }

    if (!vehicleId || !timestamp || speed === undefined || fuelLevel === undefined || !location) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    // Add a check here to ensure the authenticated user is authorized to update this vehicle's data
    const vehicleDoc = await admin.firestore().collection('vehicles').doc(vehicleId).get();
    if (!vehicleDoc.exists) {
        return res.status(404).send({ error: 'Vehicle not found' });
    }
    const vehicleData = vehicleDoc.data();

    if (req.user?.role !== 'admin' && vehicleData?.userId !== userId) {
        return res.status(403).send({ error: 'Unauthorized' });
    }


    await admin.firestore()
      .collection('vehicles').doc(vehicleId)
      .collection('realtimeData').add({
        timestamp: admin.firestore.Timestamp.fromMillis(timestamp),
        speed,
        fuelLevel,
        location,
      });

    return res.status(200).send({ success: true });
  } catch (error) {
    console.error('Error adding vehicle data:', error);
    return res.status(500).send({ error: 'Failed to add vehicle data' });
  }
});

export default router;
