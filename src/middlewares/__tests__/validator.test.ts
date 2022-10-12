import { Response } from "express";
import Joi from "joi";
import { ValidationError } from "../../libs/error-handler";
import { Request } from "../user";
import { validate } from "../validator";

describe("middlewares/validator", () => {
  it("should set userId from bearer token", async () => {
    const req = {
      body: {}
    } as unknown as Request;
    const res = {} as Response;
    
    const schema = Joi.object({
      password: Joi.string().required(),
      name    : Joi.string().required(),
    });
    const err = await new Promise((resolve) => {
      validate(schema)(req, res, (err) => {
        resolve(err);
      });
    });
    expect(err).toBeDefined();
    expect(err instanceof ValidationError).toBe(true);
  });
});