import { Router } from "express";
import productsHandler from "../handlers/products";
import authenticate from "../middleware/authenticate";
import validateAddProduct from "../middleware/products/validateAddProduct";
import validateAddProductToOrder from "../middleware/products/validateAddProductToOrder";

const productsRoute = Router();

productsRoute.get("/products", productsHandler.get);

productsRoute.get("/products/:id", productsHandler.getById);

productsRoute.post(
  "/products",
  authenticate,
  validateAddProduct,
  productsHandler.addProduct
);

productsRoute.get(
  "/products/category/:category",
  productsHandler.getProductsByCategory
);

productsRoute.post(
  "/products/:id",
  authenticate,
  validateAddProductToOrder,
  productsHandler.addProductToOrder
);

export default productsRoute;
