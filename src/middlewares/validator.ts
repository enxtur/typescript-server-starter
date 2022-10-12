import joi from "joi";
import { Request, Response, NextFunction } from "express";
import { ValidationError } from "../libs/error-handler";

export const validate = (schema: joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.method === "GET" ? req.query : req.body, {});
    if (error) {
      return next(new ValidationError(error.details));
    }
    next();
  };
};
