import usersSuite from "./usersSpec";
import productsSuite from "./productsSpec";
import categoriesSuite from "./categoriesSpec";
import currenciesSuite from "./currenciesSpec";
import ordersSuite from "./ordersSpec";

function testSuite(): void {
  describe("Models", () => {
    usersSuite();
    categoriesSuite();
    currenciesSuite();
    productsSuite();
    ordersSuite();
  });
}

export default testSuite;
