import dbPool from "../db";

interface Order {
  id: number;
  user_id: number;
  status_name: string;
}

class Orders {
  async index(): Promise<Order[]> {
    try {
      const sql = "SELECT * FROM orders;";

      const res = await dbPool.query(sql);

      return res.rows;
    }catch(e){
      throw Error(e as string);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = "SELECT * FROM orders WHERE id = $1;";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    }catch(e){
      throw Error(e as string);
    }
  }

  async create(newOrder: { user_id: number; status_name: string }): Promise<Order> {
    try {
      const sql = "INSERT INTO orders (user_id, status_name) VALUES ($1, $2) RETURNING *;";
      const values = [newOrder.user_id, newOrder.status_name];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    }catch(e){
      throw Error(e as string);
    }
  }

  async update(id: number, newInfo: { status_name: string }): Promise<Order> {
    try {
      const sql = "UPDATE orders SET status_name = $1 WHERE id = $2 RETURNING *;";
      const values = [newInfo.status_name, id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    }catch(e){
      throw Error(e as string);
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      const sql = "DELETE FROM orders * WHERE id = $1 RETURNING *;";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    }catch(e){
      throw Error(e as string);
    }
  }
}

export default Orders;
export { Order, Orders };
