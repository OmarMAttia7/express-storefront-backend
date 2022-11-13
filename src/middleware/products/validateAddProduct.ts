import { NextFunction, Request, Response } from "express";
import Categories from "../../models/categories";
import Currencies from "../../models/currencies";
import verifyObjectProperties from "../../utils/verifyObjectProperties";
import internalServerError from "../internalServerError";

export default async function validateAddProduct(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const body = req.body;

  const categories = new Categories();
  const currencies = new Currencies();
  try {
    // Check if body only has necessary properties
    if (
      !verifyObjectProperties(body, [
        "product_name",
        "category",
        "price",
        "currency",
      ])
    ) {
      return res
        .status(400)
        .json({ error: "Error 400: Incorrect syntax, modify request body." });
    }

    // Check if price is a valid number
    if (Number.isNaN(Number(body.price))) {
      return res
        .status(400)
        .json({
          error: "Error 400: incorrect syntax, price must be a valid number.",
        });
    }

    // Check if category exists
    if ((await categories.show(body.category)) === undefined) {
      return res
        .status(404)
        .json({ error: "Error 404: this category doesn't exist." });
    }

    // Check if currency exists
    if ((await currencies.show(body.currency)) === undefined) {
      return res
        .status(404)
        .json({ error: "Error 404: this currency doesn't exist." });
    }

    // Proceed to handler
    return next() as unknown as Response;
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}
