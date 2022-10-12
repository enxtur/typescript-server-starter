import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import morgan from "morgan";
import config from "./config";
import { errorHandler } from "./libs/error-handler";
import { accessControl } from "./middlewares/access-control";
import { userId } from "./middlewares/user-id";
import { router } from "./routes";

export const App = async () => {
  const app = express();
  app.use(accessControl);
  app.use(cookieParser(config.server.name + ".ckp"));
  app.use(morgan("dev"));
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    name  : config.server.name + ".sid",
    secret: config.server.name + ".scr",
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    resave           : true,
    saveUninitialized: true
  }));
  app.use(userId);
  app.use("/app", router);
  app.use(errorHandler);
  return app;
};