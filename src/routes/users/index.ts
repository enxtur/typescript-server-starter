import { Router } from "express";
import { get } from "./get";

export const usersRouter = Router();

usersRouter.use(get);