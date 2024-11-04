import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { env } from 'process';
import { logger } from '@/infra/logger';


declare module 'express' {

    export interface Request {
  
      user?: Number;
    }
}  
export default function protect(req: Request, res: Response, next: NextFunction) {\
    try {
    dotenv.config();
    const secret = process.env.SECRET;
    if (!secret) throw new Error('Secret is not defined');
    
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(403).json({ message: 'Access denied' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });

        req.user = user;
        next();
    });
    }
    catch (error) {
        logger.error(error);
        return res.status(500).json({ message: 'Internal server error' });        
    }