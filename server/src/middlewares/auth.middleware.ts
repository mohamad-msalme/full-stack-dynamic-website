import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get token from cookie
        console.log(req.cookies)
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).send({error: {
                message: "Unauthorized"
            }});
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

        // Attach user ID to request object
        req.userId = decoded.userId;

        return next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(401).send({error: {
                message: "Unauthorized"
        }});
    }
};