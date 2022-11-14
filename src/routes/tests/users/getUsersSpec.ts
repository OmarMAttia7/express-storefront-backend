import supertest from "supertest";
import app from "../../../app";
import getJwtToken from "../test_utils/getJwtToken";

function testSuite(): void {
  describe("GET /users", () => {
    it("requires authorization token", async () => {
      await supertest(app)
        .get("/users")
        .set("Authorization", "Bearer ")
        .expect(401);
    });

    it("responds with status 200 and an array of users", async () => {
      await supertest(app)
        .get("/users")
        .set("Authorization", `Bearer ${getJwtToken()}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
}

export default testSuite;
