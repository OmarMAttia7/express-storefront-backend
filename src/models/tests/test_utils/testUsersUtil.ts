import dbPool from "../../../db";
import hashPassword from "../../../services/hashPassword";

const testUsers: string[][] = [
  ["Doodle", "Sketch", "wHFrCxF$3n2RnDJz", "sketchydoodle@example.com"],
  ["Moon", "Light", "R&SV)Hpf5(*rxnvq", "moonlight@example.com"],
  ["Dangerous", "Amphibian", "CsdbF@r6^%7&I6Hc", "damphibian@example.com"],
];

async function addTestUser(user: string[]): Promise<void> {
  const sql: string =
    "INSERT INTO users (first_name, last_name, password_digest, email) VALUES ($1, $2, $3, $4)";
  const hashedPassword = await hashPassword(user[2]);

  const values = [user[0], user[1], hashedPassword, user[3]];

  await dbPool.query(sql, values);
}

async function addTestUsers(usersArr: string[][]): Promise<void> {
  for (const user of usersArr) {
    await addTestUser(user);
  }
}

export { addTestUser, addTestUsers, testUsers };
