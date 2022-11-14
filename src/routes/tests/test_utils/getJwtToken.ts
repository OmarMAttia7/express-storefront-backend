import jwt from "jsonwebtoken";
import env from "../../../utils/env";
function getJwtToken(id?: number): string {
  const jwtSecret = env("JWT_SECRET");
  if (jwtSecret === undefined) throw Error("JWT_SECRET not found");
  if (id !== undefined) {
    return jwt.sign({ user_id: id }, jwtSecret);
  }
  return jwt.sign({ user_id: 1 }, jwtSecret);
}

export default getJwtToken;
