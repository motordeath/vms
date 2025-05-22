import { admin } from '../config';

export async function getUserRole(uid: string): Promise<string | undefined> {
  try {
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    return userDoc.data()?.role;
  } catch (error) {
    console.error('Error getting user role:', error);
    return undefined;
  }
}