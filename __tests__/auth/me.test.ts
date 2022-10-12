/* eslint-disable camelcase */
import request from "supertest";
import { init, Mock } from "../../src/utils/mock";

let mock: Mock;

beforeAll(async () => {
  mock = await init({ users: 1 });
});

describe("GET /app/auth/me", () => {
  it("should return 200", async () => {
    await request(mock.app)
      .get("/app/auth/me")
      .set("Authorization", `Bearer ${mock.accessTokens[0]}`)
      .expect(200);
  });
});

afterAll(async () => {
  await mock.clean();
});