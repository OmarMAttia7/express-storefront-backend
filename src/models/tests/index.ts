import usersSuite from './usersSpec';
import productsSuite from './productsSpec';
import categoriesSuite from './categoriesSpec';

function testSuite(): void {
  describe("Models", () => {
    usersSuite();
    productsSuite();
    categoriesSuite();
  });
}

export default testSuite;