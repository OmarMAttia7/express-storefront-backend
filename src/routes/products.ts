import { Router } from "express";
import productsHandler from "../handlers/products";
import validateAddProduct from "../middleware/products/validateAddProduct";
const productsRoute = Router();

productsRoute.get("/products", productsHandler.get);

productsRoute.get("/products/:id", productsHandler.getById);

productsRoute.post("/products", validateAddProduct, productsHandler.addProduct);
export default productsRoute;

productsRoute.get(
  "/products/category/:category",
  productsHandler.getProductsByCategory
);
