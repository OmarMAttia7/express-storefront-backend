import getProductsSuite from "./getProductsSpec";
import getProductByIdSuite from "./getProductByIdSpec";
function testSuite(): void {
  describe("Products Routes :", () => {
    
    getProductsSuite();
    getProductByIdSuite();

  });
}

export default testSuite;
