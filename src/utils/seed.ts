import dbPool from "../db";

async function seed(): Promise<void> {
  await dbPool.query(
    "INSERT INTO currencies (currency_code, magnifier) VALUES ('USD', 100);"
  );

  await dbPool.query(
    "INSERT INTO statuses (status_name, status_description) VALUES ('active', 'This order is still currently under processing');"
  );

  await dbPool.query(
    "INSERT INTO statuses (status_name, status_description) VALUES ('completed', 'This order has been successfully completed');"
  );

  await dbPool.query(
    "INSERT INTO categories (category_name) VALUES ('Grocery');"
  );

  await dbPool.query(
    "INSERT INTO categories (category_name) VALUES ('Sports');"
  );

  await dbPool.query(
    "INSERT INTO categories (category_name) VALUES ('Technology');"
  );
}

export default seed;
