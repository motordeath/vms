import * as express from 'express';
import { admin } from '../config';
import { AuthenticatedRequest } from '../utils/authMiddleware';

const router = express.Router();

router.get('/', async (req: AuthenticatedRequest, res) => {
  try {
    const userId = req.user?.uid;
    const userRole = req.user?.role;

    if (!userId || !userRole) {
      return res.status(401).send({ error: 'User not authenticated' });
    }

    let vehiclesSnapshot;

    if (userRole === 'admin') {
      // Admins can see all vehicles
      vehiclesSnapshot = await admin.firestore().collection('vehicles').get();
    } else {
      // Drivers can only see their assigned vehicles
      vehiclesSnapshot = await admin.firestore().collection('vehicles').where('userId', '==', userId).get();
    }

    const vehicles = vehiclesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).send(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return res.status(500).send({ error: 'Failed to fetch vehicles' });
  }
});

export default router;
