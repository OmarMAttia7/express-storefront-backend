import bcrypt from "bcrypt";
import env from "../utils/env";

export default async function hashPassword(pwd: string): Promise<string> {
  const bcryptSecret = env("BCRYPT_SECRET");
  if (bcryptSecret === undefined) throw Error("missing env variable");
  const hashedPassword = await bcrypt.hash(
    bcryptSecret + pwd,
    Number(env("SALT_ROUNDS"))
  );

  return hashedPassword;
}
