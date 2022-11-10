import dbPool from "../../../db";
import { testProducts, addTestProducts } from "./testProductsUtil";

type ordersProducts = [number, number, number];

const testOrdersProducts: ordersProducts[] = [
  [1, 1, 5],
  [2, 2, 10],
  [3, 3, 7],
];

async function addToTestOrder(processInfo: ordersProducts): Promise<void> {
  const sql = "INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3)";

  const values = [processInfo[0], processInfo[1], processInfo[2]];

  await dbPool.query(sql, values);
}

async function addToTestOrders(testOrdersProducts: ordersProducts[]): Promise<void> {
  await addTestProducts(testProducts);

  for(const process of testOrdersProducts) {
    await addToTestOrder(process);
  }
}

export { testOrdersProducts, addToTestOrder, addToTestOrders };
