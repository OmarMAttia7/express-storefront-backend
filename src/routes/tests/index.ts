import productsSuite from "./products";
import usersSuite from "./users";
import ordersSuite from "./orders";
function testSuite(): void {
  describe("Routes :", () => {
    productsSuite();
    usersSuite();
    ordersSuite();
  });
}

export default testSuite;
