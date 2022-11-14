import getProductsSuite from "./getProductsSpec";
import getProductByIdSuite from "./getProductByIdSpec";
import createProductSuite from "./createProductSpec";
import getProductsByCategorySuite from "./getProductsByCategory";
import addProductToOrderSuite from "./addProductToOrder";
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
    createProductSuite();
    getProductsByCategorySuite();
    addProductToOrderSuite();

    afterEach(async () => {
      await tearDownProductsRoute();
    });
  });
}

export default testSuite;
