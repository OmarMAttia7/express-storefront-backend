import { Router } from "express";
import ordersHandler from "../handlers/orders";
import authenticate from "../middleware/authenticate";
const ordersRoute = Router();

ordersRoute.get("/orders/:user_id/current", authenticate, ordersHandler.getCurrentOrder);
ordersRoute.post("/orders", authenticate, ordersHandler.createOrder);

export default ordersRoute;