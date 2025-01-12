import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { config } from "@/config/config";

export interface AuthRequest extends Request {
    user?: any
}

export const authMiddleware = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            throw new Error()
        }
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).send({ message: 'Authentication required' });
    }

} 