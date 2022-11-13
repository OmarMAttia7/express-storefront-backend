import productsSuite from "./products";
import usersSuite from "./users";
function testSuite(): void {
  describe("Routes :", () => {
    productsSuite();
    usersSuite();
  });
}

export default testSuite;
