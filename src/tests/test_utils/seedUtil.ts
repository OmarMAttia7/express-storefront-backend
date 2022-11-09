import dbPool from "../../db";

async function seed(): Promise<void> {
  await dbPool.query(
    "INSERT INTO currencies (currency_code, magnifier) VALUES ('USD', 100);"
  );
}

export default seed;
