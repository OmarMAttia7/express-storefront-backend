import dbClient from "../../db";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();

describe("Users Model Class", () => {

  beforeAll(async () => {
    await dbClient.connect();

    // Add entries to the table for testing
    const testUsers: string[][] = [
      ["Doodle", "Sketch", "wHFrCxF$3n2RnDJz"],
      ["Moon", "Light", "R&SV)Hpf5(*rxnvq"],
      ["Dangerous", "Amphibian", "CsdbF@r6^%7&I6Hc"]
    ]

    const sql: string = "INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *";

    for(const user of testUsers) {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      const hashedPassword = await bcrypt.hash(user[2], salt);

      const values = [user[0], user[1], hashedPassword];

      await dbClient.query(sql, values);
    };
    
    
  });

  it("shows all users", async () => {
    
  })

});