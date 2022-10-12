import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {
  constructor (message: string) {
    super(message);
    this.name = "ValidationError";
  }
}
export class NotfoundError extends Error {
  constructor (message: string) {
    super(message);
    this.name = "NotfoundError";
  }
}  
export class UnauthorizedError extends Error {
  constructor (message: string) {
    super(message);
    this.name = "UnauthorizedError";
  }
}


export function errorHandler (err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof NotfoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
}