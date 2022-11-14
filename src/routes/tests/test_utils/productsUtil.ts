import dbPool from "../../../db";
import {
  addTestProducts,
  testProducts,
} from "../../../models/tests/test_utils/testProductsUtil";
import { setUpUsersRoute, tearDownUsersRoute } from "./usersUtil";

async function setUpProudctsRoute(): Promise<void> {
  await addTestProducts(testProducts);
  await setUpUsersRoute();
}

async function tearDownProductsRoute(): Promise<void> {
  await dbPool.query("DELETE FROM products *;");
  await dbPool.query("ALTER SEQUENCE products_id_seq RESTART WITH 1;");
  await tearDownUsersRoute();
}

export { setUpProudctsRoute, tearDownProductsRoute };
