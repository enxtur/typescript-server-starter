import { MongoMemoryServer } from "mongodb-memory-server";
export default async () => {
  // console.log("global setup");
  global.mongod = await MongoMemoryServer.create();
  process.env.TEST_MONGO_URI = global.mongod.getUri();
};
