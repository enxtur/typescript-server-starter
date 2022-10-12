/* eslint-disable camelcase */
import request from "supertest";
import { init, Mock } from "../../src/utils/mock";

let mock: Mock;

beforeAll(async () => {
  mock = await init({users: 1});
});

describe("PUT /app/auth/password", () => {
  it("should return 200", async () => {
    await request(mock.app)
      .put("/app/auth/password")
      .set("Authorization", `Bearer ${mock.accessTokens[0]}`)
      .send({ password: "asd" })
      .expect(200)
      .expect({});
  });
});

afterAll(async () => {
  await mock.clean();
});