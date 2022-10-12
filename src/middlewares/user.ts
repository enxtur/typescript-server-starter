import express, { NextFunction, Response } from "express";
import { User, UserDocument } from "../models/User";
export interface Request extends express.Request {
  user?: UserDocument | null;
  userId?: string;
}

export async function user (req: Request, res: Response, next: NextFunction) {
  if (req.userId) {
    req.user = await User.findById(req.userId);
  }
  next();
}