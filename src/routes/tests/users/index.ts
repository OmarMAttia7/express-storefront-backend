import getUsersSuite from "./getUsersSpec";
import getUserByIdSuite from "./getUserById";
import createUserSuite from "./createUserSpec";
import { setUpUsersRoute, tearDownUsersRoute } from "../test_utils/usersUtil";
function testSuite(): void {
  beforeEach(async () => {
    await setUpUsersRoute();
  });

  describe("Users Routes :", () => {
    getUsersSuite();
    getUserByIdSuite();
    createUserSuite();
  });

  afterEach(async () => {
    await tearDownUsersRoute();
  });
}

export default testSuite;
