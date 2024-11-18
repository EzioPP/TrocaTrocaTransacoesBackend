import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '@/infra/logger';

declare module 'express' {
  export interface Request {
    user?: string | jwt.JwtPayload;
  }
}

export default function protect(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const secret = process.env.SECRET_KEY;

    if (!secret) throw new Error('Secret is not defined');

    const token = req.cookies?.token;

    if (!token) {
      return res.status(403).json({ message: 'Access denied' });
    }

    interface JwtPayloadWithUser extends jwt.JwtPayload {
      user: string;
    }

    const verifyCallback: jwt.VerifyCallback = (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });

      req.user = user as JwtPayloadWithUser;
      next();
    };

    jwt.verify(token, secret, verifyCallback);

    console.log('Token:', token);
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
