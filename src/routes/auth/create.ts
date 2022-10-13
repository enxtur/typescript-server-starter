import { Request, Response, Router } from "express";
import joi from "joi";
import jwt from "jsonwebtoken";
import config from "../../config";
import { ValidationError } from "../../libs/error-handler";
import { catcher } from "../../middlewares/catcher";
import { validate } from "../../middlewares/validator";
import { User } from "../../models/User";

const schema = joi.object({
  email   : joi.string().email().required(),
  password: joi.string().min(4).alphanum().required(),
  name    : joi.string().required(),
});

export const create = Router();

create.post("/", validate(schema), catcher(async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  const name: string = req.body.name;

  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new ValidationError("Email in use");
  }
  
  const user = User.build({ email, password, name });
  await user.save();
  const accessToken = jwt.sign({ _id: user.id }, config.jwt.apiSecret);
  res.status(201).json({ accessToken });
}));