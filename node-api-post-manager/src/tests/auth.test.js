import request from "supertest";
import app from "../app.js";

let accessToken;

describe("Auth Flow", () => {

  it("should register user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "John",
        email: "john@test.com",
        password: "password123"
      });

    expect(res.statusCode).toBe(201);
  });

  it("should login user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "john@test.com",
        password: "password123"
      });

    accessToken = res.body.accessToken;

    expect(res.statusCode).toBe(200);
    expect(accessToken).toBeDefined();
  });

  it("should fetch profile", async () => {
    const res = await request(app)
      .get("/me")
      .set("Authorization", `Bearer ${accessToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toBe("john@test.com");
  });

});
