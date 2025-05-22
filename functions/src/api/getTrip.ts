import * as express from 'express';
import { admin } from '../config';
import { AuthenticatedRequest } from '../utils/authMiddleware';

const router = express.Router();

router.get('/:vehicleId/:tripId', async (req: AuthenticatedRequest, res) => {
  const { vehicleId, tripId } = req.params;
  const userId = req.user?.uid;
  const userRole = req.user?.role;

  try {
    if (!userId || !userRole) {
      return res.status(401).send({ error: 'User not authenticated' });
    }

    const tripDoc = await admin.firestore().collection('vehicles').doc(vehicleId).collection('trips').doc(tripId).get();

    if (!tripDoc.exists) {
      return res.status(404).send({ error: 'Trip not found.' });
    }

    const tripData = tripDoc.data();

    // Check if the authenticated user has permission to read this trip data
    // This basic check assumes the user ID is stored on the vehicle document.
    if (userRole !== 'admin' && tripData?.userId !== userId) {
      return res.status(403).send({ error: 'Unauthorized' });
    }
    res.status(200).send(tripData);

  } catch (error) {
    console.error('Error fetching trip data:', error);
    res.status(500).send({ error: 'Failed to fetch trip data.' });
  }
});

export default router;