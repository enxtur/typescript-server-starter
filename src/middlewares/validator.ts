import joi from "joi";
import { Request, Response, NextFunction } from "express";

interface ErrorMessage {
  [key: string]: {
    type: string;
    message: string;
  };
}

export const validate = (schema: joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.method === "GET" ? req.query : req.body);
    if (error) {
      return res.status(400).json({
        error        : "JoiValidationError",
        "status_code": 400,
        code         : "JOI_ERROR",
        message      : error.details.reduce((acc, cur) => {
          acc[cur.context?.key + ""] = {
            type   : cur.type,
            message: cur.message
          };
          return acc;
        },{} as ErrorMessage)
      });
    }
    next();
  };
};
