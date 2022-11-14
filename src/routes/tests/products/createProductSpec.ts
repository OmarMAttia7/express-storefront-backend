import supertest from "supertest";
import app from "../../../app";
import { testCategories } from "../../../models/tests/test_utils/testCategoriesUtil";
import getJwtToken from "../test_utils/getJwtToken";
function testSuite(): void {
  describe("POST /products", () => {

    it("responds with status 200 and a product object", async () => {
      await supertest(app)
        .post("/products")
        .set("Authorization", `Bearer ${await getJwtToken()}`)
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
        .set("Authorization", `Bearer ${await getJwtToken()}`)
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
