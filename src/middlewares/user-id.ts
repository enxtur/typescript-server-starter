import { NextFunction, Response } from "express";
import config from "../config";
import jwt from "jsonwebtoken";
import { Request } from "./user";

export interface JwtDecoded {
  _id: string;
}

export function userId (req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (authorizationHeader) {
    const token = authorizationHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, config.jwt.apiSecret) as JwtDecoded;
      req.userId = decoded._id;
    } finally {
      next();
    }
  } else {
    next();
  }
}