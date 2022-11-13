import supertest from "supertest";
import app from "../../../app";
import getJwtToken from "../test_utils/getJwtToken";

function testSuite(): void {
  describe("POST /users", () => {
    it("creates a user and responds with token", async () => {
      await supertest(app)
        .post("/users")
        .set("Authorization", `Bearer ${getJwtToken()}`)
        .send({
          first_name: "john",
          last_name: "doe",
          password: "123456",
          email: "johndoe@example.com"
        })
        .expect((res) => {
          expect(res.body.token !== undefined);
        })
        .expect(200);
    });
  });
}

export default testSuite;
