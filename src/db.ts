import { Pool } from "pg";
import env from "./utils/env";

const [DB_USERNAME, DB_PASSWORD, DB_HOST, ENV] = [
  env("DB_USERNAME"),
  env("DB_PASSWORD"),
  env("DB_HOST"),
  env("ENV"),
];

// Get the port from environment variable
// if it doesn't exist default to port 5432
let DB_PORT = env("DB_PORT");
if (DB_PORT === undefined) DB_PORT = "5432";

// Get the database name according to current environment
const DB_NAME = ENV === "test" ? env("TEST_DB_NAME") : env("DB_NAME");

const dbPool: Pool = new Pool({
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
  host: DB_HOST
});

export default dbPool;
