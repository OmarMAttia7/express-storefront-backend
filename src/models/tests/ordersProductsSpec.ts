import dbPool from "../../db";
import OrdersProducts from "../ordersProducts";
import {
  addToTestOrders,
  testOrdersProducts,
} from "./test_utils/testOrdersProductsUtil";

function testSuite(): void {
  describe("OrdersProducts Model :", () => {
    const ordersProductsModel = new OrdersProducts();

    beforeAll(async () => {
      await addToTestOrders(testOrdersProducts);
    });

    it("has an index() method that returns all products-in-orders", async () => {
      expect((await ordersProductsModel.index())[1]).toEqual({
        id: 2,
        order_id: testOrdersProducts[1][0],
        product_id: testOrdersProducts[1][1],
        quantity: testOrdersProducts[1][2],
      });
    });

    it("has a show() method that returns product-in-order by id", async () => {
      expect(await ordersProductsModel.show(3)).toEqual({
        id: 3,
        order_id: testOrdersProducts[2][0],
        product_id: testOrdersProducts[2][1],
        quantity: testOrdersProducts[2][2],
      });
    });

    it("has a create() method that adds a product-in-order", async () => {
      expect(
        await ordersProductsModel.create({
          order_id: testOrdersProducts[0][0],
          product_id: testOrdersProducts[1][1],
          quantity: 5,
        })
      ).toEqual({
        id: 4,
        order_id: testOrdersProducts[0][0],
        product_id: testOrdersProducts[1][1],
        quantity: 5,
      });
    });

    it("has an update() method that updates a product-in-order by id", async () => {
      expect(
        await ordersProductsModel.update(4, {
          quantity: 8,
        })
      ).toEqual({
        id: 4,
        order_id: testOrdersProducts[0][0],
        product_id: testOrdersProducts[1][1],
        quantity: 8,
      });
    });

    it("has a delete() method that deletes a product-in-order by id", async () => {
      expect(await ordersProductsModel.delete(4)).toEqual({
        id: 4,
        order_id: testOrdersProducts[0][0],
        product_id: testOrdersProducts[1][1],
        quantity: 8,
      });
    });

    it("has a showByOrderId() method that returns all products in an order", async () => {
      const productsInOrder = await ordersProductsModel.showByOrderId(
        testOrdersProducts[0][0]
      );
      expect(productsInOrder[0].order_id).toEqual(testOrdersProducts[0][0]);
    });

    afterAll(async () => {
      await dbPool.query("DELETE FROM orders_products *;");
      await dbPool.query(
        "ALTER SEQUENCE orders_products_id_seq RESTART WITH 1;"
      );
    });
  });
}

export default testSuite;
