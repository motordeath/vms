"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserRole = void 0;
const config_1 = require("../config");
async function getUserRole(uid) {
    var _a;
    try {
        const userDoc = await config_1.admin.firestore().collection('users').doc(uid).get();
        return (_a = userDoc.data()) === null || _a === void 0 ? void 0 : _a.role;
    }
    catch (error) {
        console.error('Error getting user role:', error);
        return undefined;
    }
}
exports.getUserRole = getUserRole;
//# sourceMappingURL=auth.js.map