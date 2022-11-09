import Currencies from "../currencies";

function testSuite(): void {
  describe("Currencies Model", () => {
    const currenciesModel = new Currencies();

    it("has an index() method that returns all currencies", async () => {
      expect(await currenciesModel.index()).toEqual([
        { currency_code: "USD", magnifier: 100 },
      ]);
    });

    it("has a show() method that returns a currency by code", async () => {
      expect(await currenciesModel.show("USD")).toEqual({
        currency_code: "USD",
        magnifier: 100,
      });
    });
  });
}

export default testSuite;
