import { Router } from "express";
import usersHandler from "../handlers/users";
import authenticate from "../middleware/authenticate";
import validateCreateUser from "../middleware/users/validateCreateUser";
import validateLogin from "../middleware/users/validateLogin";
const usersRoute = Router();

usersRoute.get("/users", authenticate, usersHandler.getUsers);
usersRoute.get("/users/:id", authenticate, usersHandler.getUserById);
usersRoute.post("/users", validateCreateUser, usersHandler.createUser);
usersRoute.post("/users/login", validateLogin, usersHandler.login);

export default usersRoute;
