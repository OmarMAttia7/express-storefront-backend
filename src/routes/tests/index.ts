import productsSuite from "./products";
import {
  setUpProudctsRoute,
  tearDownProductsRoute,
} from "./test_utils/productsUtil";
function testSuite(): void {
  describe("Routes :", () => {
    beforeAll(async () => {
      await setUpProudctsRoute();
    });

    productsSuite();

    afterAll(async () => {
      await tearDownProductsRoute();
    });
  });
}

export default testSuite;
