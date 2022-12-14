import { Request, Response } from "express";
import internalServerError from "../middleware/internalServerError";
import Categories from "../models/categories";
import Orders from "../models/orders";
import OrdersProducts from "../models/ordersProducts";
import Products from "../models/products";

async function get(_req: Request, res: Response): Promise<Response> {
  try {
    const model = new Products();

    const result = await model.index();

    return res.json(result);
  } catch (e) {
    console.log(e);
    return internalServerError(_req, res);
  }
}

async function getById(req: Request, res: Response): Promise<Response> {
  const id = Number(req.params.id);
  try {
    const model = new Products();

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "Error 400: Invalid syntax, the id has to be a number.",
      });
    }

    const result = await model.show(id);

    if (result === undefined) {
      return res
        .status(404)
        .json({ error: "Error 404: There is no product with this id." });
    }

    return res.json(result);
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}

// This handler assumes you have already validated the body through a middleware
async function addProduct(req: Request, res: Response): Promise<Response> {
  const productInfo = req.body as {
    product_name: string;
    category: string;
    price: number;
    currency: string;
  };

  try {
    const model = new Products();

    const result = await model.create(productInfo);

    return res.json(result);
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}

async function getProductsByCategory(
  req: Request,
  res: Response
): Promise<Response> {
  const categoryId = Number(req.params.category);

  try {
    if (Number.isNaN(categoryId)) {
      return res
        .status(400)
        .json({ error: "Error 400: Category parameter is not valid." });
    }

    if ((await new Categories().show(categoryId)) === undefined) {
      return res
        .status(404)
        .json({ error: "Error 404: This category doesn't exist." });
    }

    const result = await new Products().showByCategoryId(categoryId);

    return res.json(result);
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}

async function addProductToOrder(
  req: Request,
  res: Response
): Promise<Response> {
  const tokenPayload = res.locals.token.payload;
  const productInfo = res.locals.productInfo;
  try {
    const userId = tokenPayload.user_id as number;

    const activeOrder = (await new Orders().showByUserId(userId, true))[0];

    if (activeOrder === undefined) {
      return res
        .status(404)
        .json({ error: "There is no active order by this user." });
    }

    const result = await new OrdersProducts().create({
      order_id: activeOrder.id,
      product_id: productInfo.product_id,
      quantity: productInfo.quantity,
    });

    return res.json(result);
  } catch (e) {
    console.log(e);
    return internalServerError(req, res);
  }
}

export default {
  get,
  getById,
  addProduct,
  getProductsByCategory,
  addProductToOrder,
};
