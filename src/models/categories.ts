import dbPool from "../db";

interface Category {
  id: number;
  category_name: string;
}

class Categories {
  async index(): Promise<Category[]> {
    try {
      const sql = "SELECT * FROM categories;";

      const res = await dbPool.query(sql);

      return res.rows;
    } catch (e) {
      throw Error(e as string);
    }
  }

  async show(idOrName: number | string): Promise<Category> {
    try {
      let sql: string;

      if (typeof idOrName === "number") {
        sql = "SELECT * FROM categories WHERE id = $1;";
      } else {
        sql = "SELECT * FROM categories WHERE category_name = $1";
      }

      const values = [idOrName];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }

  async create(categoryName: string): Promise<Category> {
    try {
      const sql =
        "INSERT INTO categories (category_name) VALUES ($1) RETURNING *;";
      const values = [categoryName];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }

  async update(
    id: number,
    newValues: { category_name: string }
  ): Promise<Category> {
    try {
      const sql =
        "UPDATE categories SET category_name = $1 WHERE id = $2 RETURNING *;";
      const values = [newValues.category_name, id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }

  async delete(id: number): Promise<Category> {
    try {
      const sql = "DELETE FROM categories * WHERE id = $1 RETURNING *;";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }
}

export default Categories;
export { Categories, Category };
