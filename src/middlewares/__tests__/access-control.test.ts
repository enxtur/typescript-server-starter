import { NextFunction, Request, Response } from "express";
import { accessControl } from "../access-control";

describe("middlewares/accessControl", () => {
  it("should return a 403 status code for a ForbiddenError", () => {
    const req = {
      headers: {
        origin: "http://localhost:3000",
      },
    } as unknown as Request;
    const res = {
      header: jest.fn(() => res),
    } as unknown as Response;
    const next = jest.fn() as NextFunction;
    accessControl(req, res, next);
    expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Origin", "http://localhost:3000");
    expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Headers", "Content-Type, Authorization");
    expect(res.header).toHaveBeenCalledWith("Access-Control-Allow-Credentials", "true");
  });
});