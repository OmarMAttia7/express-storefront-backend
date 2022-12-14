import supertest from "supertest";
import app from "../../../app";
import Orders from "../../../models/orders";
import getJwtToken from "../test_utils/getJwtToken";

function testSuite(): void {
  describe("POST /products/:id", () => {
    it("requires token", async () => {
      await supertest(app)
        .post("/products/1")
        .set("Authorization", "Bearer ")
        .expect(401);
    });

    it("responds with status 404 if product doesn't exist", async () => {
      await supertest(app)
        .post("/products/10")
        .send({
          quantity: 5,
        })
        .set("Authorization", `Bearer ${await getJwtToken()}`)
        .expect("Content-Type", /json/)
        .expect(404);
    });

    it("responds with status 200 and adds product to order", async () => {
      await new Orders().create({ user_id: 1, status_name: "active" });
      await supertest(app)
        .post("/products/1")
        .send({
          quantity: 5,
        })
        .set("Authorization", `Bearer ${await getJwtToken()}`)
        .expect(200);
    });
  });
}

export default testSuite;
