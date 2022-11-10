import dbPool from "../db";

interface ProductInOrder {
  id: number,
  order_id: number,
  product_id: number,
  quantity: number
}

class OrdersProducts {
  async index(): Promise<ProductInOrder[]> {
    try {
      const sql = "SELECT * FROM orders_products;";

      const res = await dbPool.query(sql);

      return res.rows;
    }catch(e){
      throw Error(e as string);
    }
  }

  async show(id: number): Promise<ProductInOrder> {
    try {
      const sql = "SELECT * FROM orders_products WHERE id = $1;";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    }catch(e){
      throw Error(e as string);
    }
  }

  async create(productInOrder: { order_id: number; product_id: number; quantity: number; }): Promise<ProductInOrder> {
    try {
      const sql = "INSERT INTO orders_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *;";
      const values = [productInOrder.order_id, productInOrder.product_id, productInOrder.quantity];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    }catch(e){
      throw Error(e as string);
    }
  }

  async update(id: number, newInfo: { quantity: number; }): Promise<ProductInOrder> {
    try {
      const sql = "UPDATE orders_products SET quantity = $1 WHERE id = $2 RETURNING *;";
      const values = [newInfo.quantity, id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    }catch(e){
      throw Error(e as string);
    }
  }

  async delete(id: number): Promise<ProductInOrder> {
    try {
      const sql = "DELETE FROM orders_products * WHERE id = $1 RETURNING *;";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    }catch(e){
      throw Error(e as string);
    }
  }

}

export default OrdersProducts;