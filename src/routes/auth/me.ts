import { Response, Router } from "express";
import { authorization } from "../../middlewares/authorization";
import { catcher } from "../../middlewares/catcher";
import { Request, user } from "../../middlewares/user";


export const me = Router();

me.get("/me", authorization, user, catcher(async (req: Request, res: Response) => {
  res.json(req.user);
}));