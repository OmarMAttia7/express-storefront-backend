import { NextFunction, Request, Response } from "express";
import verifyObjectProperties from "../../utils/verifyObjectProperties";
import internalServerError from "../internalServerError";

async function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const userInfo = req.body;
  try {
    if (
      !verifyObjectProperties(userInfo, [
        "first_name",
        "last_name",
        "password",
        "email",
      ])
    ) {
      return res
        .status(400)
        .json({ error: "Error 400: Incorrect syntax, modify request body." });
    }

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(userInfo.email)) {
      return res
        .status(400)
        .json({ error: "Error 400: Invalid email address" });
    }

    return next() as unknown as Response;
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}

export default validateCreateUser;
