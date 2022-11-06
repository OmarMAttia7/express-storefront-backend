import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const [DB_USERNAME, DB_PASSWORD, ENV] = [
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  process.env.ENV,
];

// Get the port from environment variable
// if it doesn't exist default to port 5432
let DB_PORT = process.env.DB_PORT;
if (DB_PORT === undefined) DB_PORT = "5432";

const DB_NAME = ENV === "test" ? process.env.TEST_DB_NAME : process.env.DB_NAME;

const dbClient: Pool = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
});

export default dbClient;
