import { NextFunction, Request, Response } from "express";
import Users from "../../models/users";
import comparePassword from "../../services/comparePassword";
import env from "../../utils/env";
import verifyObjectProperties from "../../utils/verifyObjectProperties";
import internalServerError from "../internalServerError";

async function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const userInfo = req.body;
  try {
    if (!verifyObjectProperties(userInfo, ["email", "password"])) {
      return res
        .status(400)
        .json({ error: "Error 400: Incorrect syntax, modify request body." });
    }

    const users = new Users();
    const user = await users.showByEmail(userInfo.email);
    if (user === undefined) {
      return res
        .status(400)
        .json({ error: "Error 400: Email or password are incorrect." });
    }

    if (!(await comparePassword(userInfo.password, user.password_digest))) {
      return res
        .status(400)
        .json({ error: "Error 400: Email or password are incorrect." });
    }

    const jwtSecret = env("JWT_SECRET");
    if (jwtSecret === undefined) return internalServerError(req, res);

    res.locals.jwtSecret = jwtSecret;
    res.locals.user = user;
    return next() as unknown as Response;
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}

export default validateLogin;
