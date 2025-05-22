"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const config_1 = require("../config");
const analytics_1 = require("../utils/analytics");
const router = express.Router();
router.post('/', async (req, res) => {
    var _a, _b;
    try {
        const { vehicleId, tripId } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
        if (!userId) {
            return res.status(401).send({ error: 'User not authenticated' });
        }
        if (!vehicleId || !tripId) {
            return res.status(400).send({ error: 'Missing required fields (vehicleId or tripId)' });
        }
        const tripRef = config_1.admin.firestore().collection('vehicles').doc(vehicleId).collection('trips').doc(tripId);
        const tripDoc = await tripRef.get();
        if (!tripDoc.exists) {
            return res.status(404).send({ error: 'Trip not found' });
        }
        // Optional: Add a check here to ensure the authenticated user is authorized to end this trip
        // (e.g., if user is admin or if the vehicle assigned to the trip belongs to the user)
        const tripData = tripDoc.data();
        if (((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) !== 'admin' && (tripData === null || tripData === void 0 ? void 0 : tripData.userId) !== userId) {
            return res.status(403).send({ error: 'Unauthorized' });
        }
        // Get all realtime data points for this trip\'s duration
        const realtimeDataSnapshot = await config_1.admin.firestore()
            .collection('vehicles').doc(vehicleId)
            .collection('realtimeData')
            .where('timestamp', '>=', tripData === null || tripData === void 0 ? void 0 : tripData.startTime)
            .where('timestamp', '<=', config_1.admin.firestore.FieldValue.serverTimestamp())
            .orderBy('timestamp', 'asc')
            .get();
        const realtimeData = realtimeDataSnapshot.docs.map(doc => doc.data());
        // Perform analytics
        let totalDistance = 0;
        const speedData = [];
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
                    totalDistance += (0, analytics_1.calculateDistance)(prevData.location, data.location);
                }
                // Basic harsh braking/acceleration detection (needs refinement)
                const speedDiff = data.speed - prevData.speed;
                // Ensure timestamps are valid Firestore Timestamps before converting
                const timeDiff = (data.timestamp.toMillis() - prevData.timestamp.toMillis()) / 1000; // in seconds
                if (timeDiff > 0) {
                    const acceleration = speedDiff / timeDiff;
                    if (acceleration < -5)
                        harshBrakingCount++; // Example threshold
                    if (acceleration > 5)
                        harshAccelerationCount++; // Example threshold
                }
            }
            if ((0, analytics_1.isOverspeeding)(data.speed, speedThreshold)) {
                overspeedCount++;
            }
        }
        const averageSpeed = realtimeData.length > 0 ? speedData.reduce((sum, speed) => sum + speed, 0) / realtimeData.length : 0;
        const harshBrakingDetected = (0, analytics_1.detectHarshBraking)(speedData); // Use the imported function
        const harshAccelerationDetected = (0, analytics_1.detectHarshAcceleration)(speedData); // Use the imported function
        const drivingScore = (0, analytics_1.calculateDrivingScore)(harshBrakingCount, harshAccelerationCount, overspeedCount, totalDistance);
        // Update trip document with analytics results
        await tripRef.update({
            endTime: config_1.admin.firestore.FieldValue.serverTimestamp(),
            totalDistance,
            averageSpeed,
            harshBrakingCount,
            harshAccelerationCount,
            overspeedCount,
            drivingScore,
            behaviorSummary: 'Analytics calculated.', // Placeholder
        });
        return res.status(200).send({ success: true, tripId: tripId, analytics: { totalDistance, averageSpeed, harshBrakingCount, harshAccelerationCount, overspeedCount, drivingScore } });
    }
    catch (error) {
        console.error('Error ending trip and calculating analytics:', error);
        return res.status(500).send({ error: 'Failed to end trip and calculate analytics' });
    }
});
exports.default = router;
//# sourceMappingURL=endTrip.js.map