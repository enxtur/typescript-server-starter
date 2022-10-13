/* eslint-disable camelcase */
import request from "supertest";
import { init, Mock } from "../../src/utils/mock";

let mock: Mock;

beforeAll(async () => {
  mock = await init({});
});

describe("POST /app/auth", () => {
  it("should return 400", () =>
    request(mock.app).post("/app/auth").expect(400));
  it("should return 200", () =>
    request(mock.app)
      .post("/app/auth")
      .send({
        email   : "authcreate1@mail.com",
        password: "pass",
        name    : "test user",
      })
      .expect(201));
  it("should return 400", async () => {
    await request(mock.app)
      .post("/app/auth")
      .send({
        email   : "authcreate2@mail.com",
        password: "pass",
        name    : "test user 2",
      })
      .expect(201);
    await request(mock.app)
      .post("/app/auth")
      .send({
        email   : "authcreate2@mail.com",
        password: "pass",
        name    : "test user 2",
      })
      .expect(400)
      .expect({ messages: ["Email in use"] });
  });
});

afterAll(async () => {
  await mock.clean();
});
