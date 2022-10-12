import express, { Response, Router } from "express";
import { NotfoundError } from "../../libs/error-handler";
import { authorization } from "../../middlewares/authorization";
import { catcher } from "../../middlewares/catcher";
import { User, UserDocument } from "../../models/User";


export const get = Router();

interface Request extends express.Request {
  user?: UserDocument | null;
}

get.get("/:id", authorization, catcher(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw new NotfoundError("User not found");
  }
  res.json(user);
}));