import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import config from "../../config";
import { Request } from "../user";
import { userId as middleware } from "../user-id";

const userId = new mongoose.Types.ObjectId();

describe("middlewares/user", () => {
  it("should set userId from bearer token", async () => {
    const req = {
      headers: {
        authorization: `Bearer ${jwt.sign({_id: userId}, config.jwt.apiSecret)}`,
      }
    } as unknown as Request;
    const res = {} as Response;
    await new Promise((resolve) => {
      middleware(req, res, ()=> {
        resolve(true);
      });
    });
    expect(req.userId).toEqual(userId.toString());
  });
});