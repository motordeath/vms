import * as express from 'express';
import { admin } from '../config';
import { AuthenticatedRequest } from '../utils/authMiddleware';

const router = express.Router();

router.post('/', async (req: AuthenticatedRequest, res) => {
  try {
    const { vehicleId } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).send({ error: 'User not authenticated' });
    }

    if (!vehicleId) {
      return res.status(400).send({ error: 'Missing vehicleId' });
    }

    // Optional: Add a check here to ensure the authenticated user is authorized to start a trip for this vehicle
    const vehicleDoc = await admin.firestore().collection('vehicles').doc(vehicleId).get();
    if (!vehicleDoc.exists) {
      return res.status(404).send({ error: 'Vehicle not found' });
    }
    const vehicleData = vehicleDoc.data();
    if (vehicleData?.userId !== userId) {
        return res.status(403).send({ error: 'Unauthorized' });
    }


    const tripRef = await admin.firestore()
      .collection('vehicles').doc(vehicleId)
      .collection('trips').add({
        startTime: admin.firestore.FieldValue.serverTimestamp(),
        userId: userId, // Store userId in trip document for easier querying
      });

    return res.status(200).send({ tripId: tripRef.id });
  } catch (error) {
    console.error('Error starting trip:', error);
    return res.status(500).send({ error: 'Failed to start trip' });
  }
});

export default router;
