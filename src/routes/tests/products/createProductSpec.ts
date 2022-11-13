import supertest from "supertest";
import app from "../../../app";
import jwt from "jsonwebtoken";
import env from "../../../utils/env";
import { testCategories } from "../../../models/tests/test_utils/testCategoriesUtil";
function testSuite(): void {
  describe("POST /products", () => {
    const jwtSecret = env("JWT_SECRET");
    if (jwtSecret === undefined) throw Error("Jwt secret not found");

    const jwtToken = jwt.sign({ user_id: 1 }, jwtSecret);

    it("responds with status 200 and a product object", async () => {
      await supertest(app)
        .post("/products")
        .set("Authorization", "Bearer " + jwtToken)
        .send({
          product_name: "HB Pencil",
          category: testCategories[2],
          price: 31.5,
          currency: "USD",
        })
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("responds with status 400 and an error message if product object is invalid", async () => {
      await supertest(app)
        .post("/products/")
        .set("Authorization", "Bearer " + jwtToken)
        .send({
          product_name: "HB Pencil",
          category: "catthatdoesntexist",
        })
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });
}

export default testSuite;
