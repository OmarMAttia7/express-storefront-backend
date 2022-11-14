import supertest from "supertest";
import app from "../../../app";
import { testUsers } from "../../../models/tests/test_utils/testUsersUtil";

function testSuite(): void {
  describe("POST /users/login", () => {
    it("responds with status 400 if user is not found", async () => {
      await supertest(app).post("/users/login").send({
        email: "doesntexistemail12456@example.com",
        password: "nopwd1346782"
      }).expect(400);
    });

    it("responds with status 200 and a token", async () => {
      await supertest(app).post("/users/login").send({
        email: testUsers[0][3],
        password: testUsers[0][2]
      })
      .expect("Content-Type", /json/)
      .expect(200);
    });
  });
}

export default testSuite;
