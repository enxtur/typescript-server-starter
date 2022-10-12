import { NextFunction, Response } from "express";
import { UnauthorizedError } from "../libs/error-handler";
import { Request } from "./user";

export async function authorization (req: Request, res: Response, next: NextFunction) {
  if (!req.userId) {
    return next(new UnauthorizedError("Unauthorized"));
  }
  next();
}