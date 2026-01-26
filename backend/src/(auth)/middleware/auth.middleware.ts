import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export interface AuthRequest extends Request {
  userId?: number;
  lrn?: string;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      lrn: string;
    };

    req.userId = decoded.userId;
    req.lrn = decoded.lrn;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};