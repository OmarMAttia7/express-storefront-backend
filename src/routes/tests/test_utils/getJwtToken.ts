import jwt from "jsonwebtoken";
import env from "../../../utils/env";
function getJwtToken(): string {
  const jwtSecret = env("JWT_SECRET");
  if(jwtSecret === undefined) throw Error("JWT_SECRET not found");

  return jwt.sign({user_id: 1}, jwtSecret);
}

export default getJwtToken;