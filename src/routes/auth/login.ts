import { Request, Response, Router } from "express";
import joi from "joi";
import jwt from "jsonwebtoken";
import config from "../../config";
import { ValidationError } from "../../libs/error-handler";
import { catcher } from "../../middlewares/catcher";
import { validate } from "../../middlewares/validator";
import { User } from "../../models/User";

const schema = joi.object({
  email   : joi.string().required(),
  password: joi.string().required(),
});

export const login = Router();

login.post("/login", validate(schema), catcher(async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  const user = await User.findByEmail(email);
  if (!user) {
    throw new ValidationError("Email or password is incorrect");
  }
  
  if (!user.validatePassword(password)) {
    throw new ValidationError("Email or password is incorrect");
  }
  
  const encoded = jwt.sign({ userId: user.id }, config.jwt.apiSecret);
  res.json({ accessToken: encoded });
}));