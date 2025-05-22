import * as express from 'express';
import { admin } from '../config';
import { AuthenticatedRequest } from '../utils/authMiddleware';
import { calculateDistance, detectHarshBraking, detectHarshAcceleration, isOverspeeding, calculateDrivingScore } from '../utils/analytics';

const router = express.Router();

router.post('/', async (req: AuthenticatedRequest, res) => {
  try {
    const { vehicleId, tripId } = req.body;
    const userId = req.user?.uid;

    if (!userId) {
      return res.status(401).send({ error: 'User not authenticated' });
    }

    if (!vehicleId || !tripId) {
      return res.status(400).send({ error: 'Missing required fields (vehicleId or tripId)' });
    }

    const tripRef = admin.firestore().collection('vehicles').doc(vehicleId).collection('trips').doc(tripId);
    const tripDoc = await tripRef.get();

    if (!tripDoc.exists) {
      return res.status(404).send({ error: 'Trip not found' });
    }

    // Optional: Add a check here to ensure the authenticated user is authorized to end this trip
    // (e.g., if user is admin or if the vehicle assigned to the trip belongs to the user)
    const tripData = tripDoc.data();
    if (req.user?.role !== 'admin' && tripData?.userId !== userId) {
        return res.status(403).send({ error: 'Unauthorized' });
    }


    // Get all realtime data points for this trip\'s duration
    const realtimeDataSnapshot = await admin.firestore()
      .collection('vehicles').doc(vehicleId)
      .collection('realtimeData')
      .where('timestamp', '>=', tripData?.startTime)
      .where('timestamp', '<=', admin.firestore.FieldValue.serverTimestamp())
      .orderBy('timestamp', 'asc')
      .get();

    const realtimeData = realtimeDataSnapshot.docs.map(doc => doc.data());

    // Perform analytics
    let totalDistance = 0;
    const speedData: number[] = [];
    let harshBrakingCount = 0;
    let harshAccelerationCount = 0;
    let overspeedCount = 0;
    const speedThreshold = 100; // Example threshold (in appropriate units, e.g., km/h or mph)

    for (let i = 0; i < realtimeData.length; i++) {
      const data = realtimeData[i];
      speedData.push(data.speed);

      if (i > 0) {
        const prevData = realtimeData[i - 1];
        if (prevData.location && data.location) { // Ensure location data exists
            totalDistance += calculateDistance(prevData.location, data.location);
        }


        // Basic harsh braking/acceleration detection (needs refinement)
        const speedDiff = data.speed - prevData.speed;
        // Ensure timestamps are valid Firestore Timestamps before converting
        const timeDiff = (data.timestamp.toMillis() - prevData.timestamp.toMillis()) / 1000; // in seconds
        if (timeDiff > 0) {
          const acceleration = speedDiff / timeDiff;
          if (acceleration < -5) harshBrakingCount++; // Example threshold
          if (acceleration > 5) harshAccelerationCount++; // Example threshold
        }
      }

      if (isOverspeeding(data.speed, speedThreshold)) {
        overspeedCount++;
      }
    }

    const averageSpeed = realtimeData.length > 0 ? speedData.reduce((sum, speed) => sum + speed, 0) / realtimeData.length : 0;

    // Call the analytics functions and store their results if needed, otherwise remove the unused variable declarations
    // const harshBrakingDetected = detectHarshBraking(speedData); // Use the imported function
    // const harshAccelerationDetected = detectHarshAcceleration(speedData); // Use the imported function
    const drivingScore = calculateDrivingScore(harshBrakingCount, harshAccelerationCount, overspeedCount, totalDistance);


    // Update trip document with analytics results
    await tripRef.update({
      endTime: admin.firestore.FieldValue.serverTimestamp(),
      totalDistance,
      averageSpeed,
      harshBrakingCount,
      harshAccelerationCount,
      overspeedCount,
      drivingScore,
      behaviorSummary: 'Analytics calculated.', // Placeholder
    });

    return res.status(200).send({ success: true, tripId: tripId, analytics: { totalDistance, averageSpeed, harshBrakingCount, harshAccelerationCount, overspeedCount, drivingScore /*, harshBrakingDetected, harshAccelerationDetected*/ } });
  } catch (error) {
    console.error('Error ending trip and calculating analytics:', error);
    return res.status(500).send({ error: 'Failed to end trip and calculate analytics' });
  }
});

export default router;
