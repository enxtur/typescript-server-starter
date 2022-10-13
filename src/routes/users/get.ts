import { Response, Router } from "express";
import { NotfoundError } from "../../libs/error-handler";
import { authorization } from "../../middlewares/authorization";
import { catcher } from "../../middlewares/catcher";
import { Request } from "../../middlewares/user";
import { User } from "../../models/User";


export const get = Router();

get.get("/:id", authorization, catcher(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select({ password: 0 });
  if (!user) {
    throw new NotfoundError("User not found");
  }
  res.json(user);
}));