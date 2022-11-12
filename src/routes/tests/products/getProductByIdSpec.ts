import supertest from "supertest";
import app from "../../../app";

function testSuite(): void {

  describe("GET /products/:id", () => {
    it("responds with status 200", async () => {
      await supertest(app)
      .get("/products/1")
      .expect(200);
    });

    it("responds with a product", async () => {
      await supertest(app)
      .get("/products/1")
      .expect("Content-Type", /json/)
      .expect((res) => {
        res.body.id = 1;
      });
    });

    it("responds with 404 and an error message if product is not found", async () => {
      await supertest(app)
      .get("/products/4")
      .expect("Content-Type", /json/)
      .expect(404);
    });

    it("responds with status 400 and an error message if id is invalid", async () => {
      await supertest(app)
      .get("/products/erdwa")
      .expect("Content-Type", /json/)
      .expect(400)
    });
  });

}

export default testSuite;
