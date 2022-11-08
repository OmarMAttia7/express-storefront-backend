import dbPool from "../db";

function testSuite(): void {
  describe("Database Client", () => {
    it("successfully connects to database", async () => {
      const dbClient = await dbPool.connect();
      const testString = "connected";
      const res = await dbClient.query("SELECT $1::text as message", [
        testString,
      ]);
      expect(res.rows[0].message).toEqual(testString);
      dbClient.release();
    });
  });  
}

export default testSuite;