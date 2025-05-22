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
const router = express.Router();
router.get('/:vehicleId', async (req, res) => {
    var _a, _b;
    try {
        const { vehicleId } = req.params;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
        const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userId || !userRole) {
            return res.status(401).send({ error: 'User not authenticated' });
        }
        if (!vehicleId) {
            return res.status(400).send({ error: 'Missing vehicleId in parameters' });
        }
        // Check if the user is authorized to view this vehicle's realtime data
        const vehicleDoc = await config_1.admin.firestore().collection('vehicles').doc(vehicleId).get();
        if (!vehicleDoc.exists) {
            return res.status(404).send({ error: 'Vehicle not found' });
        }
        const vehicleData = vehicleDoc.data();
        if (userRole !== 'admin' && (vehicleData === null || vehicleData === void 0 ? void 0 : vehicleData.userId) !== userId) {
            return res.status(403).send({ error: 'Unauthorized' });
        }
        const realtimeDataSnapshot = await config_1.admin.firestore()
            .collection('vehicles').doc(vehicleId)
            .collection('realtimeData')
            .orderBy('timestamp', 'desc')
            .limit(100) // Get last 100 data points
            .get();
        const realtimeData = realtimeDataSnapshot.docs.map(doc => doc.data());
        return res.status(200).send(realtimeData);
    }
    catch (error) {
        console.error('Error fetching realtime data:', error);
        return res.status(500).send({ error: 'Failed to fetch realtime data' });
    }
});
exports.default = router;
//# sourceMappingURL=getRealtime.js.map