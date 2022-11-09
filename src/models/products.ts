import dbPool from "../db";

interface Product {
  id: number;
  product_name: string;
  magnified_price: number;
  currency_code: string;
  category_id: number;
}

class Products {
  async index(): Promise<Product[]> {
    try {
      const sql = "SELECT * FROM products;";

      const res = await dbPool.query(sql);

      return res.rows;
    } catch (e) {
      throw Error(e as string);
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id = $1;";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }

  async create(productInfo: {
    product_name: string;
    category: string;
    price: number;
    currency: string;
  }): Promise<Product> {
    const dbClient = await dbPool.connect();

    try {
      const categoryId = (
        await dbClient.query(
          "SELECT id FROM categories WHERE category_name = $1",
          [productInfo.category]
        )
      ).rows[0].id;

      const currency = (
        await dbClient.query(
          "SELECT * FROM currencies WHERE currency_code = $1",
          [productInfo.currency]
        )
      ).rows[0];

      const magnifiedPrice = productInfo.price * currency.magnifier;

      const sql =
        "INSERT INTO products (product_name, category_id, magnified_price, currency_code) VALUES ($1, $2, $3, $4) RETURNING *;";
      const values = [
        productInfo.product_name,
        categoryId,
        magnifiedPrice,
        currency.currency_code,
      ];

      const res = await dbClient.query(sql, values);

      dbClient.release();

      return res.rows[0];
    } catch (e) {
      dbClient.release();
      throw Error(e as string);
    }
  }

  async update(
    id: number,
    newInfo: { product_name: string; price: number }
  ): Promise<Product> {
    const dbClient = await dbPool.connect();
    try {
      const currency = (
        await dbClient.query(
          "SELECT currency_code FROM products WHERE id = $1",
          [id]
        )
      ).rows[0].currency_code;

      const currencyInfo = (
        await dbClient.query(
          "SELECT * FROM currencies WHERE currency_code = $1",
          [currency]
        )
      ).rows[0];

      const magnifiedPrice = newInfo.price * currencyInfo.magnifier;

      const sql =
        "UPDATE products SET (product_name, magnified_price) = ($1, $2) WHERE id = $3 RETURNING *;";
      const values = [newInfo.product_name, magnifiedPrice, id];

      const res = await dbClient.query(sql, values);

      dbClient.release();

      return res.rows[0];
    } catch (e) {
      dbClient.release();
      throw Error(e as string);
    }
  }

  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products * WHERE id = $1 RETURNING *;";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }
}

export default Products;
export { Product, Products };
