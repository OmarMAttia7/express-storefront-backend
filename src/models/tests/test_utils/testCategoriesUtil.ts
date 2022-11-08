import dbPool from "../../../db";

const testCategories: string[] = ["Writing supplies", "Technology", "Sports"];

async function addTestCategory(category: string): Promise<void> {
  const dbClient = await dbPool.connect();

  const sql = "INSERT INTO categories (category_name) VALUES ($1)";
  const values = [category];

  await dbClient.query(sql, values);

  dbClient.release();
}

async function addTestCategories(testCategories: string[]): Promise<void> {
  for(const category of testCategories) {
    await addTestCategory(category);
  }
}

export { testCategories, addTestCategory, addTestCategories }