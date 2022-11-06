import dbClient from "../db";

describe("Database Client", () => {
  beforeAll(async () => {
    await dbClient.connect();
  });

  it("successfully connects to database", async () => {
    const testString = "connected";
    const res = await dbClient.query("SELECT $1::text as message", [
      testString,
    ]);
    expect(res.rows[0].message).toEqual(testString);
  });
});
