import dbPool from "../../../db";
import Categories from "../../categories";
import Currencies from "../../currencies";
import { testCategories } from "./testCategoriesUtil";

type testProduct = [string, string, number];
const testProducts: testProduct[] = [
  ["0.5mm ball pens x12", testCategories[0], 15.04],
  ["16GB Ram", testCategories[1], 50.35],
  ["Hardcove football", testCategories[3], 12],
];

async function addTestProduct(prodcut: testProduct): Promise<void> {
  const categoryID = (await new Categories().show(prodcut[1])).id;
  const magnifier = (await new Currencies().show("USD")).magnifier;

  const sql =
    "INSERT INTO products (product_name, category_id, magnified_price, currency_code) VALUES($1, $2, $3, $4);";

  const values = [prodcut[0], categoryID, (prodcut[2] * magnifier), "USD"];

  await dbPool.query(sql, values);
}

async function addTestProducts(testProducts: testProduct[]): Promise<void> {
  for(const product of testProducts) {
    await addTestProduct(product);
  }
}

export { testProducts, addTestProduct, addTestProducts };
