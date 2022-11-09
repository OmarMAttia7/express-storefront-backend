import dbSuite from "./dbSpec";
import modelsSuite from "../models/tests";
import dbPool from "../db";
import seed from "./test_utils/seedUtil";

describe("Application Testing", () => {
  beforeAll(async () => {
    await seed();
  });

  dbSuite();
  modelsSuite();

  afterAll(async () => {
    await dbPool.end();
  });
});
