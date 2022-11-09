import dbPool from "../db";
import hashPassword from "../services/hashPassword";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

class Users {
  async index(): Promise<User[]> {
    try {
      const sql = "SELECT id, first_name, last_name FROM users;";

      const res = await dbPool.query(sql);

      return res.rows as User[];
    } catch (e) {
      throw Error(e as string);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT id, first_name, last_name FROM users WHERE id = $1;";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0] as User;
    } catch (e) {
      throw Error(e as string);
    }
  }

  async create(fn: string, ln: string, pwd: string): Promise<User> {
    try {
      const sql =
        "INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING id, first_name, last_name;";
      const values = [fn, ln, await hashPassword(pwd)];

      const res = await dbPool.query(sql, values);

      return res.rows[0] as User;
    } catch (e) {
      throw Error(e as string);
    }
  }

  async update(
    id: number,
    newInfo: { first_name: string; last_name: string }
  ): Promise<User> {
    try {
      const sql =
        "UPDATE users SET (first_name, last_name) = ($1, $2) WHERE id = $3 RETURNING id, first_name, last_name;";
      const values = [newInfo.first_name, newInfo.last_name, id];

      const res = await dbPool.query(sql, values);

      return res.rows[0] as User;
    } catch (e) {
      throw Error(e as string);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql =
        "DELETE FROM users WHERE id = $1 RETURNING id, first_name, last_name";
      const values = [id];

      const res = await dbPool.query(sql, values);

      return res.rows[0] as User;
    } catch (e) {
      throw Error(e as string);
    }
  }
}

export default Users;
export { User, Users };
