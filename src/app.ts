import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import productsRoute from "./routes/products";
import usersRoute from "./routes/users";

const app: express.Application = express();

app.use(bodyParser.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Storefront Backend Project\n Available endpoints are: /products, /users");
});

app.use(productsRoute);

app.use(usersRoute);

export default app;
