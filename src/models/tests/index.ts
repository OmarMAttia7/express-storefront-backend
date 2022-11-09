import usersSuite from "./usersSpec";
import productsSuite from "./productsSpec";
import categoriesSuite from "./categoriesSpec";
import currenciesSuite from "./currenciesSpec";

function testSuite(): void {
  describe("Models", () => {
    usersSuite();
    categoriesSuite();
    currenciesSuite();
    productsSuite();
  });
}

export default testSuite;
