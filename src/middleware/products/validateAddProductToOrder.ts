import { NextFunction, Request, Response } from "express";
import Products from "../../models/products";
import verifyObjectProperties from "../../utils/verifyObjectProperties";
import internalServerError from "../internalServerError";

async function validateAddProductToOrder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> {
  const productInfo = req.body;
  try {
    if(!verifyObjectProperties(productInfo, ["quantity"])){
      return res
        .status(400)
        .json({ error: "Error 400: Incorrect syntax, modify request body." });
    }

    const quantity = Number(productInfo.quantity);
    const productId = Number(req.params.id);
    if(Number.isNaN(quantity) || Number.isNaN(productId)){
      return res
      .status(400)
      .json({ error: "Error 400: quantity and product_id have to be valid numbers." });
    }

    if((await new Products().show(productId)) === undefined) {
      return res
      .status(404)
      .json({ error: "Error 404: No product exists with this id." });
    }

    res.locals.productInfo = {quantity, product_id: productId}
    return next() as unknown as Response;
  }catch(e){
    return internalServerError(req, res);
  }
}

export default validateAddProductToOrder;
