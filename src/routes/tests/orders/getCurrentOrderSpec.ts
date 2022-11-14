import supertest from "supertest";
import app from "../../../app";
import getJwtToken from "../test_utils/getJwtToken";

function testSuite(): void {
  describe("GET /orders/:user_id/current", () => {
    it("responds with status 200 and the current order", async () => {
      await supertest(app)
        .get("/orders/1/current")
        .set("Authorization", `Bearer ${getJwtToken(1)}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
}

export default testSuite;
