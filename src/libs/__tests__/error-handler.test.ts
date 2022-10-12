import { Request, Response } from "express";
import {
  NotfoundError,
  UnauthorizedError,
  ValidationError,
  errorHandler,
} from "../error-handler";

describe("libs/errorHandler", () => {
  it("should return a 400 status code for a ValidationError", () => {
    const err = new ValidationError("Validation error");
    const req = {} as Request;
    const res = {
      status: jest.fn(() => res),
      json  : jest.fn(() => res),
    } as unknown as Response;
    const next = jest.fn();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation error" });
  });
  it("should return a 404 status code for a NotfoundError", () => {
    const err = new NotfoundError("Not found");
    const req = {} as Request;
    const res = {
      status: jest.fn(() => res),
      json  : jest.fn(() => res),
    } as unknown as Response;
    const next = jest.fn();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Not found" });
  });
  it("should return a 401 status code for a UnauthorizedError", () => {
    const err = new UnauthorizedError("Unauthorized");
    const req = {} as Request;
    const res = {
      status: jest.fn(() => res),
      json  : jest.fn(() => res),
    } as unknown as Response;
    const next = jest.fn();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized" });
  });
  it("should return a 500 status code for any other error", () => {
    const err = new Error("Internal server error");
    const req = {} as Request;
    const res = {
      status: jest.fn(() => res),
      json  : jest.fn(() => res),
    } as unknown as Response;
    const next = jest.fn();
    errorHandler(err, req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal server error" });
  });
});
