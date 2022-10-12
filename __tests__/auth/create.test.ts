/* eslint-disable camelcase */
import request from "supertest";
import { init, Mock } from "../../src/utils/mock";

let mock: Mock;

beforeAll(async () => {
  mock = await init({});
});

describe("POST /app/auth", () => {
  it("should return 400", () => request(mock.app) .post("/app/auth").expect(400));
  it("should return 200", () => request(mock.app).post("/app/auth").send({ email: "asd", password: "asd", name: "asd" }).expect(200));
  it("should return 400", async () => {
    await request(mock.app).post("/app/auth").send({ email: "asd1", password: "asd", name: "asd" }).expect(200);
    await request(mock.app).post("/app/auth")
      .send({ email: "asd1", password: "asd", name: "asd" })
      .expect(400)
      .expect({ messages: ["Email in use"] });
  });
});

afterAll(async () => {
  await mock.clean();
});