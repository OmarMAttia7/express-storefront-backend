import dbPool from "../../db";
import Orders from "../orders";
import { addTestOrders, testOrders } from "./test_utils/testOrdersUtil";

function testSuite(): void {
  describe("Orders Model :", () => {
    const ordersModel = new Orders();
    beforeAll(async () => {
      await addTestOrders(testOrders);
    });

    it("has an index() method that return all orders", async () => {
      const ordersIndex = await ordersModel.index();
      expect(ordersIndex[1]).toEqual({
        id: 2,
        user_id: 2,
        status_name: testOrders[1][1],
      });
    });

    it("has a show() method that returns an order by id", async () => {
      expect(await ordersModel.show(1)).toEqual({
        id: 1,
        user_id: 1,
        status_name: testOrders[0][1],
      });
    });

    it("has a create() method that adds an order", async () => {
      expect(
        await ordersModel.create({ user_id: 1, status_name: "active" })
      ).toEqual({
        id: 4,
        user_id: 1,
        status_name: "active",
      });
    });

    it("has an update() method that updates an order by id", async () => {
      expect(await ordersModel.update(4, { status_name: "completed" })).toEqual(
        {
          id: 4,
          user_id: 1,
          status_name: "completed",
        }
      );
    });

    it("has a delete() method that deletes an order by id", async () => {
      expect(await ordersModel.delete(4)).toEqual({
        id: 4,
        user_id: 1,
        status_name: "completed",
      });
    });

    it("has showByUserId() method that returns all orders by a user", async () => {
      expect((await ordersModel.showByUserId(1))[0]).toEqual({
        id: 1,
        user_id: 1,
        status_name: testOrders[0][1],
      });
    });

    afterAll(async () => {
      await dbPool.query("DELETE FROM users *;");
      await dbPool.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;");
      await dbPool.query("DELETE FROM orders *;");
      await dbPool.query("ALTER SEQUENCE orders_id_seq RESTART WITH 1;");
    });
  });
}

export default testSuite;
