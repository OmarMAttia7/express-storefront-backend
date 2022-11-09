import dbPool from "../db";

function testSuite(): void {
  describe("Database Client", () => {
    it("successfully connects to database", async () => {
      
      const testString = "connected";
      const res = await dbPool.query("SELECT $1::text as message", [
        testString,
      ]);
      expect(res.rows[0].message).toEqual(testString);
      
    });
  });  
}

export default testSuite;