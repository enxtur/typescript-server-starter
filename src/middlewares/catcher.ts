import { NextFunction, Request, Response } from "express";

type Handler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export function catcher (handler: Handler) {
  return function (req: Request, res: Response, next: NextFunction) {
    handler(req, res, next).catch(next);
  };
}