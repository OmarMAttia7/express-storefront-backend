import dbClient from "../db";

describe("Database Client", () => {
  beforeAll(async () => {
    await dbClient.connect();
  });

  it("successfully connects to database", async () => {
    // The value of testMsg doesn't matter, it's purpose is to make sure the
    // test checks for the same string
    const testString = "connected";
    const res = await dbClient.query("SELECT $1::text as message", [
      testString,
    ]);
    expect(res.rows[0].message).toEqual(testString);
    
  });
});
