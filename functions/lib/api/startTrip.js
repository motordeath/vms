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
router.post('/', async (req, res) => {
    var _a;
    try {
        const { vehicleId } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
        if (!userId) {
            return res.status(401).send({ error: 'User not authenticated' });
        }
        if (!vehicleId) {
            return res.status(400).send({ error: 'Missing vehicleId' });
        }
        // Optional: Add a check here to ensure the authenticated user is authorized to start a trip for this vehicle
        const vehicleDoc = await config_1.admin.firestore().collection('vehicles').doc(vehicleId).get();
        if (!vehicleDoc.exists) {
            return res.status(404).send({ error: 'Vehicle not found' });
        }
        const vehicleData = vehicleDoc.data();
        if ((vehicleData === null || vehicleData === void 0 ? void 0 : vehicleData.userId) !== userId) {
            return res.status(403).send({ error: 'Unauthorized' });
        }
        const tripRef = await config_1.admin.firestore()
            .collection('vehicles').doc(vehicleId)
            .collection('trips').add({
            startTime: config_1.admin.firestore.FieldValue.serverTimestamp(),
            userId: userId, // Store userId in trip document for easier querying
        });
        return res.status(200).send({ tripId: tripRef.id });
    }
    catch (error) {
        console.error('Error starting trip:', error);
        return res.status(500).send({ error: 'Failed to start trip' });
    }
});
exports.default = router;
//# sourceMappingURL=startTrip.js.map