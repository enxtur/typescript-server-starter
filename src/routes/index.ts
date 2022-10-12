import { Router } from "express";
import { authRouter } from "./auth";
import { usersRouter } from "./users";

export const router = Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);