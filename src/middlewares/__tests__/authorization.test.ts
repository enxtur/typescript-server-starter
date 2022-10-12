import { authorization } from "../authorization";
import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../../libs/error-handler";

describe("middlewares/authorization", () => {
  it("should return a 401 status code for a UnauthorizedError", () => {
    const req = {
      userId: null,
    } as unknown as Request;
    const res = {}  as Response;
    const next = jest.fn() as NextFunction;
    authorization(req, res, next);
    expect(next).toHaveBeenCalledWith(new UnauthorizedError("Unauthorized"));
  });
  it("should return a 401 status code for a UnauthorizedError", () => {
    const req = {
      userId: 1,
    } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;
    authorization(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
