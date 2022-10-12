import { Router } from "express";
import { create } from "./create";
import { updatePassword } from "./updatePassword";
import { me } from "./me";
import { login } from "./login";

export const authRouter = Router();

authRouter.use(create);
authRouter.use(login);
authRouter.use(updatePassword);
authRouter.use(me);