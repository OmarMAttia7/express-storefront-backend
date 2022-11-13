import supertest from "supertest";
import app from "../../../app";
import getJwtToken from "../test_utils/getJwtToken";

function testSuite(): void {
  describe("GET /users/:id", () => {
    it("requires authorization token", async () => {
      await supertest(app)
        .get("/users/1")
        .set("Authorization", "Bearer ")
        .expect(401);
    });

    it("responds with status 200 and a user object", async () => {
      await supertest(app)
        .get("/users/1")
        .set("Authorization", `Bearer ${getJwtToken()}`)
        .expect(200);
    });
  });
}

export default testSuite;
