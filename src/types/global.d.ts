/* eslint-disable no-var */
import { MongoMemoryServer } from "mongodb-memory-server";

declare global {
  var mongod: MongoMemoryServer;
}