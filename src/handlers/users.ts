import { Request, Response } from "express";
import internalServerError from "../middleware/internalServerError";
import Users from "../models/users";
import jwt from "jsonwebtoken";
import env from "../utils/env";

async function getUsers(req: Request, res: Response): Promise<Response> {
  try {
    const users = new Users();

    const result = await users.index();

    return res.json(result);
  } catch (e) {
    return internalServerError(req, res);
  }
}

async function getUserById(req: Request, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  try {
    if (Number.isNaN(id)) {
      return res
        .status(400)
        .json({ error: "Error 400: Id must be a valid number" });
    }

    const users = new Users();

    const result = await users.show(id);

    return res.json(result);
  } catch (e) {
    return internalServerError(req, res);
  }
}

async function createUser(req: Request, res: Response): Promise<Response> {
  const userInfo = req.body as {
    first_name: string,
    last_name: string,
    password: string,
    email: string
  }
  
  try {
    const users = new Users();

    const result = await users.create(userInfo.first_name, userInfo.last_name, userInfo.password, userInfo.email);

    const jwtSecret = env("JWT_SECRET");
    if(jwtSecret === undefined) return internalServerError(req, res);

    const token = jwt.sign({user_id: result.id}, jwtSecret);

    return res.json({token});
  } catch (e) {
    return internalServerError(req, res);
  }
}

export default { getUsers, getUserById, createUser };
