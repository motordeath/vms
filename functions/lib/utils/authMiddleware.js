"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const config_1 = require("../config");
const auth_1 = require("./auth");
const authenticateUser = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ error: 'No authorization header' });
    }
    const token = authHeader.split('Bearer ')[1];
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const decodedToken = await config_1.admin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;
        const role = await (0, auth_1.getUserRole)(uid);
        if (!role) {
            // If user has no role defined in Firestore, you might choose to
            // deny access or assign a default role. Here, we deny.
            return res.status(403).send({ error: 'User role not found' });
        }
        req.user = { uid, role };
        next();
    }
    catch (error) {
        console.error('Error verifying auth token:', error);
        // Return an error response in case of token verification failure
        return res.status(401).send({ error: 'Invalid token' });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authMiddleware.js.map