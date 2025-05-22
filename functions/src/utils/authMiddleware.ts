import { Request, Response, NextFunction } from 'express';
import { admin } from '../config';
import { getUserRole } from './auth';


export interface AuthenticatedRequest extends Request {
  user?: {
    uid: string;
    role: string;
  };
}

export const authenticateUser = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'No authorization header' });
  }

  const token = authHeader.split('Bearer ')[1];
  if (!token) {
    return res.status(401).send({ error: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;
    const role = await getUserRole(uid);

    if (!role) {
      // If user has no role defined in Firestore, you might choose to
      // deny access or assign a default role. Here, we deny.
      return res.status(403).send({ error: 'User role not found' });
    }

    req.user = { uid, role };
    next();
  } catch (error) {
    console.error('Error verifying auth token:', error);
    // Return an error response in case of token verification failure
    return res.status(401).send({ error: 'Invalid token' });
  }
};
