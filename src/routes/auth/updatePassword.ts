import { Response, Router } from "express";
import joi from "joi";
import { ValidationError } from "../../libs/error-handler";
import { authorization } from "../../middlewares/authorization";
import { catcher } from "../../middlewares/catcher";
import { Request, user } from "../../middlewares/user";
import { validate } from "../../middlewares/validator";

const schema = joi.object({
  password   : joi.string().required(),
  newPassword: joi.string().min(4).alphanum().required(),
});

export const updatePassword = Router();

updatePassword.put("/password", authorization, user, validate(schema), catcher(async (req: Request, res: Response) => {
  if (!req.user) {
    throw new Error("User not initialized");
  }

  const password: string = req.body.password;
  if (!req.user.validatePassword(password)) {
    throw new ValidationError("Invalid password");
  }
  
  const newPassword: string = req.body.newPassword;
  await req.user.updatePassword(newPassword);
  res.json({});
}));