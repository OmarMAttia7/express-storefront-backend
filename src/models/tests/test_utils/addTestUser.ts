import dbClient from "../../../db";
import hashPassword from "../../../services/hashPassword";

export default async function addTestUser(user: string[]): Promise<void> {
  await dbClient.connect();
  const sql: string =
    "INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3)";
  const hashedPassword = await hashPassword(user[2]);

  const values = [user[0], user[1], hashedPassword];

  await dbClient.query(sql, values);
}
