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
      .send({email: "usercreate3@mail.com", password: "pass", name: "test user"})
      .expect(201);
    const meResponse = await request(mock.app)
      .get("/app/auth/me")
      .set("Authorization", `Bearer ${createResponse.body.accessToken}`)
      .expect(200);

    await request(mock.app)
      .get(`/app/users/${meResponse.body._id}`)
      .set("Authorization", `Bearer ${mock.accessTokens[0]}`)
      .expect(200);
  });
});

afterAll(async () => {
  await mock.clean();
});