/* eslint-disable camelcase */
import request from "supertest";
import { init, Mock } from "../../src/utils/mock";

let mock: Mock;

beforeAll(async () => {
  mock = await init({ users: 1 });
});

describe("GET /app/auth/me", () => {
  it("should return 200", async () => {
    const response = await request(mock.app)
      .get("/app/auth/me")
      .set("Authorization", `Bearer ${mock.accessTokens[0]}`)
      .expect(200);
    expect(response.body).toEqual(
      expect.objectContaining({ _id: mock.users[0]._id.toString() })
    );
  });
});

afterAll(async () => {
  await mock.clean();
});
