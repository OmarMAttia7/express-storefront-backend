import dbPool from "../db";

interface Category {
  id: number;
  category_name: string;
}

class Categories {

  async index(): Promise<Category[]> {
    try {
      const dbClient = await dbPool.connect();

      const sql = "SELECT * FROM categories;";

      const res = await dbClient.query(sql);
      dbClient.release();

      return res.rows;
    } catch (e) {
      throw Error(e as string);
    }
  }

  async show(id: number): Promise<Category> {
    try {
      const dbClient = await dbPool.connect();

      const sql = "SELECT * FROM categories WHERE id = $1;";
      const values = [id];

      const res = await dbClient.query(sql, values);
      dbClient.release();

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }

  async create(categoryName: string): Promise<Category> {
    try {
      const dbClient = await dbPool.connect();

      const sql = "INSERT INTO categories (category_name) VALUES ($1) RETURNING *;";
      const values = [categoryName];

      const res = await dbClient.query(sql, values);
      dbClient.release();

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }

  async update(id: number, newValues: {category_name: string}): Promise<Category> {
    try {
      const dbClient = await dbPool.connect();

      const sql = "UPDATE categories SET category_name = $1 WHERE id = $2 RETURNING *;";
      const values = [newValues.category_name, id];

      const res = await dbClient.query(sql, values);
      dbClient.release();

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }

  async delete(id: number): Promise<Category> {
    try {
      const dbClient = await dbPool.connect();

      const sql = "DELETE FROM categories * WHERE id = $1 RETURNING *;";
      const values = [id];

      const res = await dbClient.query(sql, values);
      dbClient.release();

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }
}

export default Categories;
export { Categories, Category };
