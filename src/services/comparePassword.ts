import bcrypt from "bcrypt";
import env from "../utils/env";

export default async function comparePassword(pwd: string, hash: string): Promise<boolean> {
  const bcryptSecret = env("BCRYPT_SECRET");
  if (bcryptSecret === undefined) throw Error("missing env variable");

  return await bcrypt.compare(bcryptSecret + pwd, hash);
}
