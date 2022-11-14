import { setUpUsersRoute, tearDownUsersRoute } from "../test_utils/usersUtil";
import getCurrentOrderSuite from "./getCurrentOrderSpec";
import addOrderSuite from "./addOrder"
function testSuite(): void {


  describe("Users Routes :", () => {
    beforeAll(async () => {
      await setUpUsersRoute();
    });

    addOrderSuite();
    getCurrentOrderSuite();

    afterAll(async () => {
      await tearDownUsersRoute();
    });
  });
}

export default testSuite;
