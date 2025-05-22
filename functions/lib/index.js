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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const functions = __importStar(require("firebase-functions"));
const express = __importStar(require("express"));
const cors = __importStar(require("cors"));
const authMiddleware_1 = require("./utils/authMiddleware");
const vehicleData_1 = __importDefault(require("./api/vehicleData"));
const startTrip_1 = __importDefault(require("./api/startTrip"));
const endTrip_1 = __importDefault(require("./api/endTrip"));
const getTrip_1 = __importDefault(require("./api/getTrip"));
const getRealtime_1 = __importDefault(require("./api/getRealtime"));
const getVehicles_1 = __importDefault(require("./api/getVehicles"));
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
// Apply authentication middleware to all API routes
// Note: This applies authentication to all routes under /api.
// If some routes should be public, you'll need to apply middleware selectively.
app.use('/api', authMiddleware_1.authenticateUser);
// API routes
app.use('/api/vehicle-data', vehicleData_1.default);
app.use('/api/start-trip', startTrip_1.default);
app.use('/api/end-trip', endTrip_1.default);
app.use('/api/trip', getTrip_1.default);
app.use('/api/realtime', getRealtime_1.default);
app.use('/api/vehicles', getVehicles_1.default);
exports.api = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map