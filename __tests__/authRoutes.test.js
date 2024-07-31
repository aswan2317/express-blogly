const request = require('supertest');
const app = require('../app'); // Correctly import your Express app
const jwt = require('jsonwebtoken');

describe("POST /auth/register", function () {
  test("can register", async function () {
    let response = await request(app)
      .post("/register") // Ensure this matches your route definition
      .send({
        username: "test1",
        password: "secret",
        first_name: "Test1",
        last_name: "Testy1",
        phone: "+14150000000",
      });

    let token = response.body.token;
    expect(token).toBeDefined();

    let decoded = jwt.decode(token);
    expect(decoded).toEqual(
      expect.objectContaining({
        username: "test1",
        iat: expect.any(Number),
      })
    );
  }, 20000); // Increase timeout to 20 seconds
});

describe("POST /auth/login", function () {
  test("can login", async function () {
    let response = await request(app)
      .post("/login") // Ensure this matches your route definition
      .send({ username: "test1", password: "secret" });

    let token = response.body.token;
    expect(token).toBeDefined();

    let decoded = jwt.decode(token);
    expect(decoded).toEqual(
      expect.objectContaining({
        username: "test1",
        iat: expect.any(Number),
      })
    );
  }, 20000); // Increase timeout to 20 seconds

  test("won't login with wrong password", async function () {
    let response = await request(app)
      .post("/login")
      .send({ username: "test1", password: "WRONG" });
    expect(response.statusCode).toEqual(400);
  }, 20000); // Increase timeout to 20 seconds

  test("won't login with non-existent user", async function () {
    let response = await request(app)
      .post("/login")
      .send({ username: "not-user", password: "password" });
    expect(response.statusCode).toEqual(400);
  }, 20000); // Increase timeout to 20 seconds
});
