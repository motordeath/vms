import * as express from 'express';
import { admin } from '../config';
import { AuthenticatedRequest } from '../utils/authMiddleware';

const router = express.Router();

router.get('/:vehicleId', async (req: AuthenticatedRequest, res) => {
  try {
    const { vehicleId } = req.params;
    const userId = req.user?.uid;
    const userRole = req.user?.role;

    if (!userId || !userRole) {
      return res.status(401).send({ error: 'User not authenticated' });
    }

    if (!vehicleId) {
      return res.status(400).send({ error: 'Missing vehicleId in parameters' });
    }

    // Check if the user is authorized to view this vehicle's realtime data
    const vehicleDoc = await admin.firestore().collection('vehicles').doc(vehicleId).get();
    if (!vehicleDoc.exists) {
      return res.status(404).send({ error: 'Vehicle not found' });
    }

    const vehicleData = vehicleDoc.data();
    if (userRole !== 'admin' && vehicleData?.userId !== userId) {
        return res.status(403).send({ error: 'Unauthorized' });
    }


    const realtimeDataSnapshot = await admin.firestore()
      .collection('vehicles').doc(vehicleId)
      .collection('realtimeData')
      .orderBy('timestamp', 'desc')
      .limit(100) // Get last 100 data points
      .get();

    const realtimeData = realtimeDataSnapshot.docs.map(doc => doc.data());

    return res.status(200).send(realtimeData);
  } catch (error) {
    console.error('Error fetching realtime data:', error);
    return res.status(500).send({ error: 'Failed to fetch realtime data' });
  }
});

export default router;
