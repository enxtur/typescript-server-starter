import { NextFunction, Request, Response } from "express";
import { catcher } from "../catcher";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handler = async (req: Request, res: Response, next: NextFunction) => {
  throw new Error("error");
};

describe("middlewares/catcher", () => {
  it("should call NextFunction with error", async () => {
    const result = await new Promise((resolve) => {
      catcher(handler)({} as Request, {} as Response, ((err: Error)=> {
        resolve(err);
      }) as NextFunction);
    });
    expect(result).toEqual(new Error("error"));
  });
});
