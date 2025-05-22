"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDrivingScore = exports.isOverspeeding = exports.detectHarshAcceleration = exports.detectHarshBraking = exports.calculateDistance = void 0;
// Haversine formula to calculate distance between two points on a sphere
function calculateDistance(point1, point2) {
    const R = 6371e3; // metres
    const φ1 = point1.lat * Math.PI / 180; // φ, λ in radians
    const φ2 = point2.lat * Math.PI / 180;
    const Δφ = (point2.lat - point1.lat) * Math.PI / 180;
    const Δλ = (point2.lng - point1.lng) * Math.PI / 180;
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // in metres
    return d;
}
exports.calculateDistance = calculateDistance;
// Placeholder function for detecting harsh braking
function detectHarshBraking(speedData) {
    // Implement harsh braking detection logic here
    // Compare consecutive speed values to detect rapid deceleration
    console.log("Detecting harsh braking (placeholder)");
    return false; // Placeholder return
}
exports.detectHarshBraking = detectHarshBraking;
// Placeholder function for detecting harsh acceleration
function detectHarshAcceleration(speedData) {
    // Implement harsh acceleration detection logic here
    // Compare consecutive speed values to detect rapid acceleration
    console.log("Detecting harsh acceleration (placeholder)");
    return false; // Placeholder return
}
exports.detectHarshAcceleration = detectHarshAcceleration;
// Placeholder function for checking overspeeding
function isOverspeeding(speed, speedThreshold) {
    // Implement overspeeding check
    console.log("Checking overspeeding (placeholder)");
    return speed > speedThreshold;
}
exports.isOverspeeding = isOverspeeding;
// Placeholder function for calculating driving score
function calculateDrivingScore(harshBrakingCount, harshAccelerationCount, overspeedCount, totalDistance) {
    // Implement driving score calculation logic here
    // This is a simplified example; a real-world score would be more complex.
    console.log("Calculating driving score (placeholder)");
    let score = 100;
    score -= harshBrakingCount * 5; // Deduct points for harsh braking
    score -= harshAccelerationCount * 3; // Deduct points for harsh acceleration
    score -= overspeedCount * 7; // Deduct points for overspeeding
    // Ensure the score is not less than 0
    score = Math.max(0, score);
    // Optionally, factor in distance traveled
    // score = score * (totalDistance > 0 ? Math.log(totalDistance) : 1);
    return score;
}
exports.calculateDrivingScore = calculateDrivingScore;
//# sourceMappingURL=analytics.js.map