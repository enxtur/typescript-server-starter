import { Response, Router } from "express";
import joi from "joi";
import { UnauthorizedError } from "../../libs/error-handler";
import { authorization } from "../../middlewares/authorization";
import { catcher } from "../../middlewares/catcher";
import { Request, user } from "../../middlewares/user";
import { validate } from "../../middlewares/validator";

const schema = joi.object({
  password: joi.string().required(),
});

export const updatePassword = Router();


updatePassword.put("/password", authorization, user, validate(schema), catcher(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new UnauthorizedError("Unauthorized");
  } 
  await req.user.updatePassword(req.body.password);
  res.json({});
}));