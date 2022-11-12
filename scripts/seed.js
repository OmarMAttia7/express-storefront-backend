const dotenv = require("dotenv");
const pg = require("pg");

dotenv.config();

const tables = {
  categories: {
    values: [["Grocery"], ["Sports"], ["Writing Supplies"]],
  },
  currencies: {
    values: [["USD", 100]],
  },
  statuses: {
    values: [
      ["active", "This order is still currently under processing"],
      ["completed", "This order has been successfully completed"],
    ],
  },
};

const dbClient = new pg.Pool({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

async function seedCategories() {
  const sql = "INSERT INTO categories (category_name) VALUES ($1);";
  for (const value of tables.categories.values) {
    await dbClient.query(sql, value);
  }
}

async function seedCurrencies() {
  const sql =
    "INSERT INTO currencies (currency_code, magnifier) VALUES ($1, $2);";
  for (const value of tables.currencies.values) {
    await dbClient.query(sql, value);
  }
}

async function seedStatuses() {
  const sql = "INSERT INTO statuses (status_name, status_description) VALUES ($1, $2)";
  for (const value of tables.statuses.values) {
    await dbClient.query(sql, value);
  }
}

async function main() {
  try {
    await seedCurrencies();
    await seedCategories();
    await seedStatuses();
  } catch (e) {
    console.log(e);
  }
}
main().then(() => {
  dbClient.end();
});
