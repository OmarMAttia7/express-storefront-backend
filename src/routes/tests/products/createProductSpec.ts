import supertest from "supertest";
import app from "../../../app";

function testSuite(): void {
  describe("POST /products", () => {
    it("responds with status 200 and a product object", async () => {
      await supertest(app)
        .post("/products")
        .send({
          product_name: "HB Pencil",
          category: "Writing Supplies",
          price: 31.5,
          currency: "USD",
        })
        .expect("Content-Type", /json/)
        .expect((res) => {
          res.body.id = 1;
        });
    });

    it("responds with status 400 and an error message if product object is invalid", async () => {
      await supertest(app)
        .post("/products/")
        .send({
          product_name: "HB Pencil",
          category: "catthatdoesntexist"
        })
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });
}

export default testSuite;
