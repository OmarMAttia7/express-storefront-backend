import { Request, Response } from "express";
import dbPool from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import internalServerError from "../middleware/internalServerError";
import env from "../utils/env";
import Orders from "../models/orders";

async function getCurrentOrder(req: Request, res: Response): Promise<Response> {
  const userId = Number(req.params.user_id);
  try {
    const order = (
      await dbPool.query(
        "SELECT id FROM orders WHERE user_id = $1 AND status_name = $2",
        [userId, "active"]
      )
    ).rows[0];
    
    if (order === undefined) {
      return res
        .status(404)
        .json({ error: "Error 404: There are no active orders by this user." });
    }

    const { rows } = await dbPool.query(
      "SELECT product_id, quantity FROM orders_products WHERE order_id = $1",
      [order.id]
    );

    return res.json({
      order_id: order.id,
      products: rows
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
    const decoded = jwt.verify(token, env("JWT_SECRET") as string, {complete: true});

    const userId = (decoded.payload as JwtPayload).user_id;
    
    const orders = new Orders();

    const activeOrders = await dbPool.query("SELECT * FROM orders WHERE user_id = $1", [userId]);
    
    if(activeOrders.rowCount >= 1) {
      return res.status(200).json({status: "There is already an active order by this user."});
    }
    
    const result = await orders.create({user_id: userId, status_name: "active"});

    return res.json(result);
  }catch(e){
    console.log(e);
    return internalServerError(req, res);
  }
  
}

export default { getCurrentOrder, createOrder };
