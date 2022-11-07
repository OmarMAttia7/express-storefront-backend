import { PoolClient } from "pg";
import dbPool from "../db";

describe("Database Client", () => {
  let dbClient: PoolClient;

  beforeAll(async () => {
    dbClient = await dbPool.connect();
  });

  it("successfully connects to database", async () => {
    const testString = "connected";
    const res = await dbClient.query("SELECT $1::text as message", [
      testString,
    ]);
    expect(res.rows[0].message).toEqual(testString);
  });

  afterAll(async () => {
    dbClient.release();
  });
});
