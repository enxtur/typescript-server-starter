import { Response, Router } from "express";
import { authorization } from "../../middlewares/authorization";
import { catcher } from "../../middlewares/catcher";
import { Request } from "../../middlewares/user";
import { User } from "../../models/User";


export const me = Router();

me.get("/me", authorization, catcher(async (req: Request, res: Response) => {
  const user = await User.findById(req.userId).select({password: 0});
  res.json(user);
}));