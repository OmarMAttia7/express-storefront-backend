import dbPool from "../db";

interface Currency {
  currency_code: string;
  magnifier: number;
}

class Currencies {
  async index(): Promise<Currency[]> {
    try {
      const sql = "SELECT * FROM currencies;";

      const res = await dbPool.query(sql);

      return res.rows;
    } catch (e) {
      throw Error(e as string);
    }
  }

  async show(code: string): Promise<Currency> {
    try {
      const sql = "SELECT * FROM currencies WHERE currency_code = $1;";
      const values = [code];

      const res = await dbPool.query(sql, values);

      return res.rows[0];
    } catch (e) {
      throw Error(e as string);
    }
  }
}

export default Currencies;
export { Currencies, Currency };
