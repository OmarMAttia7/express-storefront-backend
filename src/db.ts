import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const [DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT] = [
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
  process.env.DB_PORT,
];

const dbClient = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
});

export default dbClient;
