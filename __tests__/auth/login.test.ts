/* eslint-disable camelcase */
import request from "supertest";
import { init, Mock } from "../../src/utils/mock";

let mock: Mock;

beforeAll(async () => {
  mock = await init({ users: 1});
});

describe("POST /app/auth/login", () => {
  it("should return 400", () => request(mock.app) 
    .post("/app/auth/login")
    .expect(400));
  it("should return 200", async () => {
    const loginResponse = await request(mock.app)
      .post("/app/auth/login")
      .send({ email: mock.users[0].email, password: mock.users[0].password })
      .expect(200);
    expect(loginResponse.body.accessToken).toBeDefined();
  });
});

afterAll(async () => {
  await mock.clean();
});