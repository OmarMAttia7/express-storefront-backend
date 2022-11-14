import supertest from "supertest";
import app from "../../../app";
import { testUsers } from "../../../models/tests/test_utils/testUsersUtil";
import env from "../../../utils/env";
async function getJwtToken(id: number = 1): Promise<string> {
  try {
    const jwtSecret = env("JWT_SECRET");
    if (jwtSecret === undefined) throw Error("JWT_SECRET not found");

    const response = await supertest(app)
      .post("/users/login")
      .send({
        email: testUsers[id - 1][3],
        password: testUsers[id - 1][2],
      });

    const token = response.body.token as string;

    return token;
  } catch (e) {
    throw Error("Test login failed.");
  }
}

export default getJwtToken;
