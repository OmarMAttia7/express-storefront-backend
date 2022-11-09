import dbPool from "../../../db";

const testCategories: string[] = ["Writing supplies", "Technology", "Sports"];

async function addTestCategory(category: string): Promise<void> {
  

  const sql = "INSERT INTO categories (category_name) VALUES ($1)";
  const values = [category];

  await dbPool.query(sql, values);

  
}

async function addTestCategories(testCategories: string[]): Promise<void> {
  for(const category of testCategories) {
    await addTestCategory(category);
  }
}

export { testCategories, addTestCategory, addTestCategories }