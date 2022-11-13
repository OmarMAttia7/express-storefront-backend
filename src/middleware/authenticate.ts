import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../utils/env";
import internalServerError from "./internalServerError";

async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader === undefined) {
      return res
        .status(400)
        .json({ error: "Error 400: missing authorization header." });
    }

    const token = authHeader.split(" ")[1];

    const secret = env("JWT_SECRET");
    if (secret === undefined) return internalServerError(req, res);

    jwt.verify(token, secret);
    return next() as unknown as Response;
  } catch (e) {
    return res.status(401).json({ error: "Access denied. Unauthorized." });
  }
}

export default authenticate;
