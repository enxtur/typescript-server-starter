import { NextFunction, Response } from "express";
import mongoose from "mongoose";
import { User } from "../../models/User";
import { Request, user } from "../user";

const userId = new mongoose.Types.ObjectId();

beforeAll(async () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await mongoose.connect(process.env.TEST_MONGO_URI!);
  await User.create({_id: userId, email: "middlewaretest@email.mn", password: "password", name: "name"});
});

describe("middlewares/user", () => {
  it("should set user from userId", async () => {
    const req = {
      userId,
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;
    await user(req, res, next);
    expect(req.user).toBeDefined();
    expect(req.user?._id).toEqual(userId);
    expect(next).toHaveBeenCalledWith();
  });
});

afterAll(async () => {
  await mongoose.disconnect();
});