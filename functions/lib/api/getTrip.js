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
router.get('/:vehicleId/:tripId', async (req, res) => {
    var _a, _b;
    const { vehicleId, tripId } = req.params;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
    const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
    try {
        if (!userId || !userRole) {
            return res.status(401).send({ error: 'User not authenticated' });
        }
        const tripDoc = await config_1.admin.firestore().collection('vehicles').doc(vehicleId).collection('trips').doc(tripId).get();
        if (!tripDoc.exists) {
            return res.status(404).send({ error: 'Trip not found.' });
        }
        const tripData = tripDoc.data();
        // Check if the authenticated user has permission to read this trip data
        // This basic check assumes the user ID is stored on the vehicle document.
        if (userRole !== 'admin' && (tripData === null || tripData === void 0 ? void 0 : tripData.userId) !== userId) {
            return res.status(403).send({ error: 'Unauthorized' });
        }
        res.status(200).send(tripData);
    }
    catch (error) {
        console.error('Error fetching trip data:', error);
        res.status(500).send({ error: 'Failed to fetch trip data.' });
    }
});
exports.default = router;
//# sourceMappingURL=getTrip.js.map