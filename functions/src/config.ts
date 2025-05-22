import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
// Check if the app is already initialized to avoid errors in development
if (!admin.apps.length) {
  admin.initializeApp();
}

export { admin };