import config from "./config";
import { Server } from "http";
import { App } from "./core";
import mongoose from "mongoose";

(async () => {
  await mongoose.connect(config.mongodb.url);
  const app = await App();
  const server = new Server(app);
  server.listen(config.server.port, async () => {
    console.log(`Server: ${config.server.port} is listening ...`);
  });
})();
