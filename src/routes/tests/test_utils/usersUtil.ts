import dbPool from "../../../db";
import {
  addTestUsers,
  testUsers,
} from "../../../models/tests/test_utils/testUsersUtil";

async function setUpUsersRoute(): Promise<void> {
  await addTestUsers(testUsers);
}

async function tearDownUsersRoute(): Promise<void> {
  await dbPool.query("DELETE FROM users *;");
  await dbPool.query("ALTER SEQUENCE users_id_seq RESTART WITH 1;");
}

export { setUpUsersRoute, tearDownUsersRoute };
