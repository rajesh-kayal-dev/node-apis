import request from "supertest";
import app from "../app.js";

let token;
let postId;

beforeAll(async () => {
  const login = await request(app)
    .post("/auth/login")
    .send({
      email: "admin@test.com",
      password: "admin123"
    });

  token = login.body.accessToken;
});

describe("Post API", () => {

  it("create post", async () => {
    const res = await request(app)
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Node API",
        description: "Testing post",
        skills: ["Node", "Mongo"]
      });

    postId = res.body.Post._id;
    expect(res.statusCode).toBe(201);
  });

  it("delete post (admin only)", async () => {
    const res = await request(app)
      .delete(`/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

});
