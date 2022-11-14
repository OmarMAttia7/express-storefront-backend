import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import internalServerError from "../middleware/internalServerError";
import env from "../utils/env";
import Orders from "../models/orders";
import OrdersProducts from "../models/ordersProducts";

async function getCurrentOrder(req: Request, res: Response): Promise<Response> {
  const userId = Number(req.params.user_id);
  try {
    const orders = new Orders();
    const allOrders = await orders.showByUserId(userId);

    const activeOrder = allOrders.filter((order) => {
      return order.status_name === "active";
    })[0];

    if (activeOrder === undefined) {
      return res
        .status(404)
        .json({ error: "Error 404: There are no active orders by this user." });
    }

    const productsInOrder = await new OrdersProducts().showByOrderId(
      activeOrder.id
    );

    return res.json({
      order_id: activeOrder.id,
      products: productsInOrder,
    });
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}

// This function assumes authorization and validation have already been done
async function createOrder(req: Request, res: Response): Promise<Response> {
  try {
    const token = (req.headers.authorization as string).split(" ")[1];
    const decoded = jwt.verify(token, env("JWT_SECRET") as string, {
      complete: true,
    });

    const userId = (decoded.payload as JwtPayload).user_id;

    const orders = new Orders();

    const activeOrders = await orders.showByUserId(userId);

    if (activeOrders.length >= 1) {
      return res
        .status(200)
        .json({ status: "There is already an active order by this user." });
    }

    const result = await orders.create({
      user_id: userId,
      status_name: "active",
    });

    return res.json(result);
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}

export default { getCurrentOrder, createOrder };
