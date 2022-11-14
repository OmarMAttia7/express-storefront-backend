import dbPool from "../../db";
import Products from "../products";
import {
  addTestCategories,
  testCategories,
} from "./test_utils/testCategoriesUtil";
import { addTestProducts, testProducts } from "./test_utils/testProductsUtil";

function testSuite(): void {
  describe("Products Model :", () => {
    const productsModel = new Products();

    beforeAll(async () => {
      await addTestCategories(testCategories);
      await addTestProducts(testProducts);
    });

    it("has an index() method that returns all products", async () => {
      const productsIndex = await productsModel.index();
      expect(productsIndex[0]).toEqual({
        id: 1,
        product_name: testProducts[0][0],
        category_id: 1,
        magnified_price: testProducts[0][2] * 100,
        currency_code: "USD",
      });
    });

    it("has a show() method that returns a product by id", async () => {
      expect(await productsModel.show(2)).toEqual({
        id: 2,
        product_name: testProducts[1][0],
        category_id: 2,
        magnified_price: testProducts[1][2] * 100,
        currency_code: "USD",
      });
    });

    it("has a create() method that adds a new product", async () => {
      expect(
        await productsModel.create({
          product_name: "0.5mm sharp pencil",
          category: testCategories[0],
          price: 5.45,
          currency: "USD",
        })
      ).toEqual({
        id: 4,
        product_name: "0.5mm sharp pencil",
        magnified_price: 545,
        category_id: 1,
        currency_code: "USD",
      });
    });

    it("has an update() method that updates a method by id", async () => {
      const newProductName = "0.5mm Ink pens x12";
      const newPrice = 18.23;
      expect(
        await productsModel.update(1, {
          product_name: newProductName,
          price: newPrice,
        })
      ).toEqual({
        id: 1,
        product_name: newProductName,
        magnified_price: newPrice * 100,
        category_id: 1,
        currency_code: "USD",
      });
    });

    it("has a delete() method that deletes a product by id", async () => {
      expect(await productsModel.delete(3)).toEqual({
        id: 3,
        product_name: testProducts[2][0],
        magnified_price: testProducts[2][2] * 100,
        category_id: 3,
        currency_code: "USD",
      });
    });

    it("has showByCategoryId() method that returns all products in a specific category", async () => {
      const product = await productsModel.showByCategoryId(1);
      expect(product[0].category_id).toEqual(1);
    });

    afterAll(async () => {
      await dbPool.query("DELETE FROM products *;");
      await dbPool.query("ALTER SEQUENCE products_id_seq RESTART WITH 1");
    });
  });
}

export default testSuite;
