const dotenv = require("dotenv");
const pg = require("pg");
const { readFileSync } = require("fs");

dotenv.config();

const dbClient = new pg.Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

const sqlFile = readFileSync("scripts/seed/seed.sql");

async function main() {
  await dbClient.query(sqlFile.toString());
}

main().then(() => {
  dbClient.end();
});
