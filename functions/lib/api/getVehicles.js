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
router.get('/', async (req, res) => {
    var _a, _b;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.uid;
        const userRole = (_b = req.user) === null || _b === void 0 ? void 0 : _b.role;
        if (!userId || !userRole) {
            return res.status(401).send({ error: 'User not authenticated' });
        }
        let vehiclesSnapshot;
        if (userRole === 'admin') {
            // Admins can see all vehicles
            vehiclesSnapshot = await config_1.admin.firestore().collection('vehicles').get();
        }
        else {
            // Drivers can only see their assigned vehicles
            vehiclesSnapshot = await config_1.admin.firestore().collection('vehicles').where('userId', '==', userId).get();
        }
        const vehicles = vehiclesSnapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        return res.status(200).send(vehicles);
    }
    catch (error) {
        console.error('Error fetching vehicles:', error);
        return res.status(500).send({ error: 'Failed to fetch vehicles' });
    }
});
exports.default = router;
//# sourceMappingURL=getVehicles.js.map