/* eslint-disable camelcase */
import mongoose from "mongoose";
import request from "supertest";
import { init, Mock } from "../../src/utils/mock";

let mock: Mock;

beforeAll(async () => {
  mock = await init({ users: 1 });
});

describe("GET /app/users/:id", () => {
  it("should return 200", async () => {
    await request(mock.app)
      .get(`/app/users/${new mongoose.Types.ObjectId()}`)
      .set("Authorization", `Bearer ${mock.accessTokens[0]}`)
      .expect(404);
  });
  it("should return 200", async () => {
    const createResponse = await request(mock.app)
      .post("/app/auth")
      .send({email: "usercreate2@email.mn", password: "123456", name: "usercreate2"});

    await request(mock.app)
      .get(`/app/users/${createResponse.body._id}`)
      .set("Authorization", `Bearer ${mock.accessTokens[0]}`)
      .expect(200);
  });
});

afterAll(async () => {
  await mock.clean();
});