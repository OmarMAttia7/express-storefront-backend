import getProductsSuite from "./getProductsSpec";
import getProductByIdSuite from "./getProductByIdSpec";
import createProductSpec from "./createProductSpec";
import {
  setUpProudctsRoute,
  tearDownProductsRoute,
} from "../test_utils/productsUtil";

function testSuite(): void {
  describe("Products Routes :", () => {
    beforeEach(async () => {
      await setUpProudctsRoute();
    });

    getProductsSuite();
    getProductByIdSuite();
    createProductSpec();

    afterEach(async () => {
      await tearDownProductsRoute();
    });
  });
}

export default testSuite;
