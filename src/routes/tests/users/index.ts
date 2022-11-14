import getUsersSuite from "./getUsersSpec";
import getUserByIdSuite from "./getUserById";
import createUserSuite from "./createUserSpec";
import loginSuite from "./loginSpec";
import { setUpUsersRoute, tearDownUsersRoute } from "../test_utils/usersUtil";
function testSuite(): void {
  describe("Users Routes :", () => {
    beforeAll(async () => {
      await setUpUsersRoute();
    });
    getUsersSuite();
    getUserByIdSuite();
    createUserSuite();
    loginSuite();
    afterAll(async () => {
      await tearDownUsersRoute();
    });
  });
}

export default testSuite;
