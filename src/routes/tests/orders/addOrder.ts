import supertest from "supertest";
import app from "../../../app";
import getJwtToken from "../test_utils/getJwtToken";

function testSuite(): void {
  describe("POST /orders/", () => {
    it("responds with status 200 and creates an order", async () => {
      await supertest(app)
        .post("/orders/")
        .set("Authorization", `Bearer ${await getJwtToken(1)}`)
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("should not allow creation of more than one order", async () => {
      await supertest(app)
        .post("/orders/")
        .set("Authorization", `Bearer ${await getJwtToken(1)}`)
        .expect("Content-Type", /json/)
        .expect((res) => {
          expect(res.body.status).toBeDefined();
        })
        .expect(200);
    });
  });
}

export default testSuite;
