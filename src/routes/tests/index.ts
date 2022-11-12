import productsSuite from "./products";
function testSuite(): void {
  describe("Routes :", () => {
    productsSuite();
  });
}

export default testSuite;
