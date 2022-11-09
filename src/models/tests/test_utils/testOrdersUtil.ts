import dbPool from "../../../db";
import { testUsers, addTestUsers } from "./testUsersUtil";

const testOrders: Array<[number, string]> = [
  [1, "active"],
  [2, "completed"],
  [3, "active"],
];

async function addTestOrder(order: [number, string]): Promise<void> {
  const sql = "INSERT INTO orders (user_id, status_name) VALUES ($1, $2);";
  const values = [order[0], order[1]];

  await dbPool.query(sql, values);
}

async function addTestOrders(testOrders: Array<[number, string]>): Promise<void> {
  await addTestUsers(testUsers);
  
  for(const order of testOrders) {
    await addTestOrder(order);
  }
}

export { testOrders, addTestOrder, addTestOrders };
