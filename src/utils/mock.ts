import { Application } from "express";
import { App } from "../app";
import mongoose from "mongoose";
import { User, UserDocument } from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";

export interface Mock {
  app: Application;
  users: UserDocument[];
  accessTokens: string[];
  clean: () => Promise<void>;
}

interface InitOptions {
  users?: number;
}

export async function init (opts: InitOptions): Promise<Mock> {
  await mongoose.connect(process.env.TEST_MONGO_URI!);
  const app = await App();
  const users: UserDocument[] = [];
  if (opts.users) {
    await Promise.all(Array.from(Array(opts.users).keys()).map(async (i) => {
      users.push(await User.build({ email: `mockuser${i}@email.mn`, name: "mock user", password: "password" }).save());
    }));
  }
  const accessTokens = users.map(user=> jwt.sign({ _id: user.id }, config.jwt.apiSecret));

  return {
    app,
    users,
    accessTokens,
    clean: async () => {
      await mongoose.disconnect();
    } 
  };
}