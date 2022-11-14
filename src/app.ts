import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productsRoute from "./routes/products";
import usersRoute from "./routes/users";
import ordersRoute from "./routes/orders";

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
  res.json("Storefront Backend Project\n Available endpoints are: /products, /users");
});

app.use(productsRoute);

app.use(usersRoute);

app.use(ordersRoute)

export default app;
