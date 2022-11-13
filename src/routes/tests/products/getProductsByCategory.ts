import supertest from "supertest";
import app from "../../../app";

function testSuite(): void {
  describe("GET /products/category/:category", () => {
    it("responds with status 200 and an array of products", async () => {
      await supertest(app)
        .get("/products/category/1")
        .expect("Content-Type", /json/)
        .expect((res) => {
          for (const product of res.body) {
            expect(product.category_id === 1);
          }
        });
    });

    it("responds with 404 and an error message if category is not found", async () => {
      await supertest(app)
        .get("/products/category/13")
        .expect("Content-Type", /json/)
        .expect(404);
    });

    it("responds with 400 and an error message if category param is not valid", async () => {
      await supertest(app)
        .get("/products/category/1eawdfaw3")
        .expect("Content-Type", /json/)
        .expect(400);
    });
  });
}

export default testSuite;
