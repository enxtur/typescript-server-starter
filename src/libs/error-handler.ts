import { NextFunction, Request, Response } from "express";
import { ValidationErrorItem } from "joi";

export class ValidationError extends Error {
  details?: ValidationErrorItem[];
  constructor (message: string | ValidationErrorItem[]) {
    if (typeof message === "string") {
      super(message);
    } else {
      super("ValidationError");
      this.details = message;
    }
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
    if (err.details) {
      res.status(400).json({ messages: err.details });
    }
    return res.status(400).json({ messages: [err.message] });
  }
  if (err instanceof NotfoundError) {
    return res.status(404).json({ message: err.message });
  }
  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ message: err.message });
  }
  return res.status(500).json({ message: err.message });
}