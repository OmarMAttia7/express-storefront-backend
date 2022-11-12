import supertest from "supertest";
import app from "../../../app";

function testSuite(): void {

  describe("GET /products", () => {
    it("responds with status 200", async () => {
      await supertest(app)
      .get("/products")
      .expect(200);
    });

    it("responds with json object", async () => {
      await supertest(app)
      .get("/products")
      .expect("Content-Type", /json/);
    });
  });

}

export default testSuite;
